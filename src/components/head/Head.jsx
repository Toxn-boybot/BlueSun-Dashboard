import React from 'react';
import './head.css';
import { AiOutlineBell } from 'react-icons/ai';
import Avatar from '../../assets/avatar.png';

const Head = (props) => {
	return (
		<div className='head'>
			<p className='title'>{props.name}</p>

			<div className='icons'>
				<span className='notifications'>
					<AiOutlineBell className='bell' />
				</span>
				<img src={Avatar} alt='' />
			</div>
		</div>
	);
};

export default Head;
