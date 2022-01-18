import React from 'react';
import logo from './logo.svg';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import { Navbar, Container, Nav } from 'react-bootstrap';
import LoadingOverlay from "./LoadingOverlay/LoadingOverlay";
import Error from "./Error/Error";
import Home from "./Home/Home";
import Asteroids from "./Asteroids/Asteroids";



const API_KEY:string = "YebcvNe2gk1kOzI5NxfnX0hhfwSVg4BV7mY9sFrE";
const APOD_SCRIPT:string = "https://api.nasa.gov/planetary/apod?api_key=" + API_KEY;

function App() {

  // -------------------------------------------------- State Setup --------------------------------------------------
  // Loading Overlay
  const [loading, setLoading] = React.useState<boolean>(true); 

  return (
    <div className="main">
      <LoadingOverlay bgColor="#333333" spinnerColor="#FFFFFF" enabled={loading} />
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
          <Container>
            <Navbar.Brand href="/">
              <img alt="" src={logo} width="50" height="50" className="d-inline-block align-center"/>{' '} EWFD - Nasa
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/asteroids">Asteroids</Nav.Link>
            </Nav>
            </Navbar.Collapse>  
          </Container>
        </Navbar>

      <Switch>

        <Route path="/" render={()=><Home setLoading={setLoading}/>} exact/>
        <Route path="/asteroids" render={() => <Asteroids setLoading={setLoading}/>} exact/>
        <Route render={()=><Error/>}/>

      </Switch>
      <footer>
        <Container>
          <div className="footer">&copy; 2022 - <a href="https://ethanfarrell.ca" target="_blank" className="footer-link">Ethan Farrell's Web Design</a></div>
        </Container>
      </footer>
    </div>
  );
}

export default App;
