import React, { useContext, useState } from 'react'
import { Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { cats } from '../../../configs/cats-config.js'
import { FormContext } from '../../../context/FormContext.js'
import NestedSelect from '../../NestedSelect/NestedSelect.js'
import { onInput } from '../utils.js'
import styles from './CategorySelect.module.css'

const CategorySelect = (props) => {
  const {
    showSubCats,
    createAdData,
    category,
    showPopOver,
    target,
    onSubCatClick,
  } = props

  const { formData, setFormData } = useContext(FormContext)

  return (
    <Container className={styles['ad-cat']}>
      <Form.Label>Заглавие*</Form.Label>
      <InputGroup size="lg">
        <Form.Control
          value={formData.title}
          name="title"
          data-name="title"
          onChange={(e) => onInput(e, setFormData)}
        />
        <Form.Control.Feedback type="invalid">
          Полето е задължително
        </Form.Control.Feedback>
      </InputGroup>
      <br />
      <Form.Label htmlFor="basic-url">Категория*</Form.Label>
      <NestedSelect
        title={'Избери Категория'}
        items={cats}
        showSubItem={showSubCats}
        icon={true}
        value={createAdData.category}
        subItems={category?.subCats}
        labelText={createAdData.category}
        show={showPopOver}
        target={target}
        onSubItemClick={onSubCatClick}
      />
    </Container>
  )
}

export default CategorySelect
