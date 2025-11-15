import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Make handleCredentialResponse available globally for Google callback
    window.handleCredentialResponse = (response) => {
      console.log('Google Sign-In successful:', response);
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
            text: 'signin_with',
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
    // Handle login logic here
    console.log('Login form submitted');
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <Link to="/" className="brand" style={{ display: 'block', textAlign: 'center', marginBottom: '1.5rem' }}>Happenin</Link>
        <h2>Welcome back</h2>

        <div className="social-login">
          <div id="g_id_onload"
               data-client_id="705184843071-t6cck0onvhjri6ug9250dmmcjq76tsst.apps.googleusercontent.com"
               data-context="signin"
               data-ux_mode="popup"
               data-callback="handleCredentialResponse"
               data-auto_prompt="false">
          </div>

          <div id="googleSignInBtn"></div>
        </div>
        
        <div className="divider"><span>or login with email</span></div>
        
        <form onSubmit={handleSubmit} className="form">
          <div className="input-group">
            <i className="fas fa-envelope input-icon"></i>
            <input type="email" name="email" required placeholder="Email address" />
          </div>

          <div className="input-group">
            <i className="fas fa-lock input-icon"></i>
            <input 
              type={showPassword ? 'text' : 'password'} 
              name="password" 
              required 
              minLength="6" 
              placeholder="Password" 
            />
            <i 
              className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'} toggle-password`}
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: 'pointer' }}
            ></i>
          </div>

          <div className="form-row">
            <label className="checkbox">
              <input type="checkbox" /> 
              <span>Remember me</span>
            </label>
            <a href="#" className="text-link">Forgot password?</a>
          </div>

          <button className="btn login-btn" type="submit">Login</button>

          <p className="signup-link">New here? <Link to="/signup">Sign up</Link> or <Link to="/">Continue as guest</Link></p>
        </form>
      </div>
    </main>
  );
}
