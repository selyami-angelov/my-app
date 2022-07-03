import React, { useState, useRef } from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import ListGroup from 'react-bootstrap/ListGroup';
import { cats } from '../../configs/cats-config.js';

const CatPopover = (props) => {
    const ref = useRef(null);
    const cat = cats.find(cat => cat.label.trim() == props.labelText.trim())

    console.log(props.placement)

    return (
        <div ref={ref}>
            <Overlay
                show={props.show}
                target={props.target}
                placement={props.placement}
                container={ref}
                containerPadding={20}
            >
                <Popover id="popover-contained">
                    <Popover.Header as="h3">{props.labelText}</Popover.Header>
                    <Popover.Body>
                        <ListGroup variant="flush">
                            {cat?.subCats?.map(cat => (
                                <ListGroup.Item key={cat} action onClick={() => console.log('clicked')}>
                                    {cat}
                                </ListGroup.Item>)
                            )}
                        </ListGroup>
                    </Popover.Body>
                </Popover>
            </Overlay>
        </div>
    );
}

export default CatPopover
