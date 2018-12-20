import React, { Component } from 'react';
import FAQ from './Components/FAQ'
import StatementCards from './Components/StatementCards'
import Header from './Components/Header'
import { Row, Col } from 'reactstrap';
import section1 from '../Assets/section1.png'
import section2 from '../Assets/section2.png'

export default class About extends Component {

    render() {
        return (
            <div>
                <Header isAuthenticated={this.props.isAuthenticated} />
                <Row className="shadow-lg mt-3 mx-3 lightBg colBorder border border-danger">
                    <Col className="my-auto pl-5 py-3 col-sm">
                        <StatementCards />
                    </Col>
                    <Col className="col-sm">
                        <img className="img-fluid sectionImg float-right" alt="" src={section1}/>
                    </Col>
                </Row>
                <Row className="shadow-lg my-5 mx-3 lightBg colBorder border border-danger">
                    <Col className="pl-0">
                        <img className="img-fluid sectionImg float-left" alt="" src={section2}/>
                    </Col>
                    <Col className="my-auto pr-5 py-3">
                        <FAQ />
                    </Col>
                </Row>
            </div>
        )
    }
}