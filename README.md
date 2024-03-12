# Stocks Prediction Tool
This project aims to develop a stocks investment decision tool through data analysis and simulation. It integrates various APIs for data collection and utilizes machine learning models for prediction. The tool provides allows investors to generate buy / sell signals by analysing historical data and/or enabling to play what if games: what if I had invested £1000 how much I would have been well or worse off? in short, we would like to devise investment strategies and then evaluate them.

## To-Do
Complete integration with LSTM machine learning model.
Enhance visualization capabilities for better data interpretation.
Implement additional features for comprehensive stock analysis.

## Installation
- Clone the repository.
- Install dependencies using npm install.
- Set up environment variables for API keys.
- Run the application using npm run dev in /frontend folder.
To run Server
- Run the application using npm run dev in /frontend folder

## APIs Used
- Twelve Data API
- Provides daily average price data for specific stocks.
- Polygon.io API

### Visualization Libraries
The project utilizes Recharts and Charts.js libraries for visualizing data, enabling users to interpret trends and patterns effectively.

Offers a range of financial data including:
Full quote for a single stock.
Historical stock data.
Top gainers and losers in the stock market.
### Current Features
- Daily Average Price: Retrieve daily average price data for a specific stock.
- Exponential Moving Average (EMA): Calculate EMA for a given stock.
- Search Ticker: Search for ticker information for a specific company.
- Search to Display Ticker: Retrieve SMA data for visualization.
- Grouped Daily: Get grouped daily stock data for analysis.
- Latest News: Fetch the latest news related to stocks.
- Full Quote Single Stock: Retrieve detailed quote information for a single stock.
- Intraday Given Stock and Timeframe: Get intraday stock data for a given timeframe.
- Intraday: Retrieve intraday stock data.
**Top 5 Gainers and Losers**: Fetch data on the top gainers and losers in the stock market.

## Machine Learning Integration
Currently, the project is in the process of integrating the fetched data into a Long Short-Term Memory (LSTM) machine learning model for predictive analysis.



