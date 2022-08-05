import cyrillicToTranslit from 'cyrillic-to-translit-js'
import React, { useEffect, useState } from 'react'
import { InputGroup } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router'
import { cities } from '../../common/cities.js'
import NestedSelect from '../NestedSelect/NestedSelect.js'
import styles from './SearchToolbar.module.css'

const SearchToolbar = (props) => {
  const { locationSearch } = props
  const [regions, setRegions] = useState([])
  const [citiesInRegion, setCitiesInRegion] = useState([])
  const [region, setRegion] = useState('')
  const [show, setShow] = useState(false)
  const [target, setTarget] = useState(undefined)
  const [value, setValue] = useState('')
  const navigate = useNavigate()

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

  const defaultSearch = (e) => {
    const cyrillicTranslit = new cyrillicToTranslit()
    const city = cyrillicTranslit
      .transform(e.target.name.split(', ')[1].trim(), '-')
      .toLowerCase()

    navigate(`/products/all/all/?city=${city}`, {
      state: { category: 'all', subCategory: 'all' },
    })
  }

  const onCityClick = (e) => {
    e.preventDefault()
    setValue((prev) => `${prev}, ${e.target.innerText}`)
    setShow(false)
  }
  const handleOutsideClick = (e) => {
    e.target.className !== 'list-group-item' && setShow(false)
  }

  const handleSearch = (e) => {
    locationSearch ? locationSearch(e) : defaultSearch(e)
  }

  return (
    <ButtonToolbar
      onClick={handleOutsideClick}
      className={styles['search-bar']}
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
          name={'city'}
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
        <Button
          className={styles['search']}
          name={value}
          onClick={handleSearch}
          variant="outline-dark"
        >
          Търсене
        </Button>
      </InputGroup>
    </ButtonToolbar>
  )
}

export default SearchToolbar
