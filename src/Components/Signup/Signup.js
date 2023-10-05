import React, { useState,useContext } from 'react';
import {useHistory} from 'react-router-dom';
import { Form,FormGroup, FormControl, FormLabel } from 'react-bootstrap';

import Logo from '../../olx-logo.png';
import {FirebaseContext} from '../../store/Context'
import './Signup.css';

export default function Signup() {

  const history=useHistory()
  const [username,setUsername]=useState('')
  const [email,setEmail]=useState('')
  const [phone,setPhone]=useState('')
  const [password,setPassword]=useState('')

  const {firebase} =useContext(FirebaseContext)

  const Handlesubmit=(e)=>{
    e.preventDefault()//for prevent reload
    firebase.auth().createUserWithEmailAndPassword(email,password).then((result)=>{
      result.user.updateProfile({displayName:username}).then(()=>{
        firebase.firestore().collection('users').add({
          id:result.user.uid, 
          username:username,
          email:email,
          phone:phone
        }).then(()=>{
          history.push("/login")
        })
      })
    })

  }

  return (
    <div>
      <div className="signupParentDiv" style={{width:'380px'}}>
        <img width="180px" height="150px" style={{ marginLeft: "80px" }} src={Logo}></img>
        <Form onSubmit={Handlesubmit} >
          
        <FormGroup className="mb-3" htmlFor="fname" >
        <FormLabel>Username</FormLabel>
        <FormControl type="text" value={username} onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name" placeholder="Enter Username" />
        </FormGroup>

        <FormGroup className="mb-3" htmlFor="fname" >
        <FormLabel>Email</FormLabel>
        <FormControl type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email" placeholder="Enter email" />
        </FormGroup>

        <FormGroup className="mb-3" htmlFor="fname" >
        <FormLabel>Phone</FormLabel>
        <FormControl type="number" value={phone} onChange={(e)=>setPhone(e.target.value)}
            id="lname"
            name="phone" placeholder="Enter Phonenumber" />
        </FormGroup>

        <FormGroup className="mb-3" htmlFor="fname" >
        <FormLabel>Password</FormLabel>
        <FormControl type="text" value={password} onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password" placeholder="Enter password" />
        </FormGroup>
            <br />
          <button className='button'>Signup</button>
        </Form>
        
       
        <button className='button' style={{marginTop:'10px'}} onClick={() => history.push('/login')}>login</button>

      </div>
    </div>
  );
}
