from bson import ObjectId
from flask import json, jsonify, Flask, request
from flask.json import JSONEncoder
from pymongo import MongoClient
import re
from flask_cors import CORS, cross_origin
from hashlib import blake2b

app = Flask(__name__)
# CORS(app, resources={r"/*"})
app.config['CORS_AUTOMATIC_OPTIONS'] = False
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)


class CustomJSONEncoder(JSONEncoder):

    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return json.JSONEncoder.default(self, obj)


app.json_encoder = CustomJSONEncoder


@app.after_request
def add_headers(response):
    response.headers.add('Content-Type', '*')
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Methods', '*')
    response.headers.add('Access-Control-Allow-Headers', '*')
    response.headers.add('Access-Control-Expose-Headers', '*')
    return response


def get_client_bbdd():
    host = "localhost"
    puerto = 27017
    bbdd = "trishop"
    cliente = MongoClient(host, puerto)
    return cliente


def parsed_response(data):
    data_parsed = jsonify(data)
    # data_parsed.headers.add('Access-Control-Allow-Origin', '*')
    return data_parsed


@app.route("/products")
def get_products():
    cliente = get_client_bbdd()
    bbdd = cliente.trishop
    productos = bbdd['producto']
    data = []

    for obj in productos.find():
        data.append(obj)

    return parsed_response(data)


@app.route("/product")
def get_detail_product():
    cliente = get_client_bbdd()
    bbdd = cliente.trishop
    arg1 = request.args['id']
    productos = bbdd['producto']
    query = productos.find({
        "_id": ObjectId(arg1)
    })
    data = []

    for obj in query:
        data.append(obj)

    return parsed_response(data)


@app.route("/products/search")
def get_search_results():
    arg1 = request.args['texto']
    cliente = get_client_bbdd()
    bbdd = cliente.trishop
    productos = bbdd['producto']
    rgx = re.compile('.*' + arg1 + '.*', re.IGNORECASE)
    query = productos.find({'$or': [
        {"categoria": rgx},
        {"nombre": rgx}]})
    data = []

    for obj in query:
        data.append(obj)

    return parsed_response(data)


@app.route("/products/categories")
def get_search_category_results():
    arg1 = request.args['categoria']
    cliente = get_client_bbdd()
    bbdd = cliente.trishop
    productos = bbdd['producto']
    obj = {}
    if arg1:
        obj = {"categoria": arg1}

    query = productos.find(obj)

    data = []

    for obj in query:
        data.append(obj)

    return parsed_response(data)


@app.route("/users/<id>/orders", methods=["GET"])
def get_user_orders(id):
    assert id == request.view_args['id']
    cliente = get_client_bbdd()
    bbdd = cliente.trishop
    usuario = bbdd['usuario']
    data = []
    query = usuario.find_one({
        '_id': ObjectId(id)
    })

    return parsed_response(query)


@app.route("/users/setOrder", methods=["POST"])
def set_user_order():
    rq = json.loads(request.data.decode("utf-8"))
    cliente = get_client_bbdd()
    bbdd = cliente.trishop
    usuario = bbdd['usuario']
    query = usuario.find_one({
        '_id': ObjectId(rq['_id'])
    })

    if query:
        usuario.update_one({'_id': ObjectId(rq['_id'])},
                           {'$push': {'pedidos': rq}})

    return parsed_response({"success": True})


@app.route("/users/signup", methods=["POST"])
def sign_user():
    rq = json.loads(request.data.decode("utf-8"))
    cliente = get_client_bbdd()
    bbdd = cliente.trishop
    usuario = bbdd['usuario']
    password = rq['password']
    user = usuario.insert_one({
        'nombre': rq['name'],
        'email': rq['email'],
        'password': blake2b(bytes(password, encoding='utf8')).hexdigest()
    })
    user = usuario.find_one({'_id': ObjectId(user.inserted_id)})
    return parsed_response(user)


@app.route("/users/login", methods=["POST"])
def log_user():
    body = json.loads(request.data.decode("utf-8"))
    usuario = body['name']
    password = body['password']
    cliente = get_client_bbdd()
    bbdd = cliente.trishop
    usuarios = bbdd['usuario']
    query = usuarios.find_one({'$and': [
        {"nombre": usuario},
        {"password": blake2b(bytes(password, encoding='utf8')).hexdigest()}]
    })
    loginObj = {
        'login': False,
    }
    if query:
        loginObj = query
        loginObj['login'] = True

    return parsed_response(loginObj)


if __name__ == "__main__":
    app.run()
