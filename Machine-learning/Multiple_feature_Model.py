from flask.json import jsonify
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM
import matplotlib.pyplot as plt

def define_model():
    #  model architecture
    model = Sequential()
    model.add(LSTM(50, return_sequences=True, input_shape=(100, 1)))
    model.add(LSTM(50, return_sequences=True))
    model.add(Dense(50))
    model.add(Dense(1))
    model.compile(loss='mean_squared_error', optimizer='adam')
    return model


def preprocess_data(data):
    try:
        df = pd.DataFrame(data["historical"])
        df_close = df[["close"]]
        scaler = MinMaxScaler(feature_range=(0, 1))
        data_scaled = scaler.fit_transform(np.array(df_close).reshape(-1,1))
        return df,data_scaled, scaler 
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

def train_model(model, X_train, y_train, X_test, y_test):
    try:
        model.fit(X_train, y_train, validation_data=(X_test, y_test), epochs=10, batch_size=64, verbose=1)
        return model
    except Exception as e:
        print("Error during training:", e)
        return None

def predict(model, X):
    try:
        prediction = model.predict(X)
        return prediction
    except Exception as e:
        print("Error during prediction:", e)
        return None
    
def inverse_transform_predictions(predictions, scaler):
    try:
        # Reshape predictions if necessary
        if len(predictions.shape) == 3:
            predictions = predictions.reshape(predictions.shape[0], predictions.shape[1])

        predictions = np.array(predictions)
        predictions_original_scale = scaler.inverse_transform(predictions)
        return predictions_original_scale
    except Exception as e:
        print("Error during inverse transformation:", e)
        return None
    
def plot_predictions(df, train_predict_original, test_predict_original):
    try:
        plt.figure(figsize=(17, 11))
        plt.xlabel('Date')
        plt.ylabel('Value')

        # Plot the original data
        plt.plot(df.index, df['close'], label='Original Data')

        # Plot the training predictions
        train_length = len(train_predict_original)
        train_index = df.index[:train_length]
        plt.plot(train_index, train_predict_original, label='Training Predictions', color="green")

        # Plot the testing predictions
        test_length = len(test_predict_original)
        test_index = df.index[-test_length:]
        plt.plot(test_index, test_predict_original, label='Testing Predictions', color="red")

        plt.legend(loc='upper right', fontsize='xx-large')
        plt.show()
    except Exception as e:
        print("Error during plotting:", e)

def run_workflow(data):
    try:
        model = define_model()
        df, processed_data, scaler = preprocess_data(data)  # Assigning df_close here
        time_step = 100
        X, y = create_dataset(processed_data, time_step)
        Training_size = int(len(X) * 0.65)
        test_size = len(X) - Training_size
        X_train, y_train = X[:Training_size], y[:Training_size]
        X_test, y_test = X[Training_size:], y[Training_size:]
        X_train = X_train.reshape(X_train.shape[0], X_train.shape[1], 1)
        X_test = X_test.reshape(X_test.shape[0], X_test.shape[1], 1)
        trained_model = train_model(model, X_train, y_train, X_test, y_test)
        train_predict = predict(trained_model, X_train)
        test_predict = predict(trained_model, X_test)
        train_predict_original = inverse_transform_predictions(train_predict, scaler)
        test_predict_original = inverse_transform_predictions(test_predict, scaler)
        
        # Get actual values for train and test sets
        train_actual = inverse_transform_predictions(y_train.reshape(-1, 1), scaler)
        test_actual = inverse_transform_predictions(y_test.reshape(-1, 1), scaler)

        
        # Prepare the predictions in the desired format
        dates = df['date'].tolist()
        original_close = df['close'].tolist()
        
        train_predictions_dict = {
            'date': dates[:Training_size],
            'original_close': original_close[:Training_size],
            'predicted_close': train_predict_original.flatten().tolist(),
        }
        
        test_predictions_dict = {
            'date': dates[Training_size:],
            'original_close': original_close[Training_size:],
            'predicted_close': test_predict_original.flatten().tolist(),
        }
        return train_predictions_dict, test_predictions_dict
    except Exception as e:
        print("Error during workflow execution:", e)
        return None, None
