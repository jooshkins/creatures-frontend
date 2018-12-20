import React, { Component } from 'react';
import { Button } from 'reactstrap';
import content  from '../Assets/content.json' 

export default class Legal extends Component {
    render() {
        return (
            <div>
                <h1>Legal Stuff</h1>
                <p>
                    {content.legalTxt}
                </p>
                <Button color="success">I agree</Button>
            </div>
        );
    }
}