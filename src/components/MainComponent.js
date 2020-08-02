import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { attemptLogin, attemptSignup, logout } from '../redux/ActionCreators';

const mapStateToProps = (state) => {
  return{
    login: state.login
  }      
}

const mapDispatchToProps = (dispatch) => ({
  attemptLogin: (emailId, password) => dispatch(attemptLogin(emailId,password)),
  attemptSignup: (email_id, password, firstname, lastname) => dispatch(attemptSignup(email_id, password, firstname, lastname)),
  logout: () => dispatch(logout())
});

class Main extends Component{
	render(){

		const HomePage = () => {
			return(
				<Home />
			);
		}
		return(
			<div>
				<Header login={this.props.login} attemptLogin={this.props.attemptLogin} logout={this.props.logout}
				attemptSignup={this.props.attemptSignup} />
				<Switch>
					<Route path="/home" component = {HomePage} />
					<Redirect to="/home" />
				</Switch>
				<Footer />
			</div>
		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
