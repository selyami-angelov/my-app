import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { FormContext } from '../../../context/FormContext.js'
import { onInput, validateForm } from '../utils.js'
import styles from './Description.module.css'
import { formValidationSchema } from '../../../common/schemas.js'
import { FormErrorsContext } from '../../../context/FormErrorsContext.js'

const Description = () => {
  const { formData, setFormData } = useContext(FormContext)
  const { formErrors, setFormErrors } = useContext(FormErrorsContext)
  const validateOnBlur = (e) => {
    validateForm(formData, setFormErrors, formValidationSchema, e.target.name)
  }
  return (
    <Container className={styles['description-section']}>
      <Form.Label className={styles['descr-label']} htmlFor="basic-url">
        Описание*
      </Form.Label>
      <InputGroup size="lg">
        <Form.Control
          className={styles['descr-input']}
          name="description"
          data-name="description"
          onChange={(e) => onInput(e, setFormData)}
          onBlur={validateOnBlur}
          value={formData.description}
          placeholder="Напиши това, което ти се иска да прочетеш, ако ти гледаше тази обява"
          as="textarea"
          isInvalid={formErrors.description}
        />
        <Form.Control.Feedback type="invalid">
          {formErrors.description}
        </Form.Control.Feedback>
      </InputGroup>
    </Container>
  )
}

export default Description
