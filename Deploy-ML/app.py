from flask import Flask,request, jsonify
from flask_cors import CORS
import pandas as pd
# from feature_enhanced_ml_model import predict,predict_with_date_and_column
# from Multiple_feature_Model import run_workflow
from Best_model_pipeline import run_workflow, build_model
import pickle
from tensorflow.keras.models import model_from_json
# Load the model from JSON file
with open('best_model.json', 'r') as json_file:
    model_json = json_file.read()

# Reconstruct the model
model = model_from_json(model_json)

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})


ticker_data = None

@app.route('/')
def index():
    return "hello"


@app.route('/test-ticker-data', methods=['GET','POST'])
def test_ticker_data():

    # get rid of ticker_data defined before getting sent using GET 
    global ticker_data
    if request.method == 'POST':

        # Get ticker data from the request sent by the frontend
        ticker_data = request.json['ticker_data']
        print("Received TICKER DATA in test route:",ticker_data)
        
        # Send a response back to the frontend 
        return jsonify({"message": "Data received successfully"})
    
# getting data after recieved from frontend
@app.route('/get-ticker-data', methods=['GET'])
def get_ticker_data():
    global ticker_data
    if ticker_data is not None:
        return jsonify(ticker_data)
    else:
        # If ticker_data is Nonn
        return jsonify({"message": "No data received yet"})    
    

# getting  ticker_data from frontend before predicting
@app.route('/get-predict', methods=['GET'])
def get_prediction_input():
    global ticker_data
    if ticker_data is not None:
        # ticker_data = request.json['ticker_data']
        return jsonify(ticker_data)
    else:
        # If ticker_data is Nonn
        return jsonify({"message": "No data received yet"}) 

# Predicting with recieved ticker_data 
@app.route('/predict', methods=['POST','GET'])
def get_prediction():
    global ticker_data

    try:
        if request.method == 'POST':
            # Get ticker data from the request sent by the frontend
            ticker_data = request.json['ticker_data']

            print("Received TICKER DATA in PREDICT route:")
            close_prices = [data['close'] for data in ticker_data['historical']]
            prediction = predict(close_prices)
            return  jsonify(prediction)
        elif request.method == 'GET':
        
            close_prices = [data['close'] for data in ticker_data['historical']]
            prediction = predict(close_prices)
            return  jsonify(prediction) 
    
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Frontend to flask data transfer error"}), 500

# Predicting with enhanced model ticker_data 
@app.route('/predict-with-enhanced-model', methods=['POST','GET'])
def get_enhanced_model_prediction():
    global ticker_data

    try:
        if request.method == 'POST':
            # Get ticker data from the request sent by the frontend
            
            ticker_data = request.json['ticker_data']
    
            print("Received TICKER DATA in ENHANCED PREDICT route:")

            predictions = run_workflow(ticker_data)
            with open('best_model.pkl', 'wb') as f:
                    pickle.dump(build_model, f)
            return  jsonify(predictions)
        
        elif request.method == 'GET':
        
            # ticker_data = request.json
            
            print("GETTING ENHANCED PREDICT RESULTS:")
            predictions = run_workflow(ticker_data)
            return  jsonify(predictions)
    
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Frontend to flask data transfer error"}), 500

# testing if model works before feeding in data from frontend
# !WORKS and returns predicted "close" price
@app.route('/model_testing', methods=['GET'])
def model_testing():
    try:
        result = test_model('ticker_data.csv')
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
       

    

if __name__=="__main__":
    app.run(host="0.0.0.0",debug=True)