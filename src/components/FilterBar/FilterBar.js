import cyrillicToTranslit from 'cyrillic-to-translit-js'
import React, { useEffect, useState } from 'react'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Form from 'react-bootstrap/Form'
import { useNavigate, useParams } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import SearchToolbar from '../SearchToolbar/SearchToolbar.js'
import styles from './FilterBar.module.css'

const FilterBar = (props) => {
  const { cat, currentSubCat } = props
  const [subCat, setSubCat] = useState(currentSubCat)
  const params = useParams()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchParamsOptions] = useState({
    state: { category: cat.label },
    replace: false,
  })

  const handleCatSelect = (e) => {
    const cyrillicTranslit = new cyrillicToTranslit()
    const subCategory = cyrillicTranslit
      .transform(e.target.value.replace(', ', ' '), '-')
      .toLowerCase()
    setSubCat(e.target.value)
    const path = `/products/${params.category}/${subCategory}`
    navigate(path, searchParamsOptions)
  }

  const handleLocatSearch = (e) => {
    const cyrillicTranslit = new cyrillicToTranslit()
    const city = cyrillicTranslit
      .transform(e.target.name.split(', ')[1].trim(), '-')
      .toLowerCase()
    searchParams.get('city')
      ? searchParams.set('city', city)
      : searchParams.append('city', city)
    setSearchParams(searchParams, searchParamsOptions)
  }

  const handlePriceInput = (e) => {
    const inputName = e.target.name
    searchParams.get([inputName])
      ? searchParams.set([inputName], e.target.value)
      : searchParams.append([inputName], e.target.value)
    setSearchParams(searchParams, searchParamsOptions)
  }

  const handleDeliveryChange = (e) => {
    searchParams.get('deliveryCondition')
      ? searchParams.set('deliveryCondition', e.target.value)
      : searchParams.append('deliveryCondition', e.target.value)
    setSearchParams(searchParams, searchParamsOptions)
  }
  return (
    <>
      <SearchToolbar locationSearch={handleLocatSearch} />
      <ButtonToolbar
        className={`justify-content-md-center d-flex align-items-end ${styles['tb-pd']} ${styles['tb-fw']} ${styles['tb-bgr']}`}
      >
        <Form.Group>
          <Form.Label>Категория</Form.Label>
          <Form.Control
            onChange={handleCatSelect}
            as="select"
            value={subCat}
            size="lg"
          >
            {cat?.subCats.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Цена</Form.Label>
          <Form.Control
            name="priceFrom"
            onBlur={handlePriceInput}
            required
            type="number"
            placeholder="От"
            size="lg"
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            name="priceTo"
            onBlur={handlePriceInput}
            className="align-middle"
            required
            type="number"
            placeholder="До"
            size="lg"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Доставката се поема от</Form.Label>
          <Form.Control onChange={handleDeliveryChange} as="select" size="lg">
            <option>Виж всички</option>
            <option>продавача</option>
            <option>купувача</option>
            <option>лично предаване</option>
          </Form.Control>
        </Form.Group>
      </ButtonToolbar>
    </>
  )
}

export default FilterBar
