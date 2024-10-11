import React, { useState } from 'react';

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState({
    collegiateNumber: '',
    dpi: '',
    birthDate: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  // Aquí hacemos la petición al backend para iniciar sesión
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData), // Mandamos los datos del formulario
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.token); // Guardar el token en localStorage
        localStorage.setItem('token', data.token); // Guardamos el token JWT
        alert('Login successful!');
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="collegiateNumber"
          placeholder="Collegiate Number"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
