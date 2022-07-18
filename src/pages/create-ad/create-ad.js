import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import InputGroup from 'react-bootstrap/InputGroup'
import ListGroup from 'react-bootstrap/ListGroup'
import SplitButton from 'react-bootstrap/SplitButton'
import NestedSelect from '../../components/NestedSelect/NestedSelect.js'
import SubItemsPopover from '../../components/SubItemsPopover/SubItemsPopover.js'
import { cats } from '../../configs/cats-config.js'
import { createAd } from '../../services/ad.js'
import { deleteImages, uploadImage } from '../../services/uploadImg.js'
import styles from './create-ad.module.css'

const AddAd = (props) => {
  const [showPopOver, setShowPopOver] = useState(false)
  const [target, setTarget] = useState(null)
  const [images, setImages] = useState(new Array(8).fill(undefined))
  const [createAdData, setCreateAdData] = useState({
    category: '',
    contact_person: '',
    delivery: '',
    description: '',
    email: '',
    images: [],
    location: '',
    phone: '',
    price: 123,
    currency: '',
    title: '',
  })

  const [category, setCategory] = useState([])

  const showSubCats = (e) => {
    const labelText = target?.innerText
    const currentLabelText = e.target?.innerText

    if (currentLabelText !== labelText) {
      const cat = cats.find(
        (cat) => cat.label.trim() === currentLabelText.trim()
      )
      setShowPopOver(true)
      setCategory(cat)
    } else {
      setShowPopOver(!showPopOver)
    }

    setTarget(e.target)
  }

  const imagesSelect = (e) => {
    if (createAdData.images?.length) {
      deleteImages(createAdData.images)
      setCreateAdData((prev) => ({ ...prev, images: [] }))
    }

    setImages(Array.from(e.target.files))
    uploadImage(Array.from(e.target.files), setCreateAdData)
  }

  const handleSubmit = () => {
    createAd(createAdData)
    setCreateAdData({
      category: '',
      contact_person: '',
      delivery: '',
      description: '',
      email: '',
      images: [],
      location: '',
      phone: '',
      price: 123,
      currency: '',
      title: '',
    })
  }

  const onInput = (e) => {
    const inputName = e.target.dataset.name

    setCreateAdData({ ...createAdData, [inputName]: e.target.value })
  }

  const onSubCatClick = (e) => {
    const catName = category.label
    const subCatName = e.target.innerText
    setCreateAdData({ ...createAdData, category: `${catName}/ ${subCatName}` })
    setShowPopOver(false)
  }

  const handleOutsideClick = (e) => {
    e.target.className !== 'list-group-item' && setShowPopOver(false)
  }

  return (
    <>
      <Container
        onClick={handleOutsideClick}
        fluid
        className={styles['add-ad']}
      >
        <h1 className={styles['add-ad-title']}>Добави обява</h1>
        <Container className={styles['ad-cat']}>
          <Container>
            <Form.Label htmlFor="basic-url">Заглавие*</Form.Label>
            <InputGroup size="lg">
              <Form.Control
                data-name="title"
                onChange={onInput}
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
              />
            </InputGroup>
            <br />
            <Form.Label htmlFor="basic-url">Категория*</Form.Label>
            <NestedSelect
              title={'Избери Категория'}
              items={cats}
              showSubItem={showSubCats}
              icon={true}
              value={createAdData.category}
              subItems={category?.subCats}
              labelText={createAdData.category}
              show={showPopOver}
              target={target}
              onSubItemClick={onSubCatClick}
            />
          </Container>
        </Container>
        <Container className={styles['add-image-section']}>
          <h4>Снимки</h4>
          <label>Първата снимка ще бъде основната в обявата ти.</label>
          <Container>
            <Row xs="auto" className={`g-2 ${styles['imgs-row']}`}>
              {images.map((img, index) => (
                <Col key={index}>
                  <Image
                    className={styles['ad-imgs']}
                    rounded
                    thumbnail
                    src={img && URL.createObjectURL(img)}
                  />
                </Col>
              ))}
            </Row>
            <Form.Group controlId="formFileLg" className="mb-3">
              <Form.Control
                onChange={imagesSelect}
                type="file"
                multiple
                size="lg"
              />
            </Form.Group>
          </Container>
        </Container>
        <Container className={styles['description-section']}>
          <Container>
            <Form.Label htmlFor="basic-url">Описание*</Form.Label>
            <InputGroup className={styles.description} size="lg">
              <Form.Control
                data-name="description"
                onChange={onInput}
                placeholder="Напиши това, което ти се иска да прочетеш, ако ти гледаше тази обява"
                as="textarea"
                aria-label="With textarea"
              />
            </InputGroup>
          </Container>
        </Container>
        <Container>
          <Container className={styles['price-section']}>
            <Form.Label htmlFor="basic-url">Цена*</Form.Label>
            <InputGroup className="mb-1">
              <Form.Control onChange={onInput} data-name="price" />
              <Form.Select data-name="currency" onChange={onInput} size="lg">
                <option>лв</option>
                <option>eur</option>
              </Form.Select>
            </InputGroup>
            <div key={'inline-radio'} className="mb-3">
              <h5>Доставката се поема от</h5>
              <Form.Check
                onChange={(e) =>
                  setCreateAdData({
                    ...createAdData,
                    [e.target.name]: e.target.dataset.name,
                  })
                }
                inline
                data-name="купувача"
                label="купувача"
                name="delivery"
                type="radio"
                id={'inline-radio-1'}
              />
              <Form.Check
                onChange={(e) =>
                  setCreateAdData({
                    ...createAdData,
                    [e.target.name]: e.target.dataset.name,
                  })
                }
                inline
                data-name="продавача"
                label="продавача"
                name="delivery"
                type="radio"
                id={'inline-radio-2'}
              />
              <Form.Check
                onChange={(e) =>
                  setCreateAdData({
                    ...createAdData,
                    [e.target.name]: e.target.dataset.name,
                  })
                }
                inline
                data-name="лично предаване"
                label="лично предаване"
                name="delivery"
                type="radio"
                id={'inline-radio-3'}
              />
            </div>
          </Container>
        </Container>
        <Container className={styles.contacts}>
          <Container>
            <h4>Данни за контакт</h4>
            <Form.Label htmlFor="basic-url">Локация*</Form.Label>
            <InputGroup size="lg" className={`mb-1 ${styles['contact-input']}`}>
              <Form.Control
                data-name="location"
                onChange={onInput}
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            <Form.Label htmlFor="basic-url">Лице за контакт*</Form.Label>
            <InputGroup size="lg" className={`mb-1 ${styles['contact-input']}`}>
              <Form.Control
                data-name="contact_person"
                onChange={onInput}
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            <Form.Label htmlFor="basic-url">Имейл адрес</Form.Label>
            <InputGroup size="lg" className={`mb-1 ${styles['contact-input']}`}>
              <Form.Control
                data-name="email"
                onChange={onInput}
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            <Form.Label htmlFor="basic-url">Телефонен номер</Form.Label>
            <InputGroup size="lg" className={`mb-1 ${styles['contact-input']}`}>
              <Form.Control
                data-name="phone"
                onChange={onInput}
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </Container>
        </Container>
        <Container className={styles['add-section']}>
          <Container>
            <Button onClick={handleSubmit} variant="dark" type="submit">
              Добави обява
            </Button>
          </Container>
        </Container>
      </Container>
    </>
  )
}

export default AddAd
