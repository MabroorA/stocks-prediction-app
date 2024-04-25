import { useState } from "react";
import NavBar from "../../Components/Navbar/NavBar"
import { StockSummary } from "../../types";
import "./FinancialSummary.css"
import ibmImage from "./ibm.png"; 

const mockIBMSummary: StockSummary = {
  symbol: "IBM",
  price: 183.50,
  beta: 0.85,
  volAvg: 1000000,
  mktCap: 170000000000,
  lastDiv: 6.00,
  range: "170.00 - 190.25",
  changes: 1.91,
  companyName: "International Business Machines Corporation",
  currency: "USD",
  cik: "1352000", // Replace with actual Central Index Key (find online)
  isin: "US4691802070", // Replace with actual International Securities Identification Number (find online)
  cusip: "005916100", // Replace with actual Committee on Uniform Securities Identification Procedures number (find online)
  exchange: "NYSE",
  exchangeShortName: "New York Stock Exchange",
  industry: "Information Technology - Hardware",
  website: "https://www.ibm.com",  // Replace with actual website
  description: "IBM is a global technology company that provides a wide range of products and services, including computer hardware, software, and cloud computing.",
  ceo: "Arvind Krishna",  // Replace with actual CEO name (find online)
  sector: "Technology",  // Replace with actual sector (find online)
  country: "United States",
  fullTimeEmployees: "350,000",  // Replace with actual employee count (find online)
  // ... other optional properties with placeholders
  image: ibmImage as string,
  ipoDate: "1916-06-16",  // Replace with actual IPO date (find online)
  defaultImage: false,
  isEtf: false,
  isActivelyTrading: true,
  isAdr: false,
  isFund: false,
};

export default function FinancialSummary() {
  
  // saving stock summary  
  const [stockSummary, setstockSummary] = useState<StockSummary>(mockIBMSummary);


  return (
    <>
      <NavBar/>
      <div className='financial-summary'>
          
      
          <div className='financial-summary-banner'>

              <div className="banner-left">
                <img  className="logo-img"src={ibmImage} alt="IBM Logo" />
              </div>

              <div className="banner-right">
                <div className="stock-name-info">
                  <h1 className='stock-full-name'>{mockIBMSummary.companyName}</h1>
                  <h1 className='stock-ticker'>{mockIBMSummary.symbol}</h1>
                </div>
                <div className="stock-price-info">
                  <h1 className='stock-price'>{mockIBMSummary.price}</h1>
                  <h1 className='stock-price-change'>{mockIBMSummary.changes}</h1>
                </div>
                
              </div>
          </div>
          <div className="stock-sections">
            <div className="stocks-left-sections">
              
                <div className="stock-about-section">
                    <h1>About</h1>
                    <div className="stock-about-header">
                      <h3>ceo</h3>
                      <h3>description</h3>
                      <h3>Industry</h3>
                      <h3>Website</h3>
                      <h3>Exchange</h3>
                    </div>
                </div>

                
                <div className="stocks-left-half-blocks">
                  <div className="stock-summary-section">
                        <h1>summary</h1>
                        <h3>{mockIBMSummary.description}</h3>

                        

                  </div>
                  <div className="stock-historical-prices-section">
                        <h1>historical prices </h1>
                        <h3>description</h3>

                  </div>
                </div>  
            </div>

            <div className="stock-news-section">
                  <h1>News</h1>
                  <li>description</li>

            </div>

          </div>
      </div>
    </>
  )
}