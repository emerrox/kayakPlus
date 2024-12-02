import { GoogleLogin, CredentialResponse  } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export default function Landing (){
    const navigate = useNavigate();

    const responseMessage = (response: CredentialResponse): void => {
        console.log("Token JWT recibido:", response.credential);
        navigate("/home");
      };
      
      const errorMessage = (): void => {
        console.log('algo va mal en el login');
      };
      

    return(
        <div className="cont">

        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />

        <br />
        <br />

        {/* <Link to={"/login"}>
            <button>ir a login</button>
        </Link> */}
        
        </div>
    )
}