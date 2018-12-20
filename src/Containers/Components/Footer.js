import React from "react";
import { Row, Col, Nav, NavLink } from 'reactstrap';

export default () => {
    return (
        <Row id="footer">
            <Col className="py-3 colBorder-top yellowBg mt-3">
                <Nav horizontal="center">
                    <NavLink href="/">About</NavLink>
                    <NavLink href="/login">Login</NavLink>
                    <NavLink href="/scan">Ride</NavLink>
                    <NavLink href={`mailto:${process.env.REACT_APP_CONTACT_EMAIL}?Subject=Scooters!`} target="_top">Contact</NavLink>
                    <NavLink href="/privacy">Privacy Policy</NavLink>
                    <NavLink href="/terms">Terms of Service</NavLink>
                </Nav>
            </Col>
        </Row>
    )
}

