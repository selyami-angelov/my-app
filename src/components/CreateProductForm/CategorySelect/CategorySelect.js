import React, { useContext, useState } from 'react'
import { Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { formValidationSchema } from '../../../common/schemas.js'
import { cats } from '../../../configs/cats-config.js'
import { FormContext } from '../../../context/FormContext.js'
import { FormErrorsContext } from '../../../context/FormErrorsContext.js'
import NestedSelect from '../../NestedSelect/NestedSelect.js'
import { onInput, validateForm } from '../utils.js'
import styles from './CategorySelect.module.css'

const CategorySelect = () => {
  const [selectedCategory, setCategory] = useState([])
  const [popOver, setPopOver] = useState({
    taget: undefined,
    show: false,
  })
  const { formData, setFormData } = useContext(FormContext)
  const { formErrors, setFormErrors } = useContext(FormErrorsContext)
  const validateOnBlur = (e) => {
    validateForm(formData, setFormErrors, formValidationSchema, e.target.name)
  }

  const onCatClick = (e) => {
    const labelText = formData?.category
    const currentLabelText = e.target?.innerText

    if (currentLabelText !== labelText) {
      const selectedCategory = cats.find(
        (cat) => cat.label.trim() === currentLabelText.trim()
      )
      setPopOver({ target: e.target, show: true })
      setCategory(selectedCategory)
      console.log('in if')
    } else {
      setPopOver((prev) => ({ target: e.target, show: !prev.show }))
    }

    setFormData((prev) => ({ ...prev, category: currentLabelText }))
  }

  const onSubCatClick = (e) => {
    const subCatName = e.target.innerText
    setFormData((prev) => ({ ...prev, subCategory: subCatName }))
    setFormErrors((prev) => ({ ...prev, category: undefined }))
    setPopOver({ target: undefined, show: false })
  }

  return (
    <Container className={styles['ad-cat']}>
      <Form.Label>Заглавие*</Form.Label>
      <InputGroup size="lg">
        <Form.Control
          value={formData.title}
          name="title"
          data-name="title"
          onChange={(e) => onInput(e, setFormData)}
          onBlur={validateOnBlur}
          isInvalid={formErrors.title}
        />
        <Form.Control.Feedback type="invalid">
          {formErrors.title}
        </Form.Control.Feedback>
      </InputGroup>
      <br />
      <Form.Label htmlFor="basic-url">Категория*</Form.Label>
      <NestedSelect
        title={'Избери Категория'}
        name={'category'}
        items={cats}
        subItems={selectedCategory?.subCats}
        show={popOver.show}
        showSubItem={onCatClick}
        icon={true}
        value={`${formData.category} ${
          formData.subCategory && '/ ' + formData.subCategory
        }`}
        labelText={selectedCategory.label}
        target={popOver.target}
        onSubItemClick={onSubCatClick}
      />
    </Container>
  )
}

export default CategorySelect
