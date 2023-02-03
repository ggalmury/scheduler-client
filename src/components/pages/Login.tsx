const Login = () => {
  const resetPassword = (): any => {
    alert("reset password!");
  };

  return (
    <div id="auth-wrapper">
      <div id="auth-box">
        <div id="auth-header">HELLO!</div>
        <div id="auth-content">
          <div id="login-form">
            <input id="email" type="email" placeholder="email"></input>
            <input id="credential" type="password" placeholder="password"></input>
          </div>
          <div id="login-option">
            <div id="user-save">
              <input id="user-save-check" type="checkbox"></input>
              <label id="user-save-label" htmlFor="user-save-check">
                Remember Me!
              </label>
            </div>
            <div id="find-pw" onClick={resetPassword}>
              Forgot password?
            </div>
          </div>
          <div id="signin-box">
            <button id="btn-signin">LOG IN</button>
          </div>
        </div>
        <div id="auth-footer">
          <div>Don't have an account?</div>
          <div id="signup">Sign Uo</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
