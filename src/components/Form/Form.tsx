import "./Form.css"
import { useState, useEffect} from "react";
import Data from "./Data"

const loginData = {
    email: 'a22110059@ceti.mx',
    password: '123'
}

function Form (){
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showData, setShowData] = useState<boolean>(false);

    useEffect(() =>{
        if(email.includes("ñ")){
            alert("No se permiten correos con la letra Ñ")
            setEmail("")
        }
    }, [email]);

    const handleInputChange = (stateUpdate) =>{
        return (event) =>{
            stateUpdate(event.target.value)
        }
    }

    const handleOnClick = () =>{
        /*if(showData){
            setEmail("");
            setPassword("");
        }
        setShowData(!showData)*/

        if(email === loginData.email && password === loginData.password){
            alert('Acceso correcto')
        }else{
            alert('Correo o contraseña incorrectos');
            setEmail("");
            setPassword("");
        }
    }
    return(
        <>
            
            <Data email={email} password={password} showData={showData}></Data>
            <section className="formContainer">

                <span className="inputContainer">
                    <label htmlFor="email">Email:</label>
                    <input type='email' id='email' name='email' 
                    placeholder='example@gmail.com' value={email} onChange={handleInputChange(setEmail)} />
                </span>
                <span className="inputContainer">
                    <label htmlFor="name">Password:</label>
                    <input type='text' id='password' name='password' 
                    placeholder='password' value={password} onChange={handleInputChange(setPassword)}/>
                </span>

                
                <button onClick={handleOnClick}>
                
                {
                    showData ? "Ocultar" : "Mostrar"
                }

                </button>
            </section>
        </> 
    );
}

export default Form;