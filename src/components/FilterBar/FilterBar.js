import cyrillicToTranslit from 'cyrillic-to-translit-js'
import React, { useEffect, useState } from 'react'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Form from 'react-bootstrap/Form'
import { useLocation, useNavigate, useParams } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { cats } from '../../configs/cats-config.js'
import SearchToolbar from '../SearchToolbar/SearchToolbar.js'
import styles from './FilterBar.module.css'
import { appendAvalibleParams } from './utils'
const FilterBar = () => {
  const { state } = useLocation()
  const [subCatsList, setSubCatsList] = useState(
    cats.find((cat) => cat.label === state.category.trim())?.subCats
  )
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    setSubCatsList(
      cats.find((cat) => cat.label === state.category.trim())?.subCats
    )
  }, [state.category])

  const handleSubCatSelect = (e) => {
    const cyrillicTranslit = new cyrillicToTranslit()
    const category = cyrillicTranslit
      .transform(state.category.replaceAll(', ', ' '), '-')
      .toLowerCase()
    const subCategory = cyrillicTranslit
      .transform(e.target.value.replaceAll(', ', ' '), '-')
      .toLowerCase()

    const path = appendAvalibleParams(
      `/products/${category}/${subCategory}`,
      searchParams
    )
    navigate(path, {
      state: {
        ...state,
        category: state.category,
        subCategory: e.target.value,
      },
    })
  }

  const handleCatSelect = (e) => {
    const cyrillicTranslit = new cyrillicToTranslit()
    const category = cyrillicTranslit
      .transform(e.target.value.replaceAll(', ', ' '), '-')
      .toLowerCase()
    const path = appendAvalibleParams(`/products/${category}/all`, searchParams)
    navigate(path, {
      state: { ...state, category: e.target.value, subCategory: 'all' },
    })
  }

  const handleLocatSearch = (e) => {
    const cyrillicTranslit = new cyrillicToTranslit()
    const city = cyrillicTranslit
      .transform(e.target.name.split(', ')[1].trim(), '-')
      .toLowerCase()
    searchParams.get('city')
      ? searchParams.set('city', city)
      : searchParams.append('city', city)

    setSearchParams(searchParams, {
      state: {
        ...state,
        category: state.category || 'all',
        subCategory: state.subCategory || 'all',
      },
    })
  }

  const handlePriceInput = (e) => {
    const inputName = e.target.name

    if (!e.target.value) {
      searchParams.delete([inputName])
      setSearchParams(searchParams, {
        state: { ...state },
      })
      return
    }

    searchParams.get([inputName])
      ? searchParams.set([inputName], e.target.value)
      : searchParams.append([inputName], e.target.value)
    setSearchParams(searchParams, {
      state: { ...state, [inputName]: e.target.value },
    })
  }

  const handleDeliveryChange = (e) => {
    const value = e.target.value === 'Виж всички' ? 'all' : e.target.value
    searchParams.get('deliveryCondition')
      ? searchParams.set('deliveryCondition', value)
      : searchParams.append('deliveryCondition', value)

    setSearchParams(searchParams, {
      state: { ...state, deliveryCondition: e.target.value },
    })
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
            value={state.category}
            size="lg"
          >
            <>
              {state.category === 'all' && <option>Всички</option>}
              {cats.map((cat) => (
                <option key={cat.label} value={cat.label}>
                  {cat.label}
                </option>
              ))}
            </>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Всички категории</Form.Label>
          <Form.Control
            onChange={handleSubCatSelect}
            as="select"
            value={state.subCategory}
            size="lg"
          >
            <>
              {state.subCategory === 'all' && <option>Всички</option>}
              {subCatsList?.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </>
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
          <Form.Control
            value={state.deliveryCondition}
            onChange={handleDeliveryChange}
            as="select"
            size="lg"
          >
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
