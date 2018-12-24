import React from "react";
import { Row, Col } from 'reactstrap';
import logo from '../../Assets/logo.png'

export default () => {
    return (
        <Row>
            <Col>
                <div id="SmallHeader" className="mx-auto colBorder-bottom yellowBg shadow-lg">
                    <img width="100%" alt="logo" src={logo}/>
                </div>
            </Col>
        </Row>
    )
}

