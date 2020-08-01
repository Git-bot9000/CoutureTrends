import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { attemptLogin, logout } from '../redux/ActionCreators';

const mapStateToProps = (state) => {
  return{
    login: state.login
  }      
}

const mapDispatchToProps = (dispatch) => ({
  attemptLogin: (emailId, password) => dispatch(attemptLogin(emailId,password)),
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
				<Header login={this.props.login} attemptLogin={this.props.attemptLogin} logout={this.props.logout} />
				<Switch>
					<Route path="/home" component = {HomePage} />
					<Redirect to="/home" />
				</Switch>
			</div>
		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
