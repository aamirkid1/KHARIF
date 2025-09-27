# from flask import Flask
# from flask_cors import CORS
# from api.routes import api_blueprint

# # Initialize the Flask app
# app = Flask(__name__)

# # Initialize Flask-CORS to allow cross-origin requests
# CORS(app)

# # Register the API blueprint
# app.register_blueprint(api_blueprint)

# # Main entry point for the application
# if __name__ == '__main__':
#     print("Starting Flask server...")
#     app.run(debug=True, host='0.0.0.0')

from flask import Flask, send_from_directory
from flask_cors import CORS
from api.routes import api_blueprint
import os

# Initialize the Flask app
app = Flask(__name__, static_folder="build", static_url_path="/")

# Initialize Flask-CORS to allow cross-origin requests
CORS(app)

# Register the API blueprint
app.register_blueprint(api_blueprint)

# Serve React frontend (index.html)
@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

# Handle all other React routes (e.g., /about, /dashboard)
@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, "index.html")

# Main entry point for the application
if __name__ == '__main__':
    print("Starting Flask server...")
    app.run(debug=True, host='0.0.0.0', port=5000)
