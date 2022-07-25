import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import { formValidationSchema } from '../../../common/schemas.js'
import { FormContext } from '../../../context/FormContext.js'
import { FormErrorsContext } from '../../../context/FormErrorsContext.js'
import { deleteImages, uploadImages } from '../../../services/uploadImg.js'
import styles from './ImagesUpload.module.css'

export const ImagesUpload = () => {
  const [images, setImages] = useState(new Array(8).fill(undefined))
  const { formData, setFormData } = useContext(FormContext)
  const { formErrors, setFormErrors } = useContext(FormErrorsContext)
  const imagesSelect = (e) => {
    if (formData.images?.length) {
      deleteImages(formData.images)
      setFormData((prev) => ({ ...prev, images: [] }))
    }
    setImages(Array.from(e.target.files))

    if (Array.from(e.target.files).length > 8) {
      setFormErrors((prev) => ({
        ...prev,
        images:
          'Mожем да включим не повече от 8 снимки. Редактирай и избери 8 от най-важните.',
      }))
      return
    }

    setFormErrors((prev) => ({
      ...prev,
      images: undefined,
    }))
    uploadImages(Array.from(e.target.files), setFormData)
  }

  useEffect(() => {
    return () => {
      if (formData.images?.length) {
        deleteImages(formData.images)
      }
    }
  }, [])

  return (
    <Container className={styles['add-image-section']}>
      <h4>Снимки</h4>
      <label>Първата снимка ще бъде основната в обявата ти.</label>
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
          isInvalid={formErrors.images}
          onChange={imagesSelect}
          type="file"
          multiple
          size="lg"
        />
        <Form.Control.Feedback type="invalid">
          {formErrors.images}
        </Form.Control.Feedback>
      </Form.Group>
    </Container>
  )
}

export default ImagesUpload
