import React, { Component } from 'react';
import { ListGroup, ListGroupItem, UncontrolledCollapse, ListGroupItemText } from 'reactstrap';
import  Emoji  from './Emoji';
import content  from '../../Assets/content.json' 

const q = content.questions
const a = content.answers

let combine = []
let ran = false

const CombineFAQ = () => {
    if (ran) {
        return combine
    } else {
        for (let i = 0; i < q.length; i++) {
            combine.push(
                <ListGroupItem color="dark" tag="button" action id={'q' + i}>
                    <b>{q[i]}</b>
                    <UncontrolledCollapse toggler={'#q' + i}>
                        <ListGroupItemText>
                            {a[i]}
                        </ListGroupItemText>
                    </UncontrolledCollapse>
                </ListGroupItem> 
            )
        }
        ran = true
        return combine
    }
}

class FAQ extends Component {
    render() {
        return (
            <div>
            <h2 className="text-danger mb-3">
                <Emoji label="confused woman" emoji="🤷‍" /> FAQ <Emoji label="confused woman" emoji="🤷‍" />
            </h2>
            <ListGroup className="text-left">
                <CombineFAQ />
            </ListGroup>
            </div>
        );
    }
}

export default FAQ;