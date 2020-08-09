import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, Row, Col, Modal, ModalHeader, 
	ModalBody, Label } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const styles = {
	fontFamily: "'Playfair Display', serif",
	maxWidth: '100%'
}

const required = (val) => val && val.length;

class Collections extends Component{

	constructor(props){
		super(props);
		this.state = {
			isModalOpen: false
		}
	}

	toggleModal = () => {
		this.setState({
			isModalOpen: !(this.state.isModalOpen)
		})
	}

	RenderModal = () => {
		return(
			<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
				<ModalBody>
					<ModalHeader toggle={this.toggleModal}>Add Collection</ModalHeader>
					<LocalForm onSubmit={(values) => this.handleSubmit(values)}>				
						<Row className='form-group'>
							<br />
	                        <Label htmlFor="collectionname" md={12}>Collection Name</Label>
	                        <Col md={12}>
	                            <Control.text model=".collectionname" id="collectionname" name="collectionname"
	                                placeholder="Collection"
	                                className="form-control"
	                                validators={{
	                                    required
	                                }} />
	                            <Errors
	                                className="text-danger"
	                                model=".collectionname"
	                                show="touched"
	                                messages={{
	                                    required: 'Required',
	                                }}
	                             />
	                        </Col>
	                    </Row>
	                    <Row>
					    	<Col className='text-center'>
					    		<br />
					            <Button variant = 'dark' outline type = "submit" value = "submit">
					            	Done
					            </Button>
					        </Col>
					    </Row>
	                </LocalForm>
				</ModalBody>
			</Modal>
		);
	}

	handleSubmit = (values) => {
		this.props.newCollection(this.props.login.authorization, values.collectionname);
		this.toggleModal();
	}

	render(){
		const RenderCollections = () => {
			if(this.props.collections.isLoading)
			{
				return(
					<div>
						<br />
						<Loading />
						<br />
					</div>
				);
			}

			if(this.props.collections.errMess)
			{
				const collections = this.props.collections.list.map((collection) => {
					return(
						<ListGroupItem key = {collection.collection_name} className = 'collection'>{collection.collection_name}</ListGroupItem>
					)
				});
				return(
					<div>
						{collections}
						<br />
						 <div className="text-danger">{this.props.collections.errMess}</div>
						<br />
					</div>
				);
			}

			const collections = this.props.collections.list.map((collection) => {
				return(
					<ListGroupItem key = {collection.collection_name} className = 'collection'>{collection.collection_name}</ListGroupItem>
				)
			});

			return collections;
		}
		return(
			<div>
				<div className = 'text-center'>
					<div className = 'collectionsTop'>
						<br />
						<i className="fa fa-user-circle-o collectionsPhoto" aria-hidden="true"></i>
						<br />
						<br />
						<div style = {{fontFamily: "'Montserrat', sans-serif"}}>Welcome {this.props.login.email}!</div>
						<br />
						<Link to='/home'>
							<Button variant='dark' outline onClick={this.props.logout}>Logout</Button>
						</Link>
						<hr />
					</div>
					<h2 style = {styles} className='text-center'>COLLECTIONS</h2>
					<div className = 'collectionsBottom col-8 offset-2'>
						<ListGroup>
							<br />
							<RenderCollections />
							<br />
						</ListGroup>
						<br />
					</div>
					<Button variant='dark' outline style = {{marginBottom:'1.5vw'}} onClick={this.toggleModal}>Add Collection</Button>
				</div>
				<this.RenderModal />
			</div>
		);
	}
}

export default Collections;