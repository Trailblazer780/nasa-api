import React from 'react';
import logo from './logo.svg';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.scss';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import LoadingOverlay from "./LoadingOverlay/LoadingOverlay";
import Error from "./Error/Error";
import Home from "./Home/Home";
import Asteroids from "./Asteroids/Asteroids";
import AsteroidData from "./AsteroidData/AsteroidData";
import MarsRoverPhotos from './MarsRoverPhotos/MarsRoverPhotos';
import EPIC from './EPIC/EPIC';
import SearchAsteroid from './SearchAsteroid/SearchAsteroid';



const API_KEY:string = "YebcvNe2gk1kOzI5NxfnX0hhfwSVg4BV7mY9sFrE";
const APOD_SCRIPT:string = "https://api.nasa.gov/planetary/apod?api_key=" + API_KEY;

function App() {

  let history = useHistory();

  // -------------------------------------------------- State Setup --------------------------------------------------
  // Loading Overlay
  const [loading, setLoading] = React.useState<boolean>(true); 

  return (
    <div className="main">
      <LoadingOverlay bgColor="#333333" spinnerColor="#FFFFFF" enabled={loading} />
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
          <Container>
            <Navbar.Brand href="/">
              <img alt="" src={logo} width="50" height="50" className="d-inline-block align-center"/>{' '} EFWD - NASA
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav variant="tabs" className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/asteroids">Near Earth Asteroids</Nav.Link>
              <Nav.Link href="/asteroid-search">Search Asteroids</Nav.Link>
              <Nav.Link href="/epic">EPIC</Nav.Link>
              <Nav.Link href="/mars-rover-home">Mars Rover</Nav.Link>
            </Nav>
            </Navbar.Collapse>  
          </Container>
        </Navbar>
        <Container className="text-center">
          {/* <Button onClick={() => history.goBack()}>back</Button> */}
        </Container>
      <Switch>

        <Route path="/" render={()=><Home setLoading={setLoading}/>} exact/>
        <Route path="/asteroids" render={() => <Asteroids setLoading={setLoading}/>} exact/>
        <Route path="/asteroid/:id" render={() => <AsteroidData setLoading={setLoading}/>} exact/>
        <Route path="/mars-rover-home" render={() => <MarsRoverPhotos setLoading={setLoading}/>}/>
        <Route path="/epic" render={() => <EPIC setLoading={setLoading}/>}/>
        <Route path="/asteroid-search" render={() => <SearchAsteroid setLoading={setLoading}/>}/>
        <Route render={()=><Error/>}/>

      </Switch>
      <footer>
        <Container>
          <div className="footer">&copy; 2022 - <a href="https://ethanfarrell.ca" target="_blank" className="footer-link">Ethan Farrell's Web Design</a> - Powered by: <a href="https://api.nasa.gov/" target="_blank" className="footer-link">NASA Open API</a></div>
        </Container>
      </footer>
    </div>
  );
}

export default App;
