import React from 'react'


//ei käytössä

const LoginForm = ({
   handleSubmit,
   handleUsernameChange,
   handlePasswordChange,
   username,
   password
  }) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogging}>
    <div>
      username <input type="text" value={username} name="Username"
        onChange={({ target }) => setUsername(target.value)} />
    </div>
    <div>
      password <input type="password" value={password} name="Password"
      onChange={({target}) => setPassword(target.value)} />
    </div>
    <button type="submit">login</button>
    </form>
    
    
    </div>
  )
}

export default LoginForm