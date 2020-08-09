import React, { Component } from 'react';
import Graph3D from 'react-graph3d-vis'
import { withRouter } from "react-router-dom";
import { Row, Button } from 'reactstrap';
import {Image} from 'react-bootstrap';

class Similar extends Component{

	constructor(props){
		super(props);
		this.options = {
		    width:  '100%',
		    height: '500px',
		    style: 'dot',
		    showGrid: false,
		    showXAxis: false,
		    showYAxis: false,
		    showZAxis: false,
		    backgroundColor: '#151515',
		    onclick: this.handleClick,
		    cameraPosition: {
		    	horizontal: 1,
		    	vertical: 1,
		    	distance: 2
		    }
		};

	}

	handleClick = (point) => {
		for(let i=1; i<= this.props.search.numberOfPages; i++){
			this.props.getAllProducts(this.props.searchId, i)
		}
		this.props.getGraphdata(this.props.searchId, point.pId, this.props.history);
	}

	handleThisClick = () => {
		this.props.history.push(`/product/${this.props.searchId}/${this.props.product._id.$oid}`);
	}

	render(){
		return(
			<div>
				<br />
				<Row style={{marginLeft: '1.5vw', marginRight: '1.5vw'}}>
					<div className='col-7' style={{padding: '2vw', paddingTop: '0', paddingLeft: '0'}}>
						<Graph3D data={this.props.graphdata.data}
						options = {this.options}
						/>
					</div>
					<div className='col-5 text-center' style={{width:'100%', height: '500px', backgroundColor: 'white', padding: '1vw', paddingTop: '0'}}>
						<Image src = {this.props.product.img_url} style = {{maxWidth: '100%', height: 'auto'}}/>
						<div className = 'text-center'>
						<a target = '_blank' rel="noopener noreferrer" href = {`https://${this.props.product.product_url}`} style={{marginBottom: '0', overflow: 'hidden'}}>
							<Button className = 'buttonBlack' style = {{height: '3.5vw', width: '10vw', marginTop: '0.5vw'}}>
								Go to Source
							</Button>
						</a>
						<Button variant = 'dark' outline style = {{marginBottom: '0', height: '3.5vw', width: '10vw', borderRadius: '0.5vw', marginLeft: '0.5vw'
								, fontFamily: "'Montserrat', sans-serif", fontSize: '1vw', border: '0.078125vw solid black'
								, paddingLeft: '1vw', paddingRight: '1vw', paddingTop: '0.5vw', paddingBottom: '0.5vw', marginTop: '0.5vw'}}>
							Add Product
						</Button>
						<Button variant = 'dark' outline onClick = {this.handleThisClick}
							style = {{marginTop: '0.5vw', height: '3.5vw', width: '20.5vw', borderRadius: '0.5vw', fontFamily: "'Montserrat', sans-serif", 
							fontSize: '1vw', border: '0.078125vw solid black', paddingLeft: '1vw', paddingRight: '1vw', paddingTop: '0.5vw', paddingBottom: '0.5vw'}}>
							Go to Product Page
						</Button>
					</div>
					</div>
				</Row>
				<br />
			</div>
		);
	}
}

export default withRouter(Similar);