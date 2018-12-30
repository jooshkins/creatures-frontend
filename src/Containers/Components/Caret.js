import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default class Caret extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
          open: !this.state.open
        });
      }

    render() {
        return (
            <Button
            className="float-right"
            color={this.props.color}
            id={'q' + this.props.id}
            onTouchStart={this.toggle}
            onClick={this.toggle}
            >
                <FontAwesomeIcon 
                icon="caret-right" 
                className={this.state.open ? "caret" : "caret open"}
                size="lg"
                /> 
            </Button>
        )
    }
}
