import "./Form.css";
import { useState, useEffect } from "react";
import Data from "./Data";
import CategoryTable from './CategoryTable';
import { useNavigate } from "react-router-dom";
const API_URL = "http://localhost:3000/";


function Form() {

    const navigate = useNavigate(); 
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showData, setShowData] = useState<boolean>(false);

    const [category, setCategories] = useState<any>(null);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const userInStorageString = window.localStorage.getItem("user");
        if (userInStorageString !== null) {
            const userInStorage = JSON.parse(userInStorageString);
            setUser(userInStorage);
        }
    }, []);

    const handleInputChange = (stateUpdate: React.Dispatch<React.SetStateAction<string>>) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            stateUpdate(event.target.value);
        }
    }

    const handleOnClick = () => {
        logIn({ email, password });
    }

    const logIn = async ({ email, password }: { email: string, password: string }) => {
        try {
            const response = await fetch(`${API_URL}api/v1/auth/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            setUser(data);
            window.localStorage.setItem("user", JSON.stringify(data));
            navigate("../ventana_principal"); // usa navigate en lugar de history.push
        } catch (error) {
            console.error('Error fetching data:', error);
            alert("Hubo un problema al intentar iniciar sesión.");
        }
    }
    

    const fetchCategory = async () => {
        try {
            const response = await fetch(`${API_URL}api/v1/categories/`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            if (!response.ok) {
                throw new Error('Error al obtener las categorías');
            }
            const data = await response.json();
            setCategories(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>

            <Data email={email} password={password} showData={showData}></Data>
            <div className="loginContainer">
                <h1>Inicia sesión</h1>
                <div className="formContainer">
                    <span className="inputContainer">
                        <input type='email' id='email' name='email'
                            placeholder='Email' value={email} onChange={handleInputChange(setEmail)} />
                    </span>
                    <span className="inputContainer">
                        <input type='password' id='password' name='password'
                            placeholder='Contraseña' value={password} onChange={handleInputChange(setPassword)} />
                    </span>
                    <button onClick={handleOnClick}>
                        Iniciar sesión
                    </button>
                    <div className="extras">
                        
                        <a href="#">¿No tienes cuenta? <span>Registrarse</span></a>
                    </div>
                    
                </div>
            </div>
        </>
    );
}

export default Form;