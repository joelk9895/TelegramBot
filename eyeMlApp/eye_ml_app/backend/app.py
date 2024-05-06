from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image as img_preprocessing

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def load_image(file_path, target_size=(224, 224)):
    img = img_preprocessing.load_img(file_path, target_size=target_size)
    img_array = img_preprocessing.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

@app.route('/api', methods=['GET'])
def api():
    return jsonify({"message": "Hello, World!"})

@app.route('/api/image', methods=['POST'])
def image():
    if 'image' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        if not os.path.exists(app.config['UPLOAD_FOLDER']):
            os.makedirs(app.config['UPLOAD_FOLDER'])
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # Load the model
        model = load_model("backend/model.h5")  # Update with the path to your .h5 model file
        # Preprocess the image
        img = load_image(file_path)

        # Make predictions
        predictions = model.predict(img)

        # Format the results
        # Here you can format the predictions as needed, e.g., converting to JSON
        results = {"predictions": predictions.tolist()}

        # Return the results as a response
        return jsonify(results), 200
    else:
        return jsonify({"error": "Invalid file format"}), 400

if __name__ == '__main__':
    #list all the files in my directory
    print(os.listdir())
    app.run(debug=True)
