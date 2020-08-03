import React, { Component } from 'react';
import { Button, Row, Col, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';

const required = (val) => val && val.length;
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class Header extends Component{
	constructor(props){
		super(props);
		this.state = {
			isLoginModalOpen: false,
			isSignupModalOpen: false
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

	toggleModalSignup = () => {
		this.setState({
			isSignupModalOpen: !(this.state.isSignupModalOpen)
		});
		if(!this.props.login.isLoggedIn){
			this.props.logout();
		}
	}

	handleSubmitLogin = (values) => {
		this.props.attemptLogin(values.email, values.password);
	}

	handleSubmitSignup = (values) => {
		this.props.attemptSignup(values.email, values.password, values.firstname, values.lastname);
	}

	RenderLoginModal = () => {
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

	RenderSignupModal = () => {
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
				<LocalForm onSubmit={(values) => this.handleSubmitSignup(values)}>				
					<Row className='form-group'>
                        <Label htmlFor="firstname" md={12}>First Name</Label>
                        <Col md={12}>
                            <Control.text model=".firstname" id="firstname" name="firstname"
                                placeholder="First Name"
                                className="form-control"
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }} />
                            <Errors
                                className="text-danger"
                                model=".firstname"
                                show="touched"
                                messages={{
                                    required: 'Required',
                                    minLength: 'Must be atleast 3 characters',
                                    maxLength: 'Must be less than 16 characters'
                                }}
                             />
                        </Col>
                    </Row>
                    <Row className='form-group'>
                        <Label htmlFor="lastname" md={12}>Last Name</Label>
                        <Col md={12}>
                            <Control.text model=".lastname" id="lastname" name="lastname"
                                placeholder="Last Name"
                                className="form-control"
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }} />
                            <Errors
                                className="text-danger"
                                model=".lastname"
                                show="touched"
                                messages={{
                                    required: 'Required',
                                    minLength: 'Must be atleast 3 characters',
                                    maxLength: 'Must be less than 16 characters'
                                }}
                             />
                        </Col>
                    </Row>
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
				            	Sign Up 
				            </Button>
				        </Col>
				    </Row>
				</LocalForm>
					
			);
		}
		return(null);
	}

	render(){

		let modalLogin = null;
		if(this.props.login.isLoggedIn){
			modalLogin = null;
		}
		else{
			modalLogin =
				<Modal isOpen={this.state.isLoginModalOpen} toggle={this.toggleModalLogin}>
					<ModalBody>
						<ModalHeader toggle={this.toggleModalLogin}>Login</ModalHeader>
						<this.RenderLoginModal />
					</ModalBody>
				</Modal>
		}

		let modalSignup = null;
		if(this.props.login.isLoggedIn){
			modalSignup = null;
		}
		else{
			modalSignup =
				<Modal isOpen={this.state.isSignupModalOpen} toggle={this.toggleModalSignup}>
					<ModalBody>
						<ModalHeader toggle={this.toggleModalSignup}>Sign Up</ModalHeader>
						<this.RenderSignupModal />
					</ModalBody>
				</Modal>
		}

		const RenderHeader = () => {
			if(this.props.login.isLoggedIn){
				return(
					<Col>
						<Link to='/collections' onClick={()=>this.props.listCollections(this.props.login.authorization)}><i className="fa fa-user-circle-o fa-2x profileImg" aria-hidden="true"></i></Link>
					</Col>
				);
			}
			else{
				return(
					<Col>
						<Button className="buttonWhite Login float-right" variant='dark' onClick={this.toggleModalLogin}>Log in</Button>			
						<Button className="buttonBlack SignUp float-right" variant='dark' onClick={this.toggleModalSignup}>Sign Up</Button>
					</Col>
				);
			}
		}
		return(
			<div className='aboveHeader'>
				<Row className='header'>
					<Link to='/home' style={{textDecoration: 'none'}}>
						<Col className='logo'>
							LOGO
						</Col>
					</Link>
					<RenderHeader />
				</Row>
				{modalLogin}
				{modalSignup}
			</div>
		);
	}
}

export default Header;