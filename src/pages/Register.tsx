import React, { useState } from 'react';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    collegiateNumber: '',
    name: '',
    email: '',
    dpi: '',
    birthDate: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData); // Aquí iría la lógica para enviar datos al backend
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="collegiateNumber"
          placeholder="Collegiate Number"
          onChange={handleChange}
        />
        {/* Agregar los demás campos como nombre, DPI, etc. */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
