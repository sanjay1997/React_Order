import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";

function Header({set}) {

  const history = useNavigate();

  function logOut(){
    localStorage.removeItem('logged_in');
    alert('You Have Successfully Sign Out !');
    set(false)
    history('/login') 
  }

  function logAdmin(){
    history('/admin')
  }

  function logHome(){
    history('/home')
  }

  function logSponsor(){
    history('/sponsor')
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
        
          <Navbar.Brand>{/* Header */}</Navbar.Brand>
          <Nav className="me-auto nav_bar_wrapper">

            {
              localStorage.getItem('logged_in') 
              ?
              <>
              <Container>
                  {
                    localStorage.getItem('Email') == 'shrikunj.vyas@darwinpgc.com' 
                    ?
                    <>
                    <Button onClick={logAdmin} variant="light" size="sm"> Admin</Button>{' '}{' '}
                    <Button onClick={logHome} variant="light" size="sm"> Home</Button>{' '}{' '}
                    <Button onClick={logSponsor} variant="light" size="sm"> Sponsor ?</Button>{' '}{' '}
                    <Button variant="light" size="sm"> <BsPersonCircle size={20} />   {localStorage.getItem('Email')}</Button>{'   '}{'    '}
                    <Button onClick={logOut} variant="light" size="sm"> <FiLogOut size={20} />   Sign Out</Button>
                    </>
                    :
                    <>
                    <Button onClick={logHome} variant="light" size="sm"> Home</Button>{' '}{' '}
                    <Button onClick={logSponsor} variant="light" size="sm"> Sponsor ?</Button>{' '}{' '}
                    <Button variant="light" size="sm"> <BsPersonCircle size={20} />   {localStorage.getItem('Email')}</Button>{'   '}{'    '}
                    <Button onClick={logOut} variant="light" size="sm"> <FiLogOut size={20} />   Sign Out</Button>
                    </>
                  }
              </Container>
              </>
              :
              <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
              </>
            }
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
