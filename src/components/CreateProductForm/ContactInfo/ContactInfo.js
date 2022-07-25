import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { cities } from '../../../common/cities.js'
import { formValidationSchema } from '../../../common/schemas.js'
import { AuthContext } from '../../../context/AuthContext.js'
import { FormContext } from '../../../context/FormContext.js'
import { FormErrorsContext } from '../../../context/FormErrorsContext.js'
import NestedSelect from '../../NestedSelect/NestedSelect.js'
import { onInput, validateForm } from '../utils.js'
import styles from './ContactInfo.module.css'

const ContactInfo = () => {
  const [regions, setRegions] = useState([])
  const [citiesInRegion, setCitiesInRegion] = useState([])
  const [popOver, setPopOver] = useState({
    taget: undefined,
    show: false,
  })
  const { currentUser } = useContext(AuthContext)
  const { formData, setFormData } = useContext(FormContext)
  const { formErrors, setFormErrors } = useContext(FormErrorsContext)

  const validateOnBlur = (e) => {
    validateForm(formData, setFormErrors, formValidationSchema, e.target.name)
  }

  useEffect(() => {
    const regions = Array.from(
      new Set(cities.map((city) => city.admin_name))
    ).map((city) => ({
      label: city,
    }))

    setRegions(regions)
  }, [])

  const showCities = (e) => {
    const selectedRegion = e.target.innerText
    const citiesInRegion = cities
      .filter((city) => city.admin_name === selectedRegion)
      .map((city) => city.city)
    setCitiesInRegion(citiesInRegion)
    setFormData((prev) => ({ ...prev, region: selectedRegion }))
    setPopOver({ target: e.target, show: true })
  }

  const onCityClick = (e) => {
    e.preventDefault()
    setFormData((prev) => ({ ...prev, city: e.target.innerText }))
    setFormErrors((prev) => ({ ...prev, city: undefined }))

    setPopOver({ target: undefined, show: false })
  }

  return (
    <Container className={styles['contacts']}>
      <h4>Данни за контакт</h4>
      <Form.Label htmlFor="basic-url">Локация*</Form.Label>
      <NestedSelect
        title={'Избери локация'}
        name={'city'}
        items={regions}
        showSubItem={showCities}
        icon={false}
        value={`${formData.region} ${formData.city && '/ ' + formData.city}`}
        subItems={citiesInRegion}
        labelText={formData.region}
        show={popOver.show}
        target={popOver.target}
        onSubItemClick={onCityClick}
      />
      <Form.Label htmlFor="basic-url">Лице за контакт*</Form.Label>
      <InputGroup size="lg" className={`mb-1 ${styles['contact-input']}`}>
        <Form.Control
          value={formData.contact_person}
          name="contact_person"
          data-name="contact_person"
          onChange={(e) => onInput(e, setFormData)}
          onBlur={validateOnBlur}
          aria-describedby="basic-addon1"
          isInvalid={formErrors.contact_person}
        />
        <Form.Control.Feedback type="invalid">
          {formErrors.contact_person}
        </Form.Control.Feedback>
      </InputGroup>
      <Form.Label htmlFor="basic-url">Имейл адрес</Form.Label>
      <InputGroup size="lg" className={`mb-1 ${styles['contact-input']}`}>
        <Form.Control
          disabled={true}
          value={currentUser.email}
          name="email"
          data-name="email"
          onChange={(e) => onInput(e, setFormData)}
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <Form.Label htmlFor="basic-url">Телефонен номер</Form.Label>
      <InputGroup size="lg" className={`mb-1 ${styles['contact-input']}`}>
        <Form.Control
          value={formData.phone}
          name="phone"
          data-name="phone"
          onChange={(e) => onInput(e, setFormData)}
          onBlur={validateOnBlur}
          aria-describedby="basic-addon1"
          isInvalid={formErrors.phone}
        />
        <Form.Control.Feedback type="invalid">
          {formErrors.phone}
        </Form.Control.Feedback>
      </InputGroup>
    </Container>
  )
}

export default ContactInfo
