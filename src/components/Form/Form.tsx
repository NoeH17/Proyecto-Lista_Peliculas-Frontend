import "./Form.css"
import { useState, useEffect} from "react";
import Data from "./Data"
import CategoryTable from './CategoryTable';

const API_URL = "http://localhost:3010/";

const loginData = {
    email: 'fernando@gmail.com',
    password: '123'
}



function Form (){
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




    const handleInputChange = (stateUpdate: React.Dispatch<React.SetStateAction<string>>) =>{
        return (event: React.ChangeEvent<HTMLInputElement>) =>{
            stateUpdate(event.target.value)
        }
    }

    const handleOnClick = () =>{

        /*logIn({email, password})
        

        if(email === loginData.email && password === loginData.password){
            alert('Acceso correcto')
        }else{
            alert('Correo o contraseña incorrectos');
            setEmail("");
            setPassword("");
        }*/
        fetchCategory();
    }

    const logIn = async ({email, password}: {email: string, password: string}) =>{
        try{
            const response = await fetch(`${API_URL}api/v1/auth/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password}),
            });
    
            if(response.status === 200){
                const data = await response.json();
                setUser(data);
                window.localStorage.setItem("user", JSON.stringify(data))
            } else{
                alert("Usuario o contraseña incorrectos");
            }
            
            
            //console.log(data);
        } catch (error){
            console.error(error);
        }
    }


    const fetchCategory = async () => {
        try {
            const response = await fetch(`${API_URL}api/v1/categories`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            if (!response.ok) {
                throw new Error('Error al obtener las categorías');
            }
            const data = await response.json();
            setCategories(data); // Aquí estabas usando 'data' como si fuera un objeto con una propiedad 'category'
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    
    
    return(
        <>
            {
                category && <CategoryTable categories={category} />
            }

            <Data email={email} password={password} showData={showData}></Data>
            <section className="formContainer">

                <span className="inputContainer">
                    <label htmlFor="email">Email:</label>
                    <input type='email' id='email' name='email' 
                    placeholder='example@gmail.com' value={email} onChange={handleInputChange(setEmail)} />
                </span>
                <span className="inputContainer">
                    <label htmlFor="name">Password:</label>
                    <input type='password' id='password' name='password' 
                    placeholder='password' value={password} onChange={handleInputChange(setPassword)}/>
                </span>

                
                <button onClick={handleOnClick}>
                    Iniciar Sesión
                </button>
            </section>
        </> 
    );
}

export default Form;