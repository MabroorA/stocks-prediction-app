import NavBar from "../../Components/Navbar/NavBar"
import "./FinancialSummary.css"


export default function FinancialSummary() {
  return (
    <>
    <NavBar/>
    <div className='financial-summary'>
        
    </div>
    <div className='financial-summary-banner'>
      <div className="banner-left">
        <h1>Picture</h1>
      </div>
      <div className="banner-right">
        <div>
          <h1 className='stock-full-name'>International Business Machines Corporation</h1>
          <h1 className='stock-ticker'>Ticker symbol</h1>
        </div>
        <div className="stock-price-info">
          <h1 className='stock-price'>183.50</h1>
          <h1 className='stock-price-change'>Stock price change ^</h1>
        </div>
        
      </div>
    </div>
    </>
  )
}