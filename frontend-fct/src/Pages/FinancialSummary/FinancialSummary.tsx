import NavBar from "../../Components/Navbar/NavBar"
import "./FinancialSummary.css"
import ibmImage from "./ibm.png"; 


export default function FinancialSummary() {
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
                  <h1 className='stock-full-name'>International Business Machines Corporation</h1>
                  <h1 className='stock-ticker'>IBM</h1>
                </div>
                <div className="stock-price-info">
                  <h1 className='stock-price'>183.50</h1>
                  <h1 className='stock-price-change'>1.91(1.05%)</h1>
                </div>
                
              </div>
          </div>
          <div className="stock-sections">
            <div className="stocks-left-sections">
              
                <div className="stock-about-section">
                      <h1>ceo</h1>
                      <h3>description</h3>
                </div>
                
                <div className="stocks-left-half-blocks">
                  <div className="stock-summary-section">
                        <h1>summary</h1>
                        <h3>description</h3>

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