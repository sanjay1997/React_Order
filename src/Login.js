import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";
import ava from './ava.png';
import { useNavigate } from "react-router-dom";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";


function Login({set}) {

  const [email, setEmail]  =  useState('');
  const [pass, setPass]    =  useState('');
  const [button,setButton] =  useState('Login Now');
  const navigate           = useNavigate();

  const checklogin = async () =>{

    if (email == '') {
      alert('Email is Required !');
      return false;
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
      alert('Invalid email address');
      return false;
    }

    if (pass == '') {
      alert('Password is Required !');
      return false;
    }else if(pass.length > 8){
      alert('Password Length Not More Than 8 Char !');
      return false;
    }

    setButton('Please Wait...');

    const res = await axios({
        method: "post",
        url: "https://darwindevs.com/ci4.1/login",
        data: {email, pass},

        headers: {
          'Content-Type':'application/json',
          'Accept':'application/json'
        }
    });
    if (res.data.status === 200 ) {
      alert(res.data.messages);
      localStorage.setItem('UserID',res.data.data.user_id);
      localStorage.setItem('Name',res.data.data.user_name);
      localStorage.setItem('Email',res.data.data.user_email);
      localStorage.setItem('logged_in',res.data.data.logged_in);
      set(true)
      navigate('/home')
    }

    if (res.data.status === 500 ) {
      alert(res.data.messages);
      setButton('Login Now');
    }

    if (res.data.status === 404 ) {
      alert(res.data.messages);
      setButton('Login Now');
    }
  }


  return (
    <div>
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <h1 className="headinfo"></h1>   
              <img src={ava} width="100" height="100" className="avatar" />
              <p className="text-center"><b>Sign in to start your session</b></p>

              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1"><MdAlternateEmail size={20} /></InputGroup.Text>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1"><RiLockPasswordFill size={20} /></InputGroup.Text>
                <Form.Control type="password" placeholder="Password" value={pass} onChange={(e)=>setPass(e.target.value)} />
              </InputGroup>

              <Button variant="primary" type="button" onClick={checklogin}>
                {button}
              </Button>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
