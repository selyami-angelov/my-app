import React, { useContext, useState } from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router'
import { formValidationSchema } from '../../common/schemas.js'
import CategorySelect from '../../components/CreateProductForm/CategorySelect/CategorySelect.js'
import ContactInfo from '../../components/CreateProductForm/ContactInfo/ContactInfo.js'
import Description from '../../components/CreateProductForm/Description/Description.js'
import ImagesUpload from '../../components/CreateProductForm/ImagesUpload/ImagesUpload.js'
import Price from '../../components/CreateProductForm/Price/Price.js'
import { AuthContext } from '../../context/AuthContext.js'
import { FormContext } from '../../context/FormContext.js'
import { FormErrorsContext } from '../../context/FormErrorsContext.js'
import { createAd } from '../../services/ad.js'
import styles from './CreateProductForm.module.css'
import { INITIAL_FORM_VALUES, validateForm } from './utils.js'

const CreateProductForm = () => {
  const { formData, setFormData } = useContext(FormContext)
  const { formErrors, setFormErrors } = useContext(FormErrorsContext)
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    const isValid = await validateForm(
      formData,
      setFormErrors,
      formValidationSchema
    )

    if (isValid) {
      createAd({
        ...formData,
        userId: currentUser.uid,
        createdDate: new Date().getTime(),
      })
      setFormData(INITIAL_FORM_VALUES)
      navigate('/')
    }
  }

  return (
    <Container fluid className={styles['add-ad']}>
      <h1 className={styles['add-ad-title']}>Добави обява</h1>
      <CategorySelect />
      <ImagesUpload />
      <Description />
      <Price />
      <ContactInfo />
      <Container className="d-flex justify-content-end">
        <Button onClick={handleSubmit} variant="dark" type="submit">
          Добави обява
        </Button>
      </Container>
    </Container>
  )
}

export default CreateProductForm
