import React, { useState } from "react";
import axios from "axios";
import { baseUrl, url } from "./Constants";
import { useNavigate } from "react-router-dom";
import './Login.css'

const Login = () => {
  
    let navigate = useNavigate();

    const [datum, setData] = useState({
      username: '',
      password: '',
      check_textInputChange: false,
      secureTextEntry: true,
      isValidUser: true,
      isValidPassword: true,
      isShort:false
    });
    
    const textInputChange = (e) => {
      if( e.target.value.length >= 4 ) {
          setData({
              ...datum,
              username: e.target.value,
              check_textInputChange: true,
              isValidUser: true
          });
      } else {
          setData({
              ...datum,
              username: e.target.value,
              check_textInputChange: false,
              isValidUser: false
          });
      }
  }

  const handlePasswordChange = (e) => {
        setData({
            ...datum,
            password: e.target.value,
            isValidPassword: false
        });
    }

    const submitForm = async (e) => {  
      e.preventDefault();
      if(datum.username.length <4 || datum.password.length < 4){
        setData({
          ...datum,
          isShort:true
        })
      }else {
        var datas = {
          "username" : datum.username,
          "password" : datum.password
        }
        axios
        .post(`${url}/core/other/login/`, datas)
        .then((response) => {
            if (response.status == 200) {
              navigate(`/landing`);
            }
        })
        .catch((error) => {
          alert(error.response.data["Error"])
          });
      }
        
    }
 
    return (
      <form onSubmit={submitForm}>
      <h3>Sign In</h3>
      {datum.isShort ? <div>
          <h6 style={{color: 'orange'}}>wrong!</h6>
          </div>
          :
          null
      }
      <div className="mb-3">
        <label>Username</label>
        <input
          type="text"
          className="form-control username"
          placeholder="Your Username"
          onChange={(e) => textInputChange(e)}
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control password username"
          placeholder="Enter password"
          onChange={(e) => handlePasswordChange(e)}
        />
      </div>
      <div className="mb-3">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary username">
          Submit
        </button>
      </div>
      <p className="forgot-password text-left">
        Forgot <a href="#">password?</a>
      </p>
    </form>
    )
}
export default Login;