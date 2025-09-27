from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
import joblib
import numpy as np
import os

# Create a Blueprint for the API routes.
api_blueprint = Blueprint('api', __name__)

# --- MODEL LOADING (Adjusted for robust path) ---
script_dir = os.path.dirname(os.path.abspath(__file__))
GENERAL_MODEL_PATH = os.path.join(script_dir, '..', 'classifier.pkl')
MAHARASHTRA_MODEL_PATH = os.path.join(script_dir, '..', 'classifier5000.pkl') # Assuming you save the new model here

general_model = None
maharashtra_model = None

try:
    general_model = joblib.load(GENERAL_MODEL_PATH)
    print(f"Model '{GENERAL_MODEL_PATH}' loaded successfully.")
except Exception as e:
    print(f"Error loading GENERAL model: {e}")

try:
    # NOTE: You MUST replace 'maharashtra_classifier.pkl' with the actual file name of your new model
    maharashtra_model = joblib.load(MAHARASHTRA_MODEL_PATH) 
    print(f"Model '{MAHARASHTRA_MODEL_PATH}' loaded successfully.")
except Exception as e:
    print(f"Error loading MAHARASHTRA model: {e}")


# --- SHARED MAPPINGS (for model output) ---
# Assuming both models output similar numerical codes for fertilizer type
FERTILIZER_MAPPING = {
    0: 'Urea',
    1: 'NPK-10:26:26',
    2: 'Potash (MOP)',
    3: 'DAP',
    4: 'NPK-14:35:14'
}

# --- ENDPOINTS ---

# 1. General Prediction Endpoint (Existing)
@api_blueprint.route('/predict', methods=['POST'])
@cross_origin()
def predict():
    if general_model is None:
        return jsonify({'error': 'General model not loaded'}), 500

    try:
        data = request.get_json()
        
        # NOTE: Inputs from frontend are expected in this order:
        features = np.array([
            float(data['temperature']),
            float(data['humidity']),
            float(data['moisture']),
            int(data['soilType']),
            int(data['cropType']),
            float(data['nitrogen']),
            float(data['potassium']),
            float(data['phosphorous'])
        ]).reshape(1, -1)

        prediction = general_model.predict(features)[0]
        predicted_fertilizer = FERTILIZER_MAPPING.get(prediction, 'Unknown')

        return jsonify({'recommendation': predicted_fertilizer})

    except Exception as e:
        print(f"General Prediction Error: {e}")
        return jsonify({'error': f'Invalid data format or missing key: {e}'}), 500

# 2. Maharashtra Prediction Endpoint (New)
@api_blueprint.route('/predict_maharashtra', methods=['POST'])
@cross_origin()
def predict_maharashtra():
    if maharashtra_model is None:
        return jsonify({'error': 'Maharashtra model not loaded'}), 500

    try:
        data = request.get_json()
        
        # NOTE: Inputs from frontend must match the order your Maharashtra model was trained on
        # Assuming the order: N, P, K, pH, Rainfall, Temperature, District, Soil Color, Crop
        features = np.array([
            float(data['N']),
            float(data['P']),
            float(data['K']),
            float(data['pH']),
            float(data['Rainfall']),
            float(data['Temperature']),
            int(data['District_Name']), # Already encoded in frontend
            int(data['Soil_Color']),   # Already encoded in frontend
            int(data['Crop'])          # Already encoded in frontend
        ]).reshape(1, -1)

        prediction = maharashtra_model.predict(features)[0]
        predicted_fertilizer = FERTILIZER_MAPPING.get(prediction, 'Unknown')

        return jsonify({'recommendation': predicted_fertilizer})

    except Exception as e:
        print(f"Maharashtra Prediction Error: {e}")
        return jsonify({'error': f'Invalid data format or missing key: {e}'}), 500