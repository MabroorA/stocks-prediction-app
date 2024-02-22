
import NavBar from '../../Components/Navbar/NavBar'
import News from '../../Components/News/News'
import "./NewsPage.css"


export default function NewsPage() {
  return (
    <>
    <NavBar/>
    <div>
        <h1 className='News-title'>News Page</h1>
        <News/>
    </div>    
    </>
  )
}