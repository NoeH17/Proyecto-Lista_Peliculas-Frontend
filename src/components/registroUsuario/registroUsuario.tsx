import React, { useState } from 'react';
import './registroUsuario.css';
import { useNavigate } from "react-router-dom";

type ToClientUser = {
  id?: string;
  name: string;
  email: string;
  password: string;
  age: string;
  phoneNumber: string;
};

const App: React.FC = () => {
    const navigate = useNavigate(); 
  const [user, setUser] = useState<ToClientUser>({
    name: '',
    email: '',
    password:"",
    age: '',
    phoneNumber: ''

  });


  const [message, setMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Usuario registrado con éxito');
        setUser({
          name: '',
          email: '',
          password: "",
          age: '',
          phoneNumber: ''
        });
      } else {
        setMessage(`Error: ${result.message}`);
      }
      navigate("/")
    } catch (error) {
      setMessage(`Error: ${error}`);
    }
  };

  return (
    <div className="App">
      <h1>Registro de Usuario</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={user.name}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={user.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="age"
          placeholder="Edad"
          value={user.age}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Número de Teléfono"
          value={user.phoneNumber}
          onChange={handleChange}
          required
        />
        <br />
        
        <button type="submit">Registrar</button>
      </form>
      <div>{message}</div>
    </div>
  );
};

export default App;