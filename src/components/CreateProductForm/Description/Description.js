import React from 'react'
import { Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import styles from './Description.module.css'

const Description = (props) => {
  const { onInput, createAdData } = props

  return (
    <Container className={styles['description-section']}>
      <Form.Label htmlFor="basic-url">Описание*</Form.Label>
      <InputGroup size="lg">
        <Form.Control
          data-name="description"
          onChange={onInput}
          value={createAdData.description}
          placeholder="Напиши това, което ти се иска да прочетеш, ако ти гледаше тази обява"
          as="textarea"
        />
      </InputGroup>
    </Container>
  )
}

export default Description
