import logo from "../assets/FinStimulate.png";
export default function Menu() {
    return(
        <>
        <div className="Menu">
            <img className="Logo" src= {logo}/> 
            <a className="active" href="/#"> Today Trends</a>
            <a href="/#"> Top Companies</a>
            <a href="/#"> Login </a>


            <a className="register-button" href="/register"> Register</a>
        </div>
        </>
    );
    
}