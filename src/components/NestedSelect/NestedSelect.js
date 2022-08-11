import React, { useContext, useState } from 'react'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import ListGroup from 'react-bootstrap/ListGroup'
import SplitButton from 'react-bootstrap/SplitButton'
import { FormErrorsContext } from '../../context/FormErrorsContext.js'
import SubItemsPopover from '../SubItemsPopover/SubItemsPopover.js'
import styles from './NestedSelect.module.css'

const NestedSelect = (props) => {
  //items
  const { items, showSubItem, icon, value, title, name } = props
  //sub-items (popover)
  const { subItems, labelText, show, setShow, target, onSubItemClick } = props
  const { formErrors } = useContext(FormErrorsContext)

  return (
    <>
      <div
        style={{ display: show ? 'block' : 'none' }}
        className={styles['overlay']}
        onClick={() => setShow({ target: undefined, show: false })}
      ></div>
      <InputGroup size="lg" className={`${styles['input-group']} mb-3`}>
        <SplitButton
          variant="outline-secondary"
          title={title}
          id="segmented-button-dropdown-1"
        >
          <ListGroup className={styles['list-group']} variant="flush">
            {items.map((item) => (
              <ListGroup.Item key={item.label} onMouseEnter={showSubItem}>
                {(icon && (
                  <div>
                    {item.icon} {item.label}
                  </div>
                )) ||
                  item.label}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </SplitButton>
        <Form.Control
          onChange={() => {}}
          value={value}
          name={formErrors && formErrors[name]}
          isInvalid={formErrors && formErrors[name]}
        />
        <Form.Control.Feedback type="invalid">
          {formErrors && formErrors[name]}
        </Form.Control.Feedback>
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
