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
  website: "https://www.ibm.com/uk-en",  // Replace with actual website
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
      <NavBar />
      <div className="financial-summary">
        <div className="financial-summary-banner">
          <div className="banner-left">
            <img className="logo-img" src={ibmImage} alt="IBM Logo" />
          </div>

          <div className="banner-right">
            <div className="stock-name-info">
              <h1 className="stock-full-name">{stockSummary.companyName}</h1>
              <h1 className="stock-ticker">{stockSummary.symbol}</h1>
            </div>
            <div className="stock-price-info">
              <h1 className="stock-price">{stockSummary.price.toFixed(2)}</h1> {/* Format price with toFixed */}
              <h1 className="stock-price-change">
                {stockSummary.changes}({(stockSummary.changes / stockSummary.price * 100).toFixed(2)}%)
              </h1>
            </div>
          </div>
        </div>

        <div className="stock-sections">
          <div className="stocks-left-sections">
            <div className="stock-about-section">
              <h1>About</h1>
              <div className="about-sections">
                  <div>
                    <div className="stock-about-headers">
                        <div className="about-header-section">
                          <h2>CEO</h2>
                          <p>{stockSummary.ceo}</p>
                        </div>
                        <div className="about-header-section">
                          <h2>Sector</h2>
                          <p>{stockSummary.sector}</p>
                        </div>
                        <div className="about-header-section">
                          <h2>Industry</h2>
                          <p>{stockSummary.industry}</p>
                        </div>
                        <div className="about-header-section">
                          <h2>Website</h2>
                          <a href={stockSummary.website}>{stockSummary.website}</a>
                        </div>
                        <div className="about-header-section">
                          <h2>Exchange</h2>
                          <p>{stockSummary.exchange}</p>
                        </div>
                    </div>

                    <div className="about-description">
                      <h1>Description</h1>
                      <p>{stockSummary.description}</p>
                    </div>
                  </div>
              

                  <div className="about-sidebar">
                      <div className="about-sidebar-sections">
                        <div className="about-sidebar-section">
                          <h3>IPO Date</h3>
                          <p>{mockIBMSummary.ipoDate}</p>
                        </div>
                        <div className="about-sidebar-section">
                          <h3>Employee</h3>
                        </div>
                        <div className="about-sidebar-section">
                          <h3>Country</h3>
                        </div>
                      </div>
                  </div>

                </div>
            </div>

            <div className="stocks-left-half-blocks">
              <div className="stock-summary-section">
                <h1>Summary</h1>
                <h3>{stockSummary.description}</h3> {/* Placeholder for now */}
              </div>
              <div className="stock-historical-prices-section">
                <h1>Historical Prices</h1>
                <h3>Historical price data not yet implemented</h3> {/* Placeholder */}
              </div>
            </div>
          </div>

          <div className="stock-news-section">
            <h1>News</h1>
            <li>News data not yet implemented</li> {/* Placeholder */}
          </div>
        </div>
      </div>
    </>
  );
}