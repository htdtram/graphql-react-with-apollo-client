import React from 'react'

const Login = (props) => {
  return (
    <div>
      <label>Username  </label>
      <input id="username" placeholder="username" onChange={props.onChangeUsername}></input>
      <br/>
      <label>Password  </label>
      <input type="password" id="password" placeholder="password" onChange={props.onChangePassword}></input>
      <br/>
      <button id="btn-login" onClick={props.onClickLogin}>Login</button>
    </div>
  )
}

export default Login
