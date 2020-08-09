import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Similar from './SimilarProducts';
import Collections from './CollectionsComponent';
import Search from './SearchComponent';
import Product from './ProductDetail';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { attemptLogin, attemptSignup, listCollections, logout, newCollection, getAllProducts
	, createSearch, searchResults, clearSearchError, getMetadata, addActiveMetadata, getGraphdata } from '../redux/ActionCreators';

const mapStateToProps = (state) => {
  return{
    login: state.login,
    collections: state.collections,
    search: state.search,
    metadata: state.metadata,
    graphdata: state.graphdata
  }      
}

const mapDispatchToProps = (dispatch) => ({
  attemptLogin: (emailId, password) => dispatch(attemptLogin(emailId,password)),
  attemptSignup: (email_id, password, firstname, lastname) => dispatch(attemptSignup(email_id, password, firstname, lastname)),
  listCollections: (authorization) => dispatch(listCollections(authorization)),
  newCollection: (authorization, collectionName) => dispatch(newCollection(authorization, collectionName)),
  createSearch: (searchText, resultType, history) => dispatch(createSearch(searchText, resultType, history)),
  searchResults: (searchId, pageNo, history) => dispatch(searchResults(searchId, pageNo, history)),
  clearSearchError: () => dispatch(clearSearchError()),
  getMetadata: (searchId) => dispatch(getMetadata(searchId)),
  addActiveMetadata: (metadata) => dispatch(addActiveMetadata(metadata)),
  getGraphdata: (searchId, productId, history) => dispatch(getGraphdata(searchId, productId, history)),
  getAllProducts: (searchId, pageNo) => dispatch(getAllProducts(searchId, pageNo)),
  logout: () => dispatch(logout())
});

class Main extends Component{

	componentDidMount(){
		this.props.listCollections(this.props.login.authorization);
	}

	render(){

		const HomePage = () => {
			return(
				<Home
				createSearch={this.props.createSearch}
				search={this.props.search}
				clearSearchError={this.props.clearSearchError} />
			);
		}

		const CollectionsPage = () => {
			return(
				<Collections
				login = {this.props.login}
				collections = {this.props.collections}
				logout={this.props.logout}
				newCollection={this.props.newCollection} />
			);
		}

		const SearchPage = ({match}) => {
			return(
				<Search searchId={match.params.searchId}
				pageNo={match.params.pageNo}
				createSearch={this.props.createSearch}
				search={this.props.search}
				metadata={this.props.metadata}
				clearSearchError={this.props.clearSearchError}
				getMetadata={this.props.getMetadata}
				addActiveMetadata={this.props.addActiveMetadata}
				searchResults={this.props.searchResults} />
			);
		}

		const ProductPage = ({match}) => {
			return(
				<Product
				search = {this.props.search}
				getAllProducts = {this.props.getAllProducts}
				getGraphdata = {this.props.getGraphdata}
				searchId = {match.params.searchId}
				pId = {match.params.pId}
				product = {this.props.search.allProducts.filter((prod) => match.params.pId === prod._id.$oid)[0]}
				/>
			);
		}

		const similarPage = ({match}) => {
			return(
				<Similar
				search = {this.props.search}
				getAllProducts = {this.props.getAllProducts}
				getGraphdata = {this.props.getGraphdata}
				graphdata = {this.props.graphdata}
				searchId = {match.params.searchId}
				pId = {match.params.pId}
				product = {this.props.search.allProducts.filter((prod) => match.params.pId === prod._id.$oid)[0]}				
				/>
			);
		}

		return(
			<div>
				<Header login={this.props.login} attemptLogin={this.props.attemptLogin} logout={this.props.logout}
				attemptSignup={this.props.attemptSignup} listCollections={this.props.listCollections} />
				<Switch>
					<Route exact path="/home" component = {HomePage} />
					<Route exact path="/collections" component = {CollectionsPage} />
					<Route exact path='/search/:searchId/:pageNo' component = {SearchPage} />
					<Route exact path='/product/:searchId/:pId' component = {ProductPage} />
					<Route exact path='/similar/:searchId/:pId' component = {similarPage} />
					<Redirect to="/home" />
				</Switch>
				<Footer />
			</div>
		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
