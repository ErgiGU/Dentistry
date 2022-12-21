import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import React from "react";

//this class is a skeleton for viewing timeslots, it will take in the week day as prop

const Timeslots = (props) => {
    const slot = props.slot;

    console.log(props, slot);

    return(
        <ListGroup variant="flush">
        {slot.map((slot) => (
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
                <div className="ms-2 me-auto">
                    {slot.time}
                </div>
                <Badge bg="primary" pill>
                    {slot.batch}
                </Badge>
            </ListGroup.Item>
        ))}
            </ListGroup>
    )
}

export default Timeslots;
