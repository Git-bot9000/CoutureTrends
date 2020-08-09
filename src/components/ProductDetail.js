import React, { Component } from 'react';
import {Image} from 'react-bootstrap';
import {Row, Button} from 'reactstrap';
import { withRouter } from "react-router-dom";

class Product extends Component{
	RenderTags = () => {
		let tags = this.props.product.tags_list.map((tag) => {
			return(
				<span style={{marginLeft: '2vw', marginRight: '2vw', whiteSpace: 'nowrap'}}><i class="fa fa-tag" aria-hidden="true" style={{display: 'inline-block'}}></i><span style={{display: 'inline-block'}}> {tag}</span></span>
			);
		})

		return tags;
	}

	handleClick = () => {
		for(let i=1; i<= this.props.search.numberOfPages; i++){
			this.props.getAllProducts(this.props.searchId, i)
		}
		this.props.getGraphdata(this.props.searchId, this.props.pId, this.props.history);
	}

	render(){
		return(
			<div>
				<br />
				<div className="col-10 offset-1 container" style = {{backgroundColor: 'white', height: 'auto', padding: '1vw'}}>
					<Row>
						<Image src = {this.props.product.img_url} className = 'col-6' style = {{width: '100%', height: 'auto'}} />
						<div className = 'col-6' style = {{width:'100%', height: 'auto'}}>
							<div className = 'text-center'>
								<div style={{fontFamily: "'Abril Fatface', cursive", marginTop:'2%', fontSize:'1.6vw'}}>{this.props.product.product_name}</div>
								<div style={{marginTop: '48%'}}>
									<a target = '_blank' rel="noopener noreferrer" href = {`https://${this.props.product.product_url}`} style={{marginBottom: '0', overflow: 'hidden'}}>
										<Button className = 'buttonBlack' style = {{height: '3.5vw', width: '10vw'}}>
											Go to Source
										</Button>
									</a>
									<Button variant = 'dark' outline style = {{marginBottom: '0', height: '3.5vw', width: '10vw', borderRadius: '0.5vw', marginLeft: '0.5vw'
											, fontFamily: "'Montserrat', sans-serif", fontSize: '1vw', border: '0.078125vw solid black'
											, paddingLeft: '1vw', paddingRight: '1vw', paddingTop: '0.5vw', paddingBottom: '0.5vw'}}>
										Add Product
									</Button>
									<Button variant = 'dark' outline onClick = {this.handleClick}
									style = {{marginTop: '0.5vw', height: '3.5vw', width: '20.5vw', borderRadius: '0.5vw', fontFamily: "'Montserrat', sans-serif", 
									fontSize: '1vw', border: '0.078125vw solid black', paddingLeft: '1vw', paddingRight: '1vw', paddingTop: '0.5vw', paddingBottom: '0.5vw'}}>
										Discover Similar Products
									</Button>
								</div>
							</div>
						</div>
					</Row>
					<Row style={{ margin: '3vw'}}>
						<div style={{fontFamily: "'Montserrat', sans-serif", fontSize: '1.7vw', width: '100%'}}>
							<div className='text-left' style={{fontWeight: 'bold'}}>
								<div>PRODUCT DETAILS</div>
							</div>
							<div style={{fontSize: '1.25vw'}}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.							
							</div>
						</div>
					</Row>
					<Row style={{width: '100%'}}>
						<div className='col-10 offset-1 container text-center' style={{fontFamily: "'Montserrat', sans-serif"}}>
							<div style={{fontFamily: "'Montserrat', sans-serif", fontSize: '1.5vw', fontWeight: 'bold'}}>TAGS</div>
							<div style={{fontSize: '1.25vw'}}>
								<this.RenderTags />
							</div>
						</div>
					</Row>
					<br />
				</div>
				<br />
			</div>
		);
	}
} 

export default withRouter(Product);