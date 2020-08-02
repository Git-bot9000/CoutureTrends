import React from 'react';
import {Row, Col} from 'reactstrap';
import { Link } from 'react-router-dom';
import {Image} from 'react-bootstrap';
import facebook from '../assets/images/facebook.svg';

function Footer(){
	return(
		<div className='footer'>
			<Row className='footerInsides'>
			<Col className="logo footerLogo">LOGO</Col>
			<Col className='text-center'>			
				<Link to='/'>
					<Image src={facebook} className='footerLogos'/>
				</Link>
				<Link to='/'>
					<Image src={facebook} className='footerLogos'/>
				</Link>
				<Link to='/'>
					<Image src={facebook} className='footerLogos'/>
				</Link>
				<Link to='/'>
					<Image src={facebook} className='footerLogos'/>
				</Link>
			</Col>			
			<Col>
				<div className='copyright'>© Company, Inc. 2019. We love our users!</div>
			</Col>
			</Row>
		</div>
	);
}

export default Footer;