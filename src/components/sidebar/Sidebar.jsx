import React from 'react';
import './sidebar.css';
import { CgSun } from 'react-icons/cg';
import { GoEye } from 'react-icons/go';
import { BsPeopleFill } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
	const [activePage, setActivePage] = useState('');
	const [isToggled, setIsToggled] = useState(false);
	const location = useLocation();
	useEffect(() => {
		const path = location.pathname;
		setActivePage(path);
		console.log(path);
	}, [location]);

	useEffect(() => {
		const handleResize = () => {
			setIsToggled(window.innerWidth > 1100);
		};

		handleResize(); // Initial check

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const buttonStyle = {
		transform: isToggled ? 'translateX(0%)' : 'translate(-100%)',
		transition: '0.3s',
	};

	return (
		<section className='side-bar' style={buttonStyle}>
			<div className='container'>
				<div className='logo'>
					<span className='logo-layer' onClick={() => setIsToggled(!isToggled)}>
						<CgSun className='logo-icon' />
					</span>{' '}
					<span className='title'>Blue Sun</span>
				</div>
			</div>
			<hr className='separator' />
			<div className='tabs'>
				<div className='container'>
					<ul>
						<Link to='/' onClick={() => setActivePage('')}>
							<li className={activePage === '/' ? 'active' : ''}>
								<GoEye />
								Overview
							</li>
						</Link>
						<Link to='/customers' onClick={() => setActivePage('customers')}>
							<li className={activePage === '/customers' ? 'active' : ''}>
								<BsPeopleFill />
								Customers
							</li>
						</Link>
					</ul>
				</div>
			</div>
		</section>
	);
};

export default Sidebar;
