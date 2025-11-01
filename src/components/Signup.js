import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.signup(formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix"
        style={styles.netflixLogo}
      />
      
      <div style={styles.formBox}>
        <h1 style={styles.title}>Create Account</h1>
        {error && <div style={styles.error}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password (min 6 characters)"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
            minLength="6"
          />
          <button 
            type="submit" 
            style={styles.button}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p style={styles.link}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to bottom, #000000, #1a1a1a)',
    position: 'relative',
  },
  netflixLogo: {
    position: 'absolute',
    top: '20px',
    left: '40px',
    height: '45px',
    width: 'auto',
  },
  formBox: {
    background: 'rgba(0, 0, 0, 0.75)',
    padding: '60px 68px 40px',
    borderRadius: '4px',
    width: '100%',
    maxWidth: '450px',
  },
  title: {
    color: '#fff',
    marginBottom: '28px',
    fontSize: '32px',
  },
  input: {
    width: '100%',
    padding: '16px',
    marginBottom: '16px',
    background: '#333',
    border: 'none',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '16px',
    background: '#e50914',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '24px',
  },
  error: {
    background: '#e87c03',
    padding: '12px',
    borderRadius: '4px',
    color: '#fff',
    marginBottom: '16px',
  },
  link: {
    color: '#737373',
    marginTop: '16px',
  }
};

export default Signup;

