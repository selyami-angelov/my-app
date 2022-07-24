import React from 'react'
import { Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { cats } from '../../../configs/cats-config.js'
import NestedSelect from '../../NestedSelect/NestedSelect.js'
import styles from './CategorySelect.module.css'

const CategorySelect = (props) => {
  const {
    onInput,
    showSubCats,
    createAdData,
    category,
    showPopOver,
    target,
    onSubCatClick,
  } = props

  return (
    <Container className={styles['ad-cat']}>
      <Form.Label htmlFor="basic-url">Заглавие*</Form.Label>
      <InputGroup size="lg">
        <Form.Control
          value={createAdData.title}
          data-name="title"
          onChange={onInput}
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
        />
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
