import React, { useState } from "react";
import axios from "axios";
import { baseUrl, url } from "./Constants";
import { useNavigate } from "react-router-dom";
import styles from './Login.module.css'
import { slideInLeft } from 'react-animations';
import styled, { keyframes } from 'styled-components'

const SlideInLeft = styled.div`animation: 2s ${keyframes `${slideInLeft}`} `;

const Login = ({isLoggedIn, setIsLoggedIn}) => {
  
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

  const handlePasswordChange = (pass) => {
        setData({
            ...datum,
            password: pass,
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
              setIsLoggedIn(true)
            }
        })
        .catch((error) => {
          alert(error.response.data["Error"])
          });
      }
        
    }

    const FormHeader = props => (
      <h2 id={styles.headerTitle}>{props.title}</h2>
    );
    
    
    const Form = props => (
     <div className={styles.body}>
       {/* <FormInput description="Username" placeholder="Enter your username" type="text" />
       <FormInput description="Password" placeholder="Enter your password" type="password"/> */}
       {/* <FormButton title="Log in"/> */}
       <div>
        <input type="password" onChange={(e)=> textInputChange(e)} />
       </div>
        <div className={styles.row}>
          <label>Password</label>
          <input type="password" placeholder="Enter your password" onChange={(e)=> handlePasswordChange(e.target.value)}/>
        </div>
        
        <div id={styles.button} className={styles.row}>
          <button onClick={submitForm}>Log in</button>
        </div>
     </div>
    );
    
    const FormButton = props => (
    <div id={styles.button} className={styles.row}>
      <button>{props.title}</button>
    </div>
    );
    
    const FormInput = props => (
    <div className={styles.row}>
      <label>{props.description}</label>
      <input type={props.type} placeholder={props.placeholder}/>
    </div>  
    );
    
    const OtherMethods = props => (
      <div id={styles.alternativeLogin}>
        {/* <label>Or sign in with:</label> */}
        <div id={styles.iconGroup}>
          {/* <Facebook />
          <Twitter />
          <Google /> */}
        </div>
      </div>
    );
 
    return (
      <main>
        <div className={styles.bigwrapper}>
  <div id={styles.loginform}>
    <FormHeader title="Login" />
    {datum.isShort ? <div>
          <SlideInLeft><h6 style={{color: 'orange', marginLeft: '2%'}}><ul><li>Username should be greater than 3</li><li>Password should be greater than 8</li></ul></h6></SlideInLeft>
          </div>
          :
          null
      }
    <Form />
    <OtherMethods />
  </div>
  </div>
  </main>
    )
}
export default Login;