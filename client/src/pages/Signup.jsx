import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    // Make handleCredentialResponse available globally for Google callback
    window.handleCredentialResponse = (response) => {
      console.log('Google Sign-Up successful:', response);
      // Handle the credential response here
      // You can decode the JWT token and get user info
    };

    const initializeGoogleSignIn = () => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id: '705184843071-t6cck0onvhjri6ug9250dmmcjq76tsst.apps.googleusercontent.com',
          callback: window.handleCredentialResponse
        });

        const buttonContainer = document.getElementById('googleSignInBtn');
        if (buttonContainer) {
          window.google.accounts.id.renderButton(buttonContainer, {
            type: 'standard',
            shape: 'rectangular',
            theme: 'outline',
            text: 'signup_with',
            size: 'large',
            logo_alignment: 'left'
          });
        }
      } else {
        // Retry after a short delay if Google API not loaded yet
        setTimeout(initializeGoogleSignIn, 100);
      }
    };

    // Check if script already exists
    const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
    if (existingScript) {
      initializeGoogleSignIn();
    } else {
      // Script is loaded in index.html, so just initialize
      if (window.google) {
        initializeGoogleSignIn();
      } else {
        // Wait for script to load
        const checkGoogle = setInterval(() => {
          if (window.google) {
            clearInterval(checkGoogle);
            initializeGoogleSignIn();
          }
        }, 100);
        
        return () => clearInterval(checkGoogle);
      }
    }

    return () => {
      delete window.handleCredentialResponse;
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }

    // Handle signup logic here
    console.log('Signup form submitted:', formData);
    // In a real app, you'd send this to your backend
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <Link to="/" className="brand" style={{ display: 'block', textAlign: 'center', marginBottom: '1.5rem' }}>Happenin</Link>
        <h2>Create Your Account</h2>

        <div className="social-login">
          <div id="g_id_onload"
               data-client_id="705184843071-t6cck0onvhjri6ug9250dmmcjq76tsst.apps.googleusercontent.com"
               data-context="signup"
               data-ux_mode="popup"
               data-callback="handleCredentialResponse"
               data-auto_prompt="false">
          </div>

          <div id="googleSignInBtn"></div>
        </div>
        
        <div className="divider"><span>or sign up with email</span></div>
        
        <form onSubmit={handleSubmit} className="form">
          <div className="input-group">
            <i className="fas fa-user input-icon"></i>
            <input 
              type="text" 
              name="name" 
              required 
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          
          <div className="input-group">
            <i className="fas fa-envelope input-icon"></i>
            <input 
              type="email" 
              name="email" 
              required 
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="input-group">
            <i className="fas fa-lock input-icon"></i>
            <input 
              type={showPassword ? 'text' : 'password'} 
              name="password" 
              required 
              minLength="6" 
              placeholder="Password (min 6 characters)"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <i 
              className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'} toggle-password`}
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: 'pointer' }}
            ></i>
          </div>
          
          <div className="input-group">
            <i className="fas fa-lock input-icon"></i>
            <input 
              type={showConfirmPassword ? 'text' : 'password'} 
              name="confirm-password" 
              required 
              minLength="6" 
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
            <i 
              className={`fas ${showConfirmPassword ? 'fa-eye' : 'fa-eye-slash'} toggle-password-confirm`}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{ cursor: 'pointer' }}
            ></i>
          </div>

          <button className="btn login-btn" type="submit">Sign Up</button>

          <p className="signup-link">Already have an account? <Link to="/login">Login</Link> or <Link to="/">Continue as guest</Link></p>
        </form>
      </div>
    </main>
  );
}

