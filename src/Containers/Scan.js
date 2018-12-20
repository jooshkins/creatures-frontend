import React, { Component, Fragment } from 'react';
import { Button, Input, InputGroup, InputGroupAddon, Modal, ModalHeader, 
        ModalBody, Card, CardBody, CardHeader, CardFooter, Form, FormGroup, Row, Col } from 'reactstrap'
import QrReader from 'react-qr-reader'
import { API } from "aws-amplify";
import SmallHeader from './Components/SmallHeader'
import LoaderButton from "./Components/LoaderButton";
import ScanInfo from "./Components/ScanInfo";
import Stopwatch from "./Components/stopwatch/components/Stopwatch"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Scan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            delay: 300,
            code: '',
            modal: false,
            checkedOut: false,
            rideStarted: false
        }
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    validateForm() {
        return this.state.code.length === 4;
    }

    handleScan = scan => {
        if (scan) {
            this.setState({ code: scan })
            this.toggle()
        }
    }

    handleError = err => {
        console.error(err)
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();
        this.setState({ isLoading: true });

        try {
            const scooter = await this.checkScooterStatus(this.state.code);

            if (scooter.status) {
                if (scooter.nextTime) {
                    let convertTime = new Date(scooter.nextTime).toLocaleTimeString('en-US')
                    alert(`You must wait until: ${convertTime} before you can check out this ${process.env.REACT_APP_SCOOTER_TERM} again!`)
                    this.setState({ isLoading: false })
                } else {
                    this.setState({ checkedOut: true });
                }
            }

        } catch (e) {
            console.log(e);
            alert(`${process.env.REACT_APP_SCOOTER_TERM} not available or invalid ${process.env.REACT_APP_SCOOTER_TERM} ID!`)
            this.setState({ isLoading: false });
        }
    }

    checkScooterStatus(scooterId) {
        return API.get(process.env.REACT_APP_API_GATEWAY_NAME, `/scooter/${scooterId}`);
    }

    startRide = () => {
        this.setState({
            rideStarted: true
        });
    }

    render() {
        return (
            <div>
                <SmallHeader />
                <Row>
                    <Col sm="12" md={{ size: 4, offset: 4 }}>
                    {
                        this.state.rideStarted 
                        ? <Fragment>
                                <Stopwatch scooterId={this.state.code} />
                        </Fragment>
                        : this.state.checkedOut 
                        ? <Fragment>
                            <ScanInfo />
                            <Button block color="success" onClick={this.startRide} className="mt-3">
                                Unlock {process.env.REACT_APP_SCOOTER_TERM}
                            </Button>
                        </Fragment>
                        : <Fragment>
                            <Card className="shadow-lg border border-danger" color="dark">
                            <CardHeader tag="h3">{process.env.REACT_APP_SCOOTER_TERM} ID</CardHeader>
                            <Form onSubmit={this.handleSubmit}>
                                <CardBody>
                                <FormGroup id="qr">
                                </FormGroup>
                                <FormGroup id="code">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <Button color="primary" onClick={this.toggle}>Scan QR</Button>
                                        </InputGroupAddon>
                                        <Input
                                            type="text"
                                            name="code"
                                            id="code"
                                            value={this.state.code}
                                            maxLength={4}
                                            onChange={this.handleChange}
                                            placeholder={`4 character ${process.env.REACT_APP_SCOOTER_TERM} ID`}
                                        />
                                    </InputGroup>
                                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                        <ModalHeader className="bg-warning" toggle={this.toggle}><FontAwesomeIcon icon="qrcode"/> QR Scanner</ModalHeader>
                                        <ModalBody>
                                            <QrReader
                                                delay={this.state.delay}
                                                onError={this.handleError}
                                                onScan={this.handleScan}
                                                className="qrReader"
                                            />
                                        </ModalBody>
                                    </Modal>
                                </FormGroup>
                                </CardBody>
                                <CardFooter>
                                <LoaderButton
                                    color="success"
                                    block
                                    disabled={!this.validateForm()}
                                    type="submit"
                                    isLoading={this.state.isLoading}
                                    text={`Check ${process.env.REACT_APP_SCOOTER_TERM} Status`}
                                    loadingText="Checking ID"
                                />
                                </CardFooter>
                                </Form>
                            </Card>
                        </Fragment>
                    }
                    </Col>
                </Row>
            </div>
        )
    }
}