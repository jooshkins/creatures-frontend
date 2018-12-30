import React from "react";
import { Card, CardBody, CardImg, CardTitle, CardText } from 'reactstrap';
import scanCard from '../../Assets/scanCard.jpg'

export default () => {
    return (
        <Card className="mt-3">
            <CardImg top src={scanCard} />
            <CardBody className="Rokkitt text-dark width-50">
                <CardTitle><h3>zI</h3></CardTitle>
                <CardText className="text-left lead text-bold">
                    <ul>
                        <li>
                            Creature Type: <br />Elemental Ancient
                        </li>
                        <li>
                            Mobility: Manual
                        </li>
                        <li>
                            Age:  UNKNOWN
                        </li>
                    </ul>
                    One of the ancient elemental creatures, formless, mysterious, and possessing vast power. 
                    Many tales and legends surround the origin of this creature. 
                    Some worship it as a god (the cult of I) 
                    others regard it as an evil spirit or doubt its very existence. 
                    Those believed to have gazed upon the creature, are oft heard repeating 
                    the phrase: "The eye knows. The eye sees...
                </CardText>
            </CardBody>
        </Card>
    )
}

