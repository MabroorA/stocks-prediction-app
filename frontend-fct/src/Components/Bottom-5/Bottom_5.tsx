import  { useState, useEffect } from "react";
import "./Bottom_5.css"; 

interface Stock {
  symbol: string;
  name: string;
  change: number;
  price: number;
  changesPercentage: number;
}

function Bottom_5() {
  const [topStocks, setTopStocks] = useState<Stock[]>([]); // Define state for top stocks

  useEffect(() => {
    fetchTopStocks(); // Fetch top stocks when component mounts 
  }, []);

  const fetchTopStocks = async () => {
    try {
      const response = await fetch("http://localhost:3000/losers"); // Assuming "/top5" is the correct backend endpoint
      const data = await response.json();
      setTopStocks(data); // Set top stocks data
      // Sort the data based on changesPercentage in descending order
      data.sort((a: Stock, b: Stock) => b.changesPercentage - a.changesPercentage);
      // Take the top 5 stocks
      const top5Stocks = data.slice(0, 5);
      setTopStocks(top5Stocks); // Set bottom 5 stocks data
    } catch (error) {
      console.error("Error Fetching Losers stocks:", error);
    }
  };

  return (
    <div className="Bottom-5">
      {topStocks.map((stock, index) => (
        <div key={index} className="stock-bar"> 
          <div className="stock-name">{stock.name}</div>
          <div className="stock-change">{stock.change.toFixed(2)} ({stock.changesPercentage.toFixed(2)}%)</div>
        </div>
      ))}
    </div>
  );
}

export default Bottom_5;
