import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Forms.css';

function LoginForm() {
    let navigate =  useNavigate();
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    });
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('/login', formData);
        console.log(response.data);
        navigate('room/a')
        // Handle success (e.g., store the token and redirect to a protected page)
      } catch (error) {
        console.error('Login failed:', error);
        // Handle errors (e.g., display error message)
      }
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <h1>Welcome Back!</h1>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Valid Email/Username..." required />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter Your Password..." required />
        <button type="submit">Login</button>
      </form>
    );
  }
  
  export default LoginForm;