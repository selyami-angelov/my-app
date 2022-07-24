import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import styles from './ImagesUpload.module.css'

export const ImagesUpload = (props) => {
const {images,imagesSelect} = props


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
            onChange={imagesSelect}
            type="file"
            multiple
            size="lg"
          />
        </Form.Group>
    </Container>
  )
}


export default ImagesUpload