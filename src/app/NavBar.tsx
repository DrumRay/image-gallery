"use client";

import {Container, Nav, NavDropdown, Navbar} from "react-bootstrap";
import Link from "next/link"
import { usePathname } from "next/navigation";



export default function NavBar () {
    const pathname = usePathname();



    return(
        <Navbar bg="primary" variant="dark" sticky="top" expand='sm' collapseOnSelect>
            <Container>
                <Navbar.Brand as={Link} href="/"> 
                    NextJS Image Gallery
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav>
                        <Nav.Link as={Link} href="/static" active={pathname==="/static"}>Static</Nav.Link>
                        <Nav.Link as={Link} href="/dynamic" active={pathname==="/dynamic"}>Dynamic</Nav.Link>
                        <Nav.Link as={Link} href="/isr" active={pathname==="/isr"}>Incremental Static Regeneration</Nav.Link>
                        <NavDropdown title="Темы" id="topics-dropdown">
                            <NavDropdown.Item as={Link} href="/topics/robots">Robots</NavDropdown.Item>
                            <NavDropdown.Item as={Link} href="/topics/home">Home</NavDropdown.Item>
                            <NavDropdown.Item as={Link} href="/topics/Nature">Nature</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} href="/search" active={pathname==="/search"} className="ml-auto">Поиск</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};