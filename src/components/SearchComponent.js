import React, { Component } from 'react';
import SearchBar from './SearchBar';
import Filters from './Filters';
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';
import {Image} from 'react-bootstrap';
import {Row, Pagination, PaginationItem, PaginationLink} from 'reactstrap';

const dummyStyle = {
	width: '49%',
	float: 'left',
	marginBottom: '2%',
	marginRight: '1%',
	height: 'auto',
	backgroundColor: 'white'
}

const dummyStyleImg = {
	maxWidth: '100%',
	height: '35vw'
}

const containerStyle = {
	margin: '0', 
	paddingLeft: '1.25vw', 
	paddingRight: '1.25vw'
}

const metadataStyle = {
	height: 'auto' , 
	marginLeft: '0',
	backgroundColor: 'white',
	padding: '0'
}

const productdataStyle = {
	paddingTop: '1vw',
	height: 'auto',
	paddingRight: '1vw',
	paddingLeft: '2vw',
	backgroundColor: 'white'
}

const productNameStyle = {
	fontFamily: "'Abril Fatface', cursive",
	paddingTop: '1vw',
	fontSize: '1.25vw',
	color: '#555555',
}

class Search extends Component{
	constructor(props){
		super(props);
		this.state = {
			activeFilters: [],
			openCategories: []
		}
	}

	pageToPrev = () => {
		this.props.searchResults(this.props.searchId, parseInt(this.props.pageNo, 10) - 1, this.props.history);
	}

	pageToNext = () => {
		this.props.searchResults(this.props.searchId, parseInt(this.props.pageNo, 10) + 1, this.props.history);
	}

	handleActiveFiltersPush = (value) => {
		let a = this.state.activeFilters.slice();
		a.push(value);
		this.setState({
			activeFilters: a
		});
	}

	handleActiveFiltersSplice = (index) => {
		let a = this.state.activeFilters.slice();
		a.splice(index, 1);
		this.setState({
			activeFilters: a
		});
	}

	handleOpenCategories = (index, value) => {
		let a = this.state.openCategories.slice();
		a[index] = value;
		this.setState({
			openCategories: a
		});
	}

	RenderProducts = () => {
		let products = null;
		if(this.state.activeFilters && this.state.activeFilters.length)
		{
			products = this.props.search.productList.map((product) => {
				let tagMatches = false;
				for(let i=0; i<product.tags_list.length; i++){
					if(product.tags_list[i] !== '4 & above' && product.tags_list[i] !== '3 & above'
						&& product.tags_list[i] !== '2 & above' && product.tags_list[i] !== '2 & above'
						&& product.tags_list[i] !== '1 & above')
						if(this.state.activeFilters.includes(product.tags_list[i])){
							tagMatches = true;
							break;
						}
				}
				if(!tagMatches){
					if(this.state.activeFilters.includes('4 & above') && product.product_ratings>=4){
						tagMatches = true;
					}
					if(this.state.activeFilters.includes('3 & above') && product.product_ratings>=3){
						tagMatches = true;
					}
					if(this.state.activeFilters.includes('2 & above') && product.product_ratings>=2){
						tagMatches = true;
					}
					if(this.state.activeFilters.includes('1 & above') && product.product_ratings>=1){
						tagMatches = true;
					}
				}
				if(tagMatches){
					return(
						<Link to = {`/product/${this.props.searchId}/${product._id.$oid}`} >
							<div style={dummyStyle} className='text-center'>
								<Image src={product.img_url} style={dummyStyleImg}></Image>
								<div style={productNameStyle}>{product.product_name}</div>
							</div>
						</Link>
					);
				}
				return null ; 
			});
		}
		else{
			products = this.props.search.productList.map((product) => {
				return(
					<Link to = {`/product/${this.props.searchId}/${product._id.$oid}`} >
						<div style={dummyStyle} className='text-center'>
							<Image src={product.img_url} style={dummyStyleImg}></Image>
							<div style={productNameStyle}>{product.product_name}</div>
						</div>
					</Link>
				);
			});
		}
		return products;
	}

	RenderMetadata = () => {
		let index=0;
		const filters = this.props.metadata.filters.map((filter) => {
			return(
				<div className='text-center' style={{fontSize: '1.25vw', fontFamily: "'Montserrat', sans-serif"}}>
					<Filters filter={filter} 
					handleActiveFiltersPush={this.handleActiveFiltersPush} 
					handleActiveFiltersSplice={this.handleActiveFiltersSplice}
					index={index++}
					handleOpenCategories={this.handleOpenCategories}
					openCategories={this.state.openCategories}
					activeFilters={this.state.activeFilters} />					
				</div>
			);
		});
		return filters;
	}

	RenderPagination = () => {
		if(parseInt(this.props.pageNo, 10) === 1){
			return(
				<Pagination aria-label="Page navigation example" style={{marginBottom:'1.5vw', float: 'right', marginRight: '1.5vw'}}>
			        <PaginationItem>
			        	<PaginationLink next onClick = {this.pageToNext} href="#" />
			        </PaginationItem>
				</Pagination>
			);
		}
		if(parseInt(this.props.pageNo, 10) === parseInt(this.props.search.numberOfPages, 10)){
			return(
				<Pagination aria-label="Page navigation example" style={{marginBottom:'1.5vw', float: 'right', marginRight: '4vw'}}>
					<PaginationItem>
					    <PaginationLink previous onClick = {this.pageToPrev} href="#" />
				    </PaginationItem>
				</Pagination>
			);
		}

		return(
			<Pagination aria-label="Page navigation example" style={{marginBottom:'1.5vw', float: 'right', marginRight: '1.5vw'}}>
				<PaginationItem>
				    <PaginationLink previous onClick = {this.pageToPrev} href="#" />
			    </PaginationItem>
		        <PaginationItem>
		        	<PaginationLink next onClick = {this.pageToNext} href="#" />
		        </PaginationItem>
			</Pagination>
		);
	}

	render(){
		return(
			<div style = {{backgroundColor: '#FADBD8'}}>
				<div className="conatiner">
					<div className="col-8 offset-2 text-center">
						<SearchBar createSearch={this.props.createSearch}
						search={this.props.search}
						clearSearchError={this.props.clearSearchError} />
					</div>
				</div>
				<hr style={{margin: '0'}} />
				<br />
				<Row className="container col-12" style={containerStyle}>
					<div className="col-2" style={metadataStyle}>
						<div style={{marginTop:'1vw', marginLeft: '1vw', backgroundColor:'#eeeeee', paddingTop: '1vw'}}>
							<this.RenderMetadata />
						</div>
					</div>
					<div className="col-10 offset-0" style={productdataStyle}>
						<this.RenderProducts />
					</div>
				</Row>
				<br />
				<div className="text-center">
					<this.RenderPagination />	
				</div>
			</div>
		);
	}
}

export default withRouter(Search); 