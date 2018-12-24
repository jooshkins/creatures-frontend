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
                <Row className="shadow-lg mt-3 about-row lightBg ">
                    <Col xs="12" sm="6" md="7" className="py-3">
                        <StatementCards />
                    </Col>
                    <Col xs="12" sm="6" md="5" >
                        <img className="img-fluid sectionImg float-right" alt="" src={section1}/>
                    </Col>
                </Row>
                <Row className="shadow-lg my-5 about-row lightBg">
                    <Col xs={{size: 12, order: 2}} sm={{size: 6, order: 1}} className="pl-0">
                        <img className="img-fluid sectionImg float-left" alt="" src={section2}/>
                    </Col>
                    <Col xs={{size: 12, order: 1}} sm={{size: 6, order: 2}} className="faq-col">
                        <FAQ />
                    </Col>
                </Row>
            </div>
        )
    }
}