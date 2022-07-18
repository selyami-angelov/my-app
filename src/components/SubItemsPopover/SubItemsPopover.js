import React, { useEffect, useRef } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Overlay from 'react-bootstrap/Overlay'
import Popover from 'react-bootstrap/Popover'
import styles from './SubItemsPopover.module.css'

const SubItemsPopover = (props) => {
  const ref = useRef(null)

  return (
    <div ref={ref}>
      <Overlay
        show={props.show}
        target={props.target}
        placement={props.placement}
        container={ref}
        containerPadding={20}
      >
        <Popover className={styles['list-group']} id="popover-contained">
          <Popover.Header as="h3">{props.labelText}</Popover.Header>
          <Popover.Body>
            <ListGroup variant="flush">
              {props.items?.map((item) => (
                <ListGroup.Item
                  key={item}
                  action
                  onClick={props.onSubItemClick}
                >
                  {item}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  )
}

export default SubItemsPopover
