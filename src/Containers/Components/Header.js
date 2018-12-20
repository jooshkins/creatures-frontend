import React, { Fragment } from "react";
import { Row, Col, Button } from 'reactstrap';
import hero from '../../Assets/hero.png'

export default (props) => {
    return (
        <Row>
            <Col className="p-0">
                <img width="100%" alt="hero" className="colBorder-bottom" src={hero}/>
                {props.isAuthenticated
                    ? <Fragment>
                        <Button className="hero-btn shadow-lg" color="success" size="lg" href="/scan">Let's Ride!</Button>
                    </Fragment>
                    : <Fragment>
                        <Button className="hero-btn shadow-lg" color="success" size="lg" href="/login">Let's Ride!</Button>
                    </Fragment>
                  }
            </Col>
        </Row>
    )
}

