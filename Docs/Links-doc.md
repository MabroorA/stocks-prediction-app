# Front-end
### libraries used
    recharts - https://recharts.org/
    Chart.js - [Chart.js](https://www.chartjs.org/)

# Back-end 
### libraries used

# Data APIs 
[financialmodelingprep.com](https://site.financialmodelingprep.com/)
[Twelve Data](https://twelvedata.com/)
[Polygon.io ](https://polygon.io/)

# Machine learning 
### Data Collection (Currently on)
- Gather historical stock data (Done)
 - What intervals should be used for the historical data that is the best for prediction?(Daily used)
  - (Daily intervals) Provides a good balance between granualrity and efficieny
   - daily api point "https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?apikey=wc2bbHWhFBL7no45kaUlx2xLHI2z2wv1"
  - (monthly intervals) used for long term investments
- Data should be able to be downloaded for selected stock (Done)
### Data preprocessing
- Clean the data by handling missing values, outliers and incosistencies.
- convert to correct format for the machine learning model to be able to use.
 - Normalisation or scalling?

### Feature Engineering:
- extract relavent features from the raw data that might influebce stock price.
 - technical indecators, sentiment analysis of news articles, economic indicators, etc.
 
### Model Selection:
- current model to be used is LSTM

### Model Evaluation:


### Deployment:
- One models performance is usable, it needs to be integrated to the wep app.
- api endpint to be exposed allowing users to input a ticker symbol and recieve stock prediction
