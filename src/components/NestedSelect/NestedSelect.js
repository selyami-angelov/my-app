import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import ListGroup from 'react-bootstrap/ListGroup'
import SplitButton from 'react-bootstrap/SplitButton'
import SubItemsPopover from '../SubItemsPopover/SubItemsPopover.js'

const NestedSelect = (props) => {
  //items
  const { items, showSubItem, icon, value, title } = props
  //sub-items (popover)
  const { subItems, labelText, show, target, onSubItemClick } = props

  return (
    <>
      <InputGroup size="lg" className="mb-3">
        <SplitButton
          variant="outline-secondary"
          title={title}
          id="segmented-button-dropdown-1"
        >
          <ListGroup
            style={{ height: '400px', overflowY: 'scroll' }}
            variant="flush"
          >
            {items.map((item) => (
              <ListGroup.Item key={item.label} onClick={showSubItem}>
                {(icon && (
                  <>
                    {item.icon} {item.label}
                  </>
                )) ||
                  item.label}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </SplitButton>
        <Form.Control value={value} />
      </InputGroup>
      <SubItemsPopover
        items={subItems}
        placement={'right'}
        labelText={labelText}
        show={show}
        target={target}
        onSubItemClick={onSubItemClick}
      ></SubItemsPopover>
    </>
  )
}

export default NestedSelect
