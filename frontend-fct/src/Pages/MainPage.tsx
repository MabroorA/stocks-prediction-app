import ApiCall from "../Components/ApiCall";
import Menu from "../Components/Menu";


export default function MainPage (){


    return (
        <>
        <Menu/>
        <div className="Main content" >
            <h1>Main content </h1>
            <h3>
                The table data will go here 
            </h3>
            <ApiCall/>


        </div>
        </>

    );
}