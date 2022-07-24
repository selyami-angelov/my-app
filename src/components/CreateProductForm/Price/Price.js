import React from 'react'
import { Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import styles from './Price.module.css'

const Price = (props) => {
  const { onInput, setCreateAdData, createAdData } = props

  const handleDeliveryCond = (e) => {
    setCreateAdData((prev) => ({
      ...prev,
      [e.target.name]: e.target.dataset.name,
    }))
  }

  return (
    <Container className={styles['price-section']}>
      <Form.Label htmlFor="basic-url">Цена*</Form.Label>
      <InputGroup className="mb-1">
        <Form.Control
          onChange={onInput}
          value={createAdData.price}
          data-name="price"
        />
        <Form.Select data-name="currency" onChange={onInput} size="lg">
          <option>лв</option>
          <option>eur</option>
        </Form.Select>
      </InputGroup>
      <div key={'inline-radio'} className="mb-3">
        <h5>Доставката се поема от</h5>
        <Form.Check
          onChange={handleDeliveryCond}
          checked={createAdData.delivery === 'купувача'}
          inline
          data-name="купувача"
          label="купувача"
          name="delivery"
          type="radio"
          id={'inline-radio-1'}
        />
        <Form.Check
          onChange={handleDeliveryCond}
          checked={createAdData.delivery === 'продавача'}
          inline
          data-name="продавача"
          label="продавача"
          name="delivery"
          type="radio"
          id={'inline-radio-2'}
        />
        <Form.Check
          onChange={handleDeliveryCond}
          checked={createAdData.delivery === 'лично предаване'}
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
