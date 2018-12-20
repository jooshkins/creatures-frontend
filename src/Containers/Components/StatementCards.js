import React, { Component } from 'react';
import  Emoji  from './Emoji';
import content  from '../../Assets/content.json'

export default class StatementCards extends Component {
    render() {
        return (
            <div className="text-left">
                <h3 className="text-danger"><Emoji label="money face" emoji="🤑" /> Free</h3>
                <p className="pl-5">
                    {content.freeTxt}
                </p>
                <h3 className="text-danger"><Emoji label="laptop" emoji="💻" /> Open Source</h3>
                <p className="pl-5">
                    {content.OSTxt} <a href="/">Project Site</a>
                </p>
                <h3 className="text-danger"><Emoji label="angel face" emoji="😇" /> Charities</h3>
                <p className="pl-5">
                    {content.charityTxt}
                </p>
            </div>
        );
    }
}