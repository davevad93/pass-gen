from flask import Flask, jsonify 
from flask_cors import CORS
import random
import string

app = Flask(__name__)
CORS(app)

def generate_password(length=12):
    characters = string.ascii_letters + string.digits + string.punctuation
    password = ''.join(random.choice(characters) for i in range(length))
    return password

@app.route('/generate-password')
def get_password():
    password = generate_password()
    return jsonify(password=password)

if __name__ == '__main__':
    app.run(debug=True)
