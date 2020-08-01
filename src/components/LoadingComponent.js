import React from 'react';
import { Spinner } from 'reactstrap';

export const Loading = () => {
	return(
		<div className='col-2 offset-5'>
			<Spinner color="info" />
		</div>
	);
}