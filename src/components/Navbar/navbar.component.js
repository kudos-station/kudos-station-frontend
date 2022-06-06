import React from 'react'
import { Navbar, Nav, Form, Button, Container, FormControl } from 'react-bootstrap';
import LogOutButton from './logoutbutton.component';
import { getCookie } from './/../cookie-functions';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
const KudosNavbar = () => {
	
	const navigate = useNavigate();
	useEffect(() => {
		if (!getCookie('kudos-auth')) {
			navigate("/login");
		}
	}, [])

	const onClickSearch = async (e) => {
		e.preventDefault();
		var { searchB } = document.forms[0];
		sendUserProfile(searchB.value)
	}
	const sendUserProfile = async (searchB) => {
		const requestOptions = {
			method: 'GET',
			headers: { 'Authorization': getCookie('kudos-auth'), 'Content-Type': 'application/json' },
		};
		const base_url = process.env.REACT_APP_KUDOS_BASE_URL
		const res = await fetch(base_url + '/user/profile/' + searchB, requestOptions)
		const data = await res.json()
		if (res.status === 200) {
			navigate('/searchedProfile', {
				state: {
					datam: data
				}
			});
			window.location.reload();
		} else {
			console.log('failed to send')
		}
	}
	const kudosNavbar = (
		<Navbar bg="light" expand="lg">
		<Container fluid>
			<Navbar.Brand href="/home">Kudos Station</Navbar.Brand>
			<Navbar.Toggle aria-controls="navbarScroll" />
			<Nav
				className="container-fluid"
				style={{ maxHeight: '100px' }}
				navbarScroll
			>   <Nav.Link className="border-left pl-2 ml-auto"  href="/filter">Filter</Nav.Link>
				<Nav.Link className="border-left pl-2 ml-auto"  href="/scoreboard">Scoreboard</Nav.Link>
				<Nav.Link className="border-left pl-2 ml-auto"  href="/profile">Profile</Nav.Link>
			</Nav>

				<form onSubmit={onClickSearch} className = "d-flex">
							<input
								type="text"
								className="me-2"
								placeholder="Search user"
								style={{ "width": "200px" }}
								name="searchB"
								required
							/>
							<button type="submit" className="btn btn-primary" style={{ "width": "90px", "marginRight":"10px" }}>
								Search
							</button>

				
				</form>

			{<LogOutButton />}
		</Container>
		</Navbar>
	)
	return(
	<>
		{kudosNavbar}
    </>
	)
}

export default KudosNavbar;