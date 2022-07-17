import React, { useEffect, useState } from 'react'
import { Container, InputGroup } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Form from 'react-bootstrap/Form'
import { cities } from '../../common/cities.js'
import NestedSelect from '../NestedSelect/NestedSelect.js'
import styles from './ButtonToolbar.module.css'

const SearchToolbar = () => {
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
  const handleOutsideClick = (e) => {
    e.target.className !== 'list-group-item' && setShow(false)
  }

  return (
    <ButtonToolbar
      onClick={handleOutsideClick}
      className={`justify-content-md-center ${styles['tb-pd']} ${styles['tb-fw']} ${styles['tb-bgr']}`}
    >
      <InputGroup size="lg" className="mb-3 d-flex align-items-baseline">
        <Form.Control
          type="search"
          placeholder="141123 обяви близо до теб"
          className={`me-2 ${styles['input']}`}
          aria-label="Search"
        />
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
        <Button variant="dark">Търсене</Button>
      </InputGroup>
    </ButtonToolbar>
  )
}

export default SearchToolbar
