from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from flask_restful import Api, Resource
from flask_migrate import Migrate
from sqlalchemy import ForeignKey
from sqlalchemy import func
from flask_cors import CORS, cross_origin
from marshmallow import Schema, fields

# Initialize Flask app
app = Flask(__name__)

# Enable CORS globally for specific origins (this allows cross-origin requests)
CORS(app)

# Configurations
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)
# ma = Marshmallow(app)
api = Api(app)

# Database Models

# Product Model
class Product(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    image = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Float, nullable=False)

    # One-to-many relationship with Review
    reviews = db.relationship('Review', back_populates='product', cascade='all, delete-orphan')

    # One-to-many relationship with Order
    orders = db.relationship('Order', back_populates='product', cascade='all, delete-orphan')

    def __init__(self, name, description, price, image):
        self.name = name
        self.description = description
        self.price = price
        self.image = image

# Order Model
class Order(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    # Relationships
    product = db.relationship('Product', back_populates='orders')
    user = db.relationship('User', back_populates='orders')

    def __init__(self, user_id, product_id, quantity):
        self.user_id = user_id
        self.product_id = product_id
        self.quantity = quantity


# Review Model
class Review(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    content = db.Column(db.String(500), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    # Relationships
    product = db.relationship('Product', back_populates='reviews', single_parent=True, cascade='all, delete-orphan')
    user = db.relationship('User', back_populates='reviews', single_parent=True, cascade='all, delete-orphan')

    def __init__(self, rating, content, product_id, user_id):
        self.rating = rating
        self.content = content
        self.product_id = product_id
        self.user_id = user_id

# User Model
class User(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    

    # Relationships
    reviews = db.relationship('Review', back_populates='user', cascade='all, delete-orphan')
    orders = db.relationship('Order', back_populates='user', cascade='all, delete-orphan')

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password

# Schemas (Using Marshmallow for JSON serialization)
# class ProductSchema(ma.Schema):
class ProductSchema(Schema):
    _id = fields.Str(required=True)
    name = fields.Str(required=True)
    description = fields.Str()
    price = fields.Float(required=True)
    image = fields.Str()

# class ReviewSchema(ma.Schema):
class ReviewSchema(Schema):
    id = fields.Str(required=True)
    username = fields.Str(required=True)
    rating = fields.Float(required=True)
    review = fields.Str(required=True)

# class ReviewSchema(ma.Schema):
    class Meta:
        fields = ('id', 'rating', 'content', 'product_id', 'user_id')


# Resources

@app.route('/')
def index():
    return 'Hello, World!'

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']
    user = User.query.filter_by(email=email, password=password).first()
    if not email or not password:
        return jsonify({'message': 'Missing email or password'}), 400
    if not '@' in email:
        return jsonify({'message': 'Invalid email'}), 400

    user = User.query.filter((func.lower(User.email) == func.lower(email))).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404
    if user.password != password:
        return jsonify({'message': 'Invalid password'}), 401
    return jsonify({'message': 'Login successful'}), 200


@app.route('/signup', methods=['POST'])
def create_user():
    data = request.get_json()
    name = data['name']
    email = data['email']
    password = data['password']

    if not name or not email or not password:
        return jsonify({'message': 'Missing name, email or password'}), 400
    if not '@' in email:
        return jsonify({'message': 'Invalid email'}), 400
    if not isinstance(password, str):
        return jsonify({'message': 'Password must be a string'}), 400

    existing_user = User.query.filter((func.lower(User.email) == func.lower(email))).first()
    if existing_user:
        return jsonify({'message': 'Email already exists'}), 409

    new_user = User(name=name, email=email, password=password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201


@app.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    Schema = ProductSchema(many=True)
    data = Schema.dump(products)
    return jsonify(data), 200

@app.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.filter_by(id=product_id).first()
    if not product:
        return jsonify({'message': 'Product not found'}), 404
    Schema = ProductSchema()
    data = Schema.dump(product)
    return jsonify(data), 200

@app.route('/products', methods=['POST'])
def create_product():
    data = request.get_json()
    product = Product(name=data['name'], description=data['description'], image=data['image'], price=data['price'])
    db.session.add(product)
    db.session.commit()
    return jsonify({'message': 'Product created successfully'}), 201

@app.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    product = Product.query.filter_by(id=product_id).first()
    if not product:
        return jsonify({'message': 'Product not found'}), 404
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product deleted successfully'}), 200

@app.route('/create_order', methods=['POST'])
def create_order():
    data = request.get_json()
    product_id = data['product_id']
    quantity = data['quantity']
    user_id = data['user_id']  # Make sure to get user_id as well

    # Create order
    new_order = Order(product_id=product_id, quantity=quantity, user_id=user_id)
    db.session.add(new_order)
    db.session.commit()
    return jsonify({'message': 'Order created successfully'}), 201

@app.route('/order', methods=['DELETE'])
def delete_order():
    order = Order.query.filter_by(id=id).first()
    if not order:
        return jsonify({'message': 'Order not found'}), 404
    db.session.delete(order)
    db.session.commit()
    return jsonify({'message': 'Order deleted successfully'}), 200

@app.route('/reviews', methods=['POST'])
def create_review():
    data = request.get_json()
    review = Review(rating=data['rating'], content=data['content'], product_id=data['product_id'], user_id=data['user_id'])
    db.session.add(review)
    db.session.commit()
    return jsonify(review.to_dict()), 201

@app.route('/reviews/<int:review_id>', methods=['PUT'])
def update_review(review_id):
    review = Review.query.get_or_404(review_id)
    data = request.get_json()
    review.rating = data['rating']
    review.content = data['content']
    db.session.commit()
    return jsonify(review.to_dict()), 200

@app.route('/reviews/<int:review_id>', methods=['DELETE'])
def delete_review(review_id):
    review = Review.query.get_or_404(review_id)
    db.session.delete(review)
    db.session.commit()
    return jsonify({'message': 'Review deleted'}), 200




# class ProductResource(Resource):
#     def get(self):
#         products = Product.query.all()
#         product_schema = ProductSchema(many=True)
#         return product_schema.dump(products)

#     def post(self):
#         data = request.get_json()
#         new_product = Product(name=data['name'], description=data['description'], price=data['price'])
#         db.session.add(new_product)
#         db.session.commit()
#         return ProductSchema().dump(new_product), 201

# class ReviewResource(Resource):
#     def get(self, review_id):
#         review = Review.query.get_or_404(review_id)
#         return ReviewSchema().dump(review)

#     def put(self, review_id):
#         data = request.get_json()
#         review = Review.query.get_or_404(review_id)
#         review.rating = data['rating']
#         review.content = data['content']
#         db.session.commit()
#         return {'message': 'Review updated'}

#     def delete(self, review_id):
#         review = Review.query.get_or_404(review_id)
#         db.session.delete(review)
#         db.session.commit()
#         return {'message': 'Review deleted'}

#     def post(self):
#         data = request.get_json()
#         new_review = Review(rating=data['rating'], content=data['content'], product_id=data['product_id'], user_id=data['user_id'])
#         db.session.add(new_review)
#         db.session.commit()
#         return ReviewSchema().dump(new_review), 201


# Initialize Routes
# api.add_resource(ProductResource, '/products')
# api.add_resource(ReviewResource, '/reviews/<int:review_id>')

#Before first request, create tables
@app.before_first_request
def create_tables():
    db.create_all()

# Run the app
if __name__ == '__main__':
    app.run(debug=True)