import { Container, Row, Col, Form, Button,InputGroup } from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsPersonCircle } from "react-icons/bs";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";


function Register() {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [cpass, setCpass] = useState("");

    const registerUser = async () =>{

        if(name == '') {
            alert('Name is Required !');
            return false;
          }else if(name.length < 4) {
            alert('Name is Required More Than 4 Char');
            return false;
          }

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

          if (cpass == '') {
            alert('Confirm Password is Required !');
              return false;
          }
          if (pass != cpass) {
            alert('Password and Confirm Password must be Match !');
            return false;
          }

          const response = await axios({
            method: "post",
            url: "https://darwindevs.com/ci4.1/register",
            data: {name, email, pass},
            headers: {
              'Content-Type':'application/json',
              'Accept':'application/json'
            }
          });
            if (response.data.status == 200 ) {
              alert(response.data.message);
              navigate('/login');
            }
          
            if (response.data.status == 500 ) {
              alert(response.data.message);
            }
    }
  return (
    <div>
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <h1 className="headinfo">Register Page</h1>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1"><BsPersonCircle size={20} /></InputGroup.Text>
                <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)} />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1"><MdAlternateEmail size={20} /></InputGroup.Text>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1"><RiLockPasswordFill size={20} /></InputGroup.Text>
                <Form.Control type="password" placeholder="Password" value={pass} onChange={(e)=>setPass(e.target.value)} />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1"><RiLockPasswordFill size={20} /></InputGroup.Text>
                <Form.Control type="password" placeholder="Confirm Password" value={cpass} onChange={(e)=>setCpass(e.target.value)} />
              </InputGroup>
              
              <Button variant="primary" type="button" onClick={registerUser}>
                Register Now
              </Button>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;
