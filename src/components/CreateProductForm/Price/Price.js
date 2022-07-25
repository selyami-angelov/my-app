import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { formValidationSchema } from '../../../common/schemas.js'
import { FormContext } from '../../../context/FormContext.js'
import { FormErrorsContext } from '../../../context/FormErrorsContext.js'
import { onInput, validateForm } from '../utils.js'
import styles from './Price.module.css'

const Price = () => {
  const { formData, setFormData } = useContext(FormContext)
  const { formErrors, setFormErrors } = useContext(FormErrorsContext)

  const validateOnBlur = (e) => {
    validateForm(formData, setFormErrors, formValidationSchema, e.target.name)
  }
  const setDeliveryCondition = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.dataset.name,
    }))
  }

  return (
    <Container className={styles['price-section']}>
      <Form.Label htmlFor="basic-url">Цена*</Form.Label>
      <InputGroup className="mb-1">
        <Form.Control
          onChange={(e) => onInput(e, setFormData)}
          onBlur={validateOnBlur}
          value={formData.price}
          data-name="price"
          name="price"
          isInvalid={formErrors.price}
        />
        <Form.Control.Feedback type="invalid">
          {formErrors.price}
        </Form.Control.Feedback>
        <Form.Select
          data-name="currency"
          onChange={(e) => onInput(e, setFormData)}
          size="lg"
        >
          <option>лв</option>
          <option>eur</option>
        </Form.Select>
      </InputGroup>
      <div key={'inline-radio'} className="mb-3">
        <h5>Доставката се поема от</h5>
        <Form.Check
          onChange={setDeliveryCondition}
          checked={formData.delivery === 'купувача'}
          inline
          data-name="купувача"
          label="купувача"
          name="delivery"
          type="radio"
          id={'inline-radio-1'}
        />
        <Form.Check
          onChange={setDeliveryCondition}
          checked={formData.delivery === 'продавача'}
          inline
          data-name="продавача"
          label="продавача"
          name="delivery"
          type="radio"
          id={'inline-radio-2'}
        />
        <Form.Check
          onChange={setDeliveryCondition}
          checked={formData.delivery === 'лично предаване'}
          inline
          data-name="лично предаване"
          label="лично предаване"
          name="delivery"
          type="radio"
          id={'inline-radio-3'}
        />
      </div>
    </Container>
  )
}

export default Price
