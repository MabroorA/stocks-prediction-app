# Stocks Prediction Tool
This project aims to develop a stocks investment decision tool through data analysis and simulation. It integrates various APIs for data collection and utilizes machine learning models for prediction. The tool provides allows investors to generate buy / sell signals by analysing historical data and/or enabling to play what if games: what if I had invested £1000 how much I would have been well or worse off? in short, we would like to devise investment strategies and then evaluate them.

<details>
<summary>Tech Stack</summary>
  
## Languages
- <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" alt="TypeScript Logo" width="20" height="20"> TypeScript
- <img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" alt="Python Logo" width="20" height="20"> Python


## **Front End**
- React (Typescript)

## **Back End**
- Node.js (Typescript)

## To Transfer API data from **frontend** to **Machine learning model**
- Flask (Python) was used to receive data from React 

</details>

<details>

<summary>Current Kanban board</summary>

![image](https://github.com/MabroorA/Stocks-Prediction-App/assets/109113298/7df090e5-763e-424d-ad74-eb60def700a8)


</details>

## Home Page
<img src="https://github.com/MabroorA/Stocks-Prediction-App/assets/109113298/0e2cc4f9-0b63-4b90-b801-40801bd09a0a" alt="Home Page" width="800" height="400">

## Predict Page

<img src="https://github.com/MabroorA/Stocks-Prediction-App/assets/109113298/0bc3506f-9285-4ebb-83b7-da5970a280ef" alt="Predict Page" width="600" height="400">


### Current Features
- Top 5 Gainers and Losers in the stock market is displayed at home page.
- Daily Average Price: Retrieve daily average price data for a specific stock.
- Search Ticker: Search for ticker information for a specific company.
- Search to Display Ticker: Retrieve history daily for previous 5 years for visualization & to download.
- Latest News: Fetch the latest news related to stocks.
## Machine Learning Integration
Currently, the project is in the process of integrating the fetched data into a Long Short-Term Memory (LSTM) machine learning model for predictive analysis.

![image](https://github.com/MabroorA/Stocks-Prediction-App/assets/109113298/24f86da0-dbb7-4a64-b88b-96c11c141e09)


## Installation
- Clone the repository.
- Install dependencies using npm install.
- Set up environment variables for API keys.
- Run the application using npm run dev in /frontend folder.
To run Server
- Run the application using npm run dev in /frontend folder

## APIs Used
- [Twelve Data](https://twelvedata.com/)
- [Polygon.io ](https://polygon.io/)
- [financialmodelingprep.com](https://site.financialmodelingprep.com/)

### Visualization Libraries
The project utilizes Recharts and Charts.js libraries for visualizing data, enabling users to interpret trends and patterns effectively.
- [Recharts](https://recharts.org/en-US/)
- [Charts.js](https://www.chartjs.org/)



