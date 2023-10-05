import React, { useState,useContext } from 'react';
import {FirebaseContext} from '../../store/Context'
import Logo from '../../olx-logo.png';
import './Login.css';
import {useHistory} from 'react-router-dom'
import { Form,FormGroup, FormControl, FormLabel } from 'react-bootstrap';

function Login() {

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const{firebase} =useContext(FirebaseContext)
  const history=useHistory()
  const handleLogin=(e)=>{
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
      history.push('/')
    }).catch((error)=>{
      alert(error.message)
    })

  }
  return (
    <div>
      <div className="loginParentDiv" style={{width:'380px'}}>
        <img width="150px" height="150px" style={{ marginLeft: "85px" }} src={Logo}></img>
        <Form onSubmit={handleLogin}>
        <FormGroup className="mb-3" htmlFor="fname" >
        <FormLabel>Email</FormLabel>
        <FormControl type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email" placeholder="Enter email" />
        </FormGroup>
        <FormGroup className="mb-3" htmlFor="fname" >
        <FormLabel>Password</FormLabel>
        <FormControl type="text" value={password} onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password" placeholder="Enter password" />
        </FormGroup>
            <br />
          
          <button className='button'>Login</button>
        </Form>
        <br />
        <button className='button' onClick={() => history.push('/signup')}>Signup</button>
      </div>
    </div>
  );
}

export default Login;
