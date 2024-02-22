import NavBar from '../../Components/Navbar/NavBar'
import SearchStock from '../../Components/Search-Stock/SearchStock';
import "./Analyse.css"
export default function Analyse() {
  return (
    <>
      <NavBar />
      <div className='analyse-container'>
        <h1 className='title'>Analyse</h1>
        <input/>
        <SearchStock/>
      </div>
    </>
  );
}
