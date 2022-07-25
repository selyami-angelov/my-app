import React, { useContext, useState } from 'react'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import ListGroup from 'react-bootstrap/ListGroup'
import SplitButton from 'react-bootstrap/SplitButton'
import { FormContext, FormContextProvider } from '../../context/FormContext.js'
import { FormErrorsContext } from '../../context/FormErrorsContext.js'
import SubItemsPopover from '../SubItemsPopover/SubItemsPopover.js'
import styles from './NestedSelect.module.css'

const NestedSelect = (props) => {
  //items
  const { items, showSubItem, icon, value, title, name } = props
  //sub-items (popover)
  const { subItems, labelText, show, target, onSubItemClick } = props
  const { formErrors } = useContext(FormErrorsContext)

  return (
    <>
      <InputGroup size="lg" className="mb-3">
        <SplitButton
          variant="outline-secondary"
          title={title}
          id="segmented-button-dropdown-1"
        >
          <ListGroup className={styles['list-group']} variant="flush">
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
