import React from 'react'
import { Navbar, Nav, Form, Button, Container, FormControl } from 'react-bootstrap';
import LogOutButton from '../logoutbutton.component';

const KudosNavbar = () => {

	const kudosNavbar = (
		<Navbar bg="light" expand="lg">
		<Container fluid>
			<Navbar.Brand href="/home">Kudos Station</Navbar.Brand>
			<Navbar.Toggle aria-controls="navbarScroll" />
			<Nav
				className="container-fluid"
				style={{ maxHeight: '100px' }}
				navbarScroll
			>
				<Nav.Link className="border-left pl-2 ml-auto" style={{"marginLeft": "auto", "marginRight": "10px"}} href="/profile">Profile</Nav.Link>
			</Nav>
			<Form className="d-flex">
				<FormControl
				type="search"
				placeholder="Search"
				className="me-2"
				aria-label="Search"
				style={{"width": "200px", "border": "1px solid #167bff", "marginRight": "10px"}}
				/>
				<Button className="btn btn-primary" variant="outline-success" id="searchButton" style= {{"marginRight": "10px"}}>Search</Button>
			</Form>
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