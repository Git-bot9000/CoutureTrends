import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody,} from 'reactstrap';
import { Loading } from './LoadingComponent';
import { withRouter } from "react-router-dom";

const checkFormStyle = {
	width: '30%',
	height: 'auto',
	margin: '0',
	paddingRight: '2%',
	fontSize: '1.7vw',
	float: 'left'
}

const checkStyle = {
	height: '1.7vw',
	width: 'auto',
	marginTop: '0.45vw',
	marginLeft: '-1rem',
	cursor: 'pointer',
	fontFamily: "'Montserrat', sans-serif"
}

const searchStyle = {
	width: '100%',
	paddingTop: '5vw',
	marginBottom: '1.2vw'
}

const searchInputStyle = {
	width: '100%',
	height: '2.2vw',
	fontSize: '1.8vw',
	padding: '1.5vw',
	fontFamily: "'Montserrat', sans-serif",
	Color: 'black',
	border: '0.078125vw solid black',
	borderRadius: '0.15rem'
}

const searchButtonStyle = {
	height: '3vw',
	fontSize: '2vw',
	padding: '0',
	width: '10vw',
	borderRadius: '0.15rem',
	border: '0.078125vw solid black'
}

class SearchBar extends Component{
	constructor(props){
		super(props);
		this.state = {
			check: null,
			search: null,
			isModalOpen: true
		};
	}

	toggleModal = () => {
		this.setState({
			isModalOpen: !(this.state.isModalOpen)
		});
		this.props.clearSearchError();
	}

	handleInputChange = (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
          [name]: value
        });
	}

	handleInputChange1 = (event) => {
		const target = event.target;
		const value = 'ecommerce';
		const name = target.name;

		this.setState({
          [name]: value
        });
	}

	handleInputChange2 = (event) => {
		const target = event.target;
		const value = 'magazine';
		const name = target.name;

		this.setState({
          [name]: value
        });
	}

	handleInputChange3 = (event) => {
		const target = event.target;
		const value = 'social';
		const name = target.name;

		this.setState({
          [name]: value
        });
	}

	handleSearch = (event) => {
		event.preventDefault();
		this.props.createSearch(this.state.search, this.state.check, this.props.history);
	} 

	RenderSearchBar = () => {
		if(this.props.search.isLoading){
			return(
				<div className='text-center'>
					<br />
					<Loading />
				</div>
			);
		}
		if(this.props.search.errMess){
			return(
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalBody>
						<ModalHeader toggle={this.toggleModal}>Error</ModalHeader>
						<div>
							<br />
							<div className='text-center text-danger'>{this.props.search.errMess}</div>
						</div>
					</ModalBody>
				</Modal>
			);
		}
		return(
			<Form onSubmit={this.handleSearch}>
				<FormGroup tag="fieldset" style={{paddingTop:'2vw', marginBottom: '0'}}>
			        <FormGroup check>
						<Label check style={checkFormStyle} className='text-center'>
							<Input type="radio" name="check" style={checkStyle} value={this.state.check}
							onChange={this.handleInputChange1} />{' '}
							E-Commerce
						</Label>
						<Label check style={checkFormStyle} className='text-center'>
							<Input type="radio" name="check" style={checkStyle} value={this.state.check}
							onChange={this.handleInputChange2} />
							Magazines
						</Label>
						<Label check style={checkFormStyle} className='text-center'>
							<Input type="radio" name="check" style={checkStyle} value={this.state.check}
							onChange={this.handleInputChange3} />{' '}
							Social Media
						</Label>
					</FormGroup>
			        <FormGroup style={searchStyle}>
						<Input type="text" name="search" placeholder="Search" style={searchInputStyle} 
						value={this.state.search} onChange={this.handleInputChange} />
					</FormGroup>
					<FormGroup className='text-center' style={{marginBottom: '1vw'}}> 
			    		<Button variant='dark' outline style={searchButtonStyle} type="submit">
			    			Search
			    		</Button>
			    	</FormGroup> 	
			    </FormGroup>
			</Form>
		);
	}

	render(){
		return(
			<this.RenderSearchBar />
		);
	}
}

export default withRouter(SearchBar);