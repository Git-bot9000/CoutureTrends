import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Collections from './CollectionsComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { attemptLogin, attemptSignup, listCollections, logout, newCollection } from '../redux/ActionCreators';

const mapStateToProps = (state) => {
  return{
    login: state.login,
    collections: state.collections
  }      
}

const mapDispatchToProps = (dispatch) => ({
  attemptLogin: (emailId, password) => dispatch(attemptLogin(emailId,password)),
  attemptSignup: (email_id, password, firstname, lastname) => dispatch(attemptSignup(email_id, password, firstname, lastname)),
  listCollections: (authorization) => dispatch(listCollections(authorization)),
  newCollection: (authorization, collectionName) => dispatch(newCollection(authorization, collectionName)),
  logout: () => dispatch(logout())
});

class Main extends Component{

	componentDidMount(){
		this.props.listCollections(this.props.login.authorization);
	}

	render(){

		const HomePage = () => {
			return(
				<Home />
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

		return(
			<div>
				<Header login={this.props.login} attemptLogin={this.props.attemptLogin} logout={this.props.logout}
				attemptSignup={this.props.attemptSignup} listCollections={this.props.listCollections} />
				<Switch>
					<Route path="/home" component = {HomePage} />
					<Route exact path="/collections" component = {CollectionsPage} />
					<Redirect to="/home" />
				</Switch>
				<Footer />
			</div>
		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
