from flask.json import jsonify
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM

def define_model():
    # Define and compile the model architecture
    model = Sequential()
    model.add(LSTM(50, return_sequences=True, input_shape=(100, 1)))
    model.add(LSTM(50, return_sequences=True))
    model.add(LSTM(50))
    model.add(Dense(1))
    model.compile(loss='mean_squared_error', optimizer='adam')
    return model

model = define_model()

def preprocess_data(data):
    try:
        # Convert JSON data to DataFrame
        df = pd.DataFrame(data['historical'])
        
        # Set 'date' column as index
        df['date'] = pd.to_datetime(df['date'])
        df.set_index('date', inplace=True)
        
        # Select only 'close' column for prediction
        df = df[['close']]
        
        # Scale the data
        scaler = MinMaxScaler(feature_range=(0, 1))
        data_scaled = scaler.fit_transform(df)
        
        return data_scaled, scaler
    except Exception as e:
        print("Error during data preprocessing:", e)
        return None, None

def create_dataset(dataset, time_step=1):
    dataX, dataY = [], []
    for i in range(len(dataset)-time_step):
        a = dataset[i:(i + time_step), 0]
        dataX.append(a)
        dataY.append(dataset[i + time_step, 0])
    return np.array(dataX), np.array(dataY)

def predict(ticker_data):
    try:
        processed_data, scaler = preprocess_data(ticker_data)

        time_step = 100
        X, y = create_dataset(processed_data, time_step)

        X = X.reshape((X.shape[0], X.shape[1], 1))
        
        prediction = model.predict(X)

        prediction_original_scale = inverse_transform_predictions(prediction, scaler)
        return prediction_original_scale
    except Exception as e:
        print("Error during prediction:", e)
        return None

def inverse_transform_predictions(predictions, scaler):
    predictions = np.array(predictions)
    if predictions.ndim == 1:
        predictions = predictions.reshape(-1, 1)
    predictions_original_scale = scaler.inverse_transform(predictions)
    return predictions_original_scale.tolist()

def test_model(csv_file_path):
    try:
        # Read the CSV file
        df = pd.read_csv(csv_file_path)

        # Convert 'date' column to datetime
        df['date'] = pd.to_datetime(df['date'])

        # Sort dataframe by date
        df = df.sort_values(by='date')

        # Extract 'date' and 'close' columns
        ticker_data = df[['date', 'close']].to_dict('records')

        # Define the model
        model = define_model()

        # Make predictions
        prediction = predict(ticker_data)

        return {"prediction": prediction}
    except Exception as e:
        print("Error during model testing:", e)
        return None
