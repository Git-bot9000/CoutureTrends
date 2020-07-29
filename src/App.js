import React from 'react';
import './App.css';
import {Jumbotron} from 'reactstrap';
import {Image, Button} from 'react-bootstrap'
import bgimg from './assets/images/Jumbotron1.jpg';

function App() {
  return (
    <div className="App">
      <div className="jumbotronContainer">
        <Image className = "jumbotronImage" src={bgimg} fluid className="img-fluid" />
        <h2>This is what we do in one Line</h2><Button className="buttonBlack" variant='dark'>Learn More</Button>
      </div>
    </div>
  );
}

export default App;
