import React, { Component } from 'react';
import { Button, Row, Col, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import userimg from '../assets/images/User.png';
import { Loading } from './LoadingComponent';

const required = (val) => val && val.length;
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class Header extends Component{
	constructor(props){
		super(props);
		this.state = {
			isLoginModalOpen: false
		}
	}

	toggleModalLogin = () => {
		this.setState({
			isLoginModalOpen: !(this.state.isLoginModalOpen)
		});
		if(!this.props.login.isLoggedIn){
			this.props.logout();
		}
	}

	handleSubmitLogin = (values) => {
		this.props.attemptLogin(values.email, values.password);
	}

	RenderModal = () => {
	if(this.props.login.isLoading){
		return(
			<div className='text-center'>
				<br />
				<Loading />
			</div>
		);
	}
	if(this.props.login.errMess){
		return(
			<div>
				<br />
				<div className='text-center text-danger'>{this.props.login.errMess}</div>
			</div>
		);
	}
	if(!this.props.login.isLoggedIn){
		return(		
			<LocalForm onSubmit={(values) => this.handleSubmitLogin(values)}>
				<Row className='form-group'>
					<Label htmlFor="email" md={12}>Email</Label>
					<Col md={12}>
						<Control.text model=".email" id="email" name="email"
			                placeholder="Email"
			                className="form-control"
			                validators={{
			                    required, validEmail
			                }} />  
			            <Errors
			                className="text-danger"
			                model=".email"
			                show="touched"
			                messages={{
			                    require: 'Required',
			                    validEmail: 'Invalid Email Address'
			                }} />
					</Col>
				</Row>
				<Row className='form-group'>
			        <Label htmlFor="password" md={12}>Password</Label>
			        <Col md={12}>
			            <Control.password model=".password" id="password" name="password"
			                placeholder="Password"
			                className="form-control"
			                validators={{
			                    required, minLength: minLength(3), maxLength: maxLength(15)
			                }} />
			         	<Errors
			                className="text-danger"
			                model=".password"
			                show="touched"
			                messages={{ 
			                	require: 'Required',                               
			                    minLength: 'Must be atleast 3 characters',
			                    maxLength: 'Must be less than 16 characters'
			                }}
			             />
			        </Col>
			    </Row>
			    <Row>
			    	<Col className='col-12'>
			            <Button type = "submit" value = "submit" className = "modalLogin">
			            	Login
			            </Button>
			        </Col>
			    </Row>
			</LocalForm>
				
		);
	}
	return(null);
	
	}

	render(){

		let modal = null;
		if(this.props.login.isLoggedIn){
			modal=null;
		}
		else{
			modal =
				<Modal isOpen={this.state.isLoginModalOpen} toggle={this.toggleModalLogin}>
					<ModalBody>
						<ModalHeader toggle={this.toggleModalLogin}>Login</ModalHeader>
						<this.RenderModal />
					</ModalBody>
				</Modal>
		}

		const RenderHeader = () => {
			if(this.props.login.isLoggedIn){
				return(
					<Col>
						<Link to='/home'><img src={userimg}
		            	className='profileImg' alt="User"/></Link>
					</Col>
				);
			}
			else{
				return(
					<Col>
						<Button className="buttonWhite Login float-right" variant='dark' onClick={this.toggleModalLogin}>Log in</Button>			
						<Button className="buttonBlack SignUp float-right" variant='dark'>Sign Up</Button>
					</Col>
				);
			}
		}
		return(
			<div>
				<Row className='header'>
					<Col className='logo'>
						LOGO
					</Col>
					<RenderHeader />
				</Row>
				{modal}
			</div>
		);
	}
}

export default Header;