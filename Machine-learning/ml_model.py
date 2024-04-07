from flask.json import jsonify

import pandas as pd
from sklearn.preprocessing import MinMaxScaler
import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM



# Define the model architecture

def define_model():
    # Define and compile the model architecture
    model = Sequential()
    model.add(LSTM(50, return_sequences=True, input_shape=(100, 1)))
    model.add(LSTM(50, return_sequences=True))
    model.add(LSTM(50))
    model.add(Dense(1))
    model.compile(loss='mean_squared_error', optimizer='adam')


    return model

# load model 
model = define_model()

# preprocessing 
def preprocess_data(data):
    
    scaler = MinMaxScaler(feature_range=(0, 1))
    data_scaled = scaler.fit_transform(np.array(data).reshape(-1, 1))

    return data_scaled,scaler


# dataset creation
def create_dataset(dataset, time_step=1):
    dataX, dataY = [], []
    for i in range(len(dataset)-time_step):
        a = dataset[i:(i + time_step), 0]
        dataX.append(a)
        dataY.append(dataset[i + time_step, 0])
    return np.array(dataX), np.array(dataY)

def predict(ticker_data):

    ## preprocess
    processed_data, scaler  = preprocess_data(ticker_data)

    # dataset creation
    time_step = 100
    X, y = create_dataset(processed_data, time_step)

    # reshape for lstm
    X = X.reshape((X.shape[0], X.shape[1], 1))
    
    model = define_model()
    # Make the prediction
    prediction = model.predict(X)

    # return as a list it doesnt need to be json format
    # turn result into original scale
    prediction_original_scale = inverse_transform_predictions(prediction, scaler)
    return prediction_original_scale

# function to turn data to its original form
def inverse_transform_predictions(predictions, scaler ):

    # Ensure predictions is a numpy array
    predictions = np.array(predictions)

    # Reshape predictions if it's a 1D array
    if predictions.ndim == 1:
        predictions = predictions.reshape(-1, 1)

    # Inverse transform the predictions
    predictions_original_scale = scaler.inverse_transform(predictions)

    return predictions_original_scale.tolist()

def test_function(ticker_data):
    return "TEST FUNCTION WORKING"

def test_model(csv_file_path):
    
    # csv to dataframe
    df = pd.read_csv(csv_file_path)
    
    # Extract the 'close' column  for prediction)
    ticker_data = df['close'].values.tolist()  # currently its only 'close' clomn to be used for prediction 
    
    # Call the predict function to make predictions on the ticker data
    prediction = predict(ticker_data)
    
    return {"prediction": prediction}