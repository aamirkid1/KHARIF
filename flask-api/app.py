from flask import Flask
from flask_cors import CORS
from api.routes import api_blueprint

# Initialize the Flask app
app = Flask(__name__)

# Initialize Flask-CORS to allow cross-origin requests
CORS(app)

# Register the API blueprint
app.register_blueprint(api_blueprint)

# Main entry point for the application
if __name__ == '__main__':
    print("Starting Flask server...")
    app.run(debug=True, host='0.0.0.0')