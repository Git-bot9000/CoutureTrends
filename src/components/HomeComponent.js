import React,{Component} from 'react';
import {Image} from 'react-bootstrap';
import bgimg from '../assets/images/Jumbotron.jpg';
import mediaImg1 from '../assets/images/img1.jpg';
import mediaImg2 from '../assets/images/img2.jpg';
import mediaImg3 from '../assets/images/img3.jpg';
import cardImg1 from '../assets/images/card1.jpg';
import cardImg2 from '../assets/images/card2.jpg';
import cardImg3 from '../assets/images/card3.jpg';
import {Row, Col, ButtonGroup, Button, Media, Card, CardImg, 
	CardText, CardBody, CardTitle} from 'reactstrap';
import SearchBar from './SearchBar';

class Home extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			activeTab: 1,
		};
	}

	toggleTab = (tab) => {
		this.setState({
			activeTab: tab 
		})
	}

	componentDidMount = () => {
		document.getElementById(this.state.activeTab).focus();
	}

	RenderSearchTab = () => {
		if(this.state.activeTab === 1){
			return(
				<SearchBar createSearch={this.props.createSearch}
				search={this.props.search}
				clearSearchError={this.props.clearSearchError} />
			);
		}
		else{
			return(<div>Hello from 2</div>);
		}
	}

	render(){
		
		return(
			<div>
				<div className="jumbotronContainer">
			    	<Image className = "jumbotronImage" src={bgimg} fluid />
			    	<h2>This is what we do in one Line</h2>
			    	<Button className="buttonBlack buttonBlackOfJumbotron" variant='dark'>Learn More</Button>
			    	<Row>
		    			<Col className='searchTab col-8 offset-2'>
		    				<ButtonGroup className='searchTabButtonGroup'>
		    					<Button className='searchTabNav' onClick = {()=>this.toggleTab(1)} id='1'>Search for Trends</Button>
		    					<Button className='searchTabNav' onClick = {()=>this.toggleTab(2)} id='2'>Add Websites</Button>
		    				</ButtonGroup>
		    			</Col>
		    		</Row>
			    </div>
			    <div className="col-8 offset-2 searchTabBottom">
			    	<this.RenderSearchTab />
			    </div>
			    <div className='d-none d-sm-block'>
				    <Media className='Media1'>
				    	<Media left className='col-sm-6 media Img1-container'>
				    		<Media object src ={mediaImg1} className = 'Img1 img-fluid' alt = 'How we generate results' />
				    	</Media>
				    	<Media body className='col-sm-6 Body1'>
				    		<Media heading>How we generate results</Media>
				    		Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur 
				    		magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem.
				    	</Media>
				    </Media>
				    <Media className='Media2'>
				    	<Media body className='col-sm-6 Body2'>
				    		<Media heading>What is add Websites</Media>
				    		Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur 
				    		magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem.
				    	</Media>
				    	<Media right className='col-sm-6 offset-6 media Img2-container'>
				    		<Media object src ={mediaImg2} className = 'Img2 img-fluid' alt = 'How we generate results' />
				    	</Media>
				    </Media>
				    <Media className='Media3'>
				    	<Media left className='col-sm-6 media Img3-container'>
				    		<Media object src ={mediaImg3} className = 'Img3 img-fluid' alt = 'How we generate results' />
				    	</Media>
				    	<Media body className='col-sm-6 Body3'>
				    		<Media heading>Discover similar fashion in multiple dimensions</Media>
				    		Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur 
				    		magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem.
				    	</Media>
				    </Media>
	    		</div>
	    		<div className="cardSet">
	    			<h2 className='cardSetHeading text-center'>What we Provide</h2>
		    		<div className='cardContainer col-12 col-sm-4'>
			    		<Card>
					        <CardImg top width="100%" src={cardImg1} alt="Card-1 image" className='cardImg' />
					        <CardBody className='cardBody'>
					         	<CardTitle>Personal Dashboard</CardTitle>
					        	<CardText>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
					        	 eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem.</CardText>
					        </CardBody>
					    </Card>
				    </div> 
				    <div className='cardContainer col-12 col-sm-4'>
			    		<Card>
					        <CardImg top width="100%" src={cardImg2} alt="Card-1 image" className='cardImg' />
					        <CardBody className='cardBody'>
					         	<CardTitle>Search Results</CardTitle>
					        	<CardText>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
					        	 eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem.</CardText>
					        </CardBody>
					    </Card>
				    </div> 
				    <div className='cardContainer col-12 col-sm-4'>
			    		<Card>
					        <CardImg top width="100%" src={cardImg3} alt="Card-1 image" className='cardImg' />
					        <CardBody className='cardBody'>
					         	<CardTitle>Similar Products page</CardTitle>
					        	<CardText>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
					        	 eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem.</CardText>
					        </CardBody>
					    </Card>
				    </div> 
	    		</div>
	    	</div>
		);
	}
}

export default Home;