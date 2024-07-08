from flask import Flask, jsonify 
from flask_cors import CORS
import random
import string

app = Flask(__name__)
CORS(app)

def generate_password(length=12, use_upper=True, use_lower=True, use_digits=True, use_special=True, exclude_duplicates=False):
    characters = ''
    if use_upper:
        characters += string.ascii_uppercase
    if use_lower:
        characters += string.ascii_lowercase
    if use_digits:
        characters += string.digits
    if use_special:
        characters += string.punctuation

    if exclude_duplicates:
        password = ''.join(random.sample(characters, length))
    else:
        password = ''.join(random.choice(characters) for i in range(length))

    return password

@app.route('/generate-password', methods=['GET'])
def get_password():
    length = int(request.args.get('length', 12))
    use_upper = request.args.get('use_upper', 'true').lower() == 'true'
    use_lower = request.args.get('use_lower', 'true').lower() == 'true'
    use_digits = request.args.get('use_digits', 'true').lower() == 'true'
    use_special = request.args.get('use_special', 'true').lower() == 'true'
    exclude_duplicates = request.args.get('exclude_duplicates', 'true').lower() == 'true'
    
    password = generate_password(length, use_upper, use_lower, use_digits, use_special, exclude_duplicates)
    return jsonify(password=password)

if __name__ == '__main__':
    app.run(debug=True)
