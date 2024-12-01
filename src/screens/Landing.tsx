import { Link } from "react-router-dom";

export default function Landing (){
    return(
        <div className="cont">

        <Link to={"/home"}>
            <button>ir a home</button>
        </Link>

        <br />
        <br />

        <Link to={"/login"}>
            <button>ir a login</button>
        </Link>
        
        </div>
    )
}