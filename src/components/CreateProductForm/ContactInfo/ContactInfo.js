import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { cities } from '../../../common/cities.js'
import NestedSelect from '../../NestedSelect/NestedSelect.js'
import styles from './ContactInfo.module.css'

const ContactInfo = (props) => {
  const { onInput, createAdData } = props
  const [regions, setRegions] = useState([])
  const [citiesInRegion, setCitiesInRegion] = useState([])
  const [region, setRegion] = useState('')
  const [show, setShow] = useState(false)
  const [target, setTarget] = useState(undefined)
  const [value, setValue] = useState('')

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
    setRegion(selectedRegion)
    setShow(true)
    setTarget(e.target)
    setValue(selectedRegion)
  }

  const onCityClick = (e) => {
    e.preventDefault()
    setValue((prev) => `${prev}, ${e.target.innerText}`)
    setShow(false)
  }

  return (
    <Container className={styles['contacts']}>
      <h4>Данни за контакт</h4>
      <Form.Label htmlFor="basic-url">Локация*</Form.Label>
      <NestedSelect
        title={'Избери локация'}
        items={regions}
        showSubItem={showCities}
        icon={false}
        value={value}
        subItems={citiesInRegion}
        labelText={region}
        show={show}
        target={target}
        onSubItemClick={onCityClick}
      />
      <Form.Label htmlFor="basic-url">Лице за контакт*</Form.Label>
      <InputGroup size="lg" className={`mb-1 ${styles['contact-input']}`}>
        <Form.Control
          value={createAdData.contact_person}
          data-name="contact_person"
          onChange={onInput}
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <Form.Label htmlFor="basic-url">Имейл адрес</Form.Label>
      <InputGroup size="lg" className={`mb-1 ${styles['contact-input']}`}>
        <Form.Control
          value={createAdData.email}
          data-name="email"
          onChange={onInput}
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <Form.Label htmlFor="basic-url">Телефонен номер</Form.Label>
      <InputGroup size="lg" className={`mb-1 ${styles['contact-input']}`}>
        <Form.Control
          value={createAdData.phone}
          data-name="phone"
          onChange={onInput}
          aria-describedby="basic-addon1"
        />
      </InputGroup>
    </Container>
  )
}

export default ContactInfo
