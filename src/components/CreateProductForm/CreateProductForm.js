import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import InputGroup from 'react-bootstrap/InputGroup'
import ListGroup from 'react-bootstrap/ListGroup'
import SplitButton from 'react-bootstrap/SplitButton'
import CategorySelect from '../../components/CreateProductForm/CategorySelect/CategorySelect.js'
import ContactInfo from '../../components/CreateProductForm/ContactInfo/ContactInfo.js'
import Description from '../../components/CreateProductForm/Description/Description.js'
import ImagesUpload from '../../components/CreateProductForm/ImagesUpload/ImagesUpload.js'
import Price from '../../components/CreateProductForm/Price/Price.js'
import NestedSelect from '../../components/NestedSelect/NestedSelect.js'
import SubItemsPopover from '../../components/SubItemsPopover/SubItemsPopover.js'
import { cats } from '../../configs/cats-config.js'
import { createAd } from '../../services/ad.js'
import { deleteImages, uploadImage } from '../../services/uploadImg.js'
import styles from './CreateProductForm.module.css'
const CreateProductForm = () => {
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
    <Container onClick={handleOutsideClick} fluid className={styles['add-ad']}>
      <h1 className={styles['add-ad-title']}>Добави обява</h1>
      <CategorySelect
        showSubCats={showSubCats}
        createAdData={createAdData}
        category={category}
        showPopOver={showPopOver}
        target={target}
        onSubCatClick={onSubCatClick}
        onInput={onInput}
      />
      <ImagesUpload images={images} imagesSelect={imagesSelect} />
      <Description onInput={onInput} createAdData={createAdData} />
      <Price
        onInput={onInput}
        setCreateAdData={setCreateAdData}
        createAdData={createAdData}
      />
      <ContactInfo onInput={onInput} createAdData={createAdData} />
      <Container className="d-flex justify-content-end">
        <Button onClick={handleSubmit} variant="dark" type="submit">
          Добави обява
        </Button>
      </Container>
    </Container>
  )
}

export default CreateProductForm
