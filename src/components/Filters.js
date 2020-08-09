import React, { Component } from 'react';
import { Collapse, Input } from 'reactstrap';

class Filters extends Component{

	constructor(props){
		super(props);
		this.state = {
			isOpen: false
		} 
		if(this.props.openCategories[this.props.index] === true || this.props.openCategories[this.props.index] === false){
			this.setState({
				isOpne: this.props.openCategories[this.props.index]
			})
		}
		else{
			this.setState({
				isOpen: false
			})
		}
	}

	toggle = () => {
		this.props.handleOpenCategories(this.props.index,!this.state.isOpen);
		this.setState({
			isOpen: !(this.state.isOpen)
		}); 
	}

	checkboxClicked = (event) => {
		const name = event.target.name;
		const isChecked = event.target.checked;
		const isPresent = this.props.activeFilters.includes(name);
		if(isChecked && !(isPresent)){
			this.props.handleActiveFiltersPush(name);
		}
		if(!(isChecked) && isPresent){
			const index = this.props.activeFilters.indexOf(name);
			this.props.handleActiveFiltersSplice(index);
		}
	}

	render(){
		let character = null;
		if(this.state.isOpen){
			character = '-';
		}
		else{
			character = '+';
		}

		const options = this.props.filter.values.map((value) => {
			return(
				<div className='text-left' style={{paddingLeft: '2.5vw', marginBotton: '0.72vw'}}>
					<Input type='checkbox' name={value} style={{width:'1vw', height:'1vw',  marginLeft: '-9%', marginTop: '0.2vw', 
						boxShadow: 'none', cursor: 'pointer'}} onChange = {this.checkboxClicked}/>{value}
				</div>
			);
		})

		return(
			<React.Fragment>
				<div onClick = {this.toggle} className='filterCategory'> 
					{this.props.filter.category_name} 
						<div style={{float: 'right', paddingRight: '2vw'}}>
							{character}
						</div>
				</div>
				<hr style={{margin: '1vw'}}/>
				<Collapse isOpen={this.props.openCategories[this.props.index]} style={{overflowY: 'auto', fontSize: '1vw'}}>

				{options}

				<br />
				<br />
				</Collapse>
			</React.Fragment>
		);
	}
}

export default Filters;