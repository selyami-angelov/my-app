import { nanoid } from 'nanoid'
import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import { useParams } from 'react-router'
import { formValidationSchema } from '../../../common/schemas.js'
import { FormContext } from '../../../context/FormContext.js'
import { FormErrorsContext } from '../../../context/FormErrorsContext.js'
import styles from './ImagesUpload.module.css'

export const ImagesUpload = (props) => {
  const { images, handleImagesSelect } = props
  const { formData, setFormData } = useContext(FormContext)
  const { formErrors, setFormErrors } = useContext(FormErrorsContext)

  return (
    <Container className={styles['add-image-section']}>
      <h4 className={styles['title']}>Снимки</h4>
      <label className={styles['label']}>
        Първата снимка ще бъде основната в обявата ти.
      </label>
      <div className={`${styles['imgs-row']} d-flex flex-row`}>
        {images.map((img, index) => (
          <div key={index} className={styles['col']}>
            <Image
              className={styles['ad-imgs']}
              rounded
              thumbnail
              src={img?.url}
            />
          </div>
        ))}
      </div>
      <Form.Group controlId="formFileLg" className="mb-3">
        <Form.Control
          className="mt-3"
          isInvalid={formErrors.images}
          onChange={handleImagesSelect}
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
