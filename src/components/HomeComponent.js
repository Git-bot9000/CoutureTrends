import React,{Component} from 'react';
import {Image} from 'react-bootstrap'
import bgimg from '../assets/images/Jumbotron.jpg';
import {Row, Col, ButtonGroup, Button} from 'reactstrap';

class Home extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			activeTab: 1
		};
	}

	toggleTab = (tab) => {
		this.setState({
			activeTab: tab 
		})
	} 
	render(){

		const RenderSearchTab = ()=> {
			if(this.state.activeTab === 1){
				return(<div>Hello from 1</div>);
			}
			else{
				return(<div>Hello from 2</div>);
			}
		}
		
		return(
			<div>
				<div className="jumbotronContainer">
			    	<Image className = "jumbotronImage img-fluid" src={bgimg} fluid />
			    	<h2>This is what we do in one Line</h2>
			    	<Button className="buttonBlack buttonBlackOfJumbotron" variant='dark'>Learn More</Button>
			    	<Row>
		    			<Col className='searchTab col-8 offset-2'>
		    				<ButtonGroup className='searchTabButtonGroup'>
		    					<Button className='searchTabNav' onClick = {()=>this.toggleTab(1)}>Search for Trends</Button>
		    					<Button className='searchTabNav' onClick = {()=>this.toggleTab(2)}>Add Websites</Button>
		    				</ButtonGroup>
		    			</Col>
		    		</Row>
			    </div>
			    <div className="col-8 offset-2 searchTabBottom">
			    	<RenderSearchTab />
			    </div>
	    	</div>
		);
	}
}

export default Home;