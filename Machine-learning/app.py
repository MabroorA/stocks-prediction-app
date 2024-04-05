from flask import Flask,request, render_template, jsonify
from flask_cors import CORS
from ml_model import predict


application = Flask(__name__)

app=application
CORS(app)



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
        print("Received TICKER DATA in test route:")
        
        # Send a response back to the frontend indicating success
        return jsonify({"message": "Data received successfully"})
    
    elif request.method == 'GET':

        # Return the ticker data as JSON 
        if ticker_data is not None:
            return jsonify(ticker_data)
        else:
            # If ticker_data is None, return an appropriate message
            return jsonify({"message": "No data received yet"})
    
    



# @app.route('/predict', methods=['POST'])
# def get_prediction():
#     # Get ticker data from the request sent by the frontend
#     ticker_data = request.json['ticker_data']
#     print("Received ticker data:", ticker_data)
#     # Call the predict function from ml_model.py to make predictions
#     prediction = predict(ticker_data)
    
#     # Return the prediction in JSON format
#     return prediction

if __name__=="__main__":
    app.run(host="0.0.0.0",debug=True)