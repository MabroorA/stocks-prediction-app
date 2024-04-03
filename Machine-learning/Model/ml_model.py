from flask.json import jsonify
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

    return data_scaled


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
    processed_data = preprocess_data(ticker_data)

    # dataset creation
    time_step = 100
    X, y = create_dataset(processed_data, time_step)

    # reshape for lstm
    X = X.reshape((X.shape[0], X.shape[1], 1))
    
    model = define_model()

    input_data = preprocess_data(data['input_data'])
    input_data = input_data.reshape(1, -1, 1)  # Reshape data for LSTM model
    # For now, return a random prediction
    prediction = np.random.rand()  
    # For now, return a random prediction
    return jsonify({'prediction': prediction})