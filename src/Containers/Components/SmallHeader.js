import React from "react";
import { Row, Col } from 'reactstrap';
import logo from '../../Assets/logo.png'

export default () => {
    return (
        <Row>
            <Col>
                <div className="w-50 mx-auto mb-5 colBorder-bottom yellowBg shadow-lg">
                    <img width="100%" alt="logo" src={logo}/>
                </div>
            </Col>
        </Row>
    )
}

