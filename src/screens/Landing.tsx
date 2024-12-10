import { GoogleLogin, CredentialResponse  } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import {VALIDATE_URL} from '../apiName'

export default function Landing (){
    
    const navigate = useNavigate();


    const responseMessage = async (response: CredentialResponse): Promise<void> => {
      const token = response.credential;
      console.log(response);
      
  
      if (token) {
        try {
          const response = await fetch(VALIDATE_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json", 
            },
            body: JSON.stringify({ oauthToken: token }),
            credentials: 'include'
          });
  
          if (!response.ok) {
            throw new Error("Error en la autenticación.");
          }
  
          const data = await response.json();
          console.log("Respuesta del backend:", data);
  
          navigate("/home");
        } catch (error) {
          console.error("Error al enviar el token al backend:", error);
        }
      } else {
        console.error("No se recibió el token.");
      }
    };
      
      const errorMessage = (): void => {
        console.log('algo va mal en el login');
      };

    return(
        <div className="cont">

        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />



        {/* <Link to={"/login"}>
            <button>ir a login</button>
        </Link> */}
        
        </div>
    )
}