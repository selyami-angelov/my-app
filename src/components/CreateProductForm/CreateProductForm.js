import React, { useContext, useEffect, useState } from 'react'
import cyrillicToTranslit from 'cyrillic-to-translit-js'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { useNavigate, useParams } from 'react-router'
import { formValidationSchema } from '../../common/schemas.js'
import CategorySelect from '../../components/CreateProductForm/CategorySelect/CategorySelect.js'
import ContactInfo from '../../components/CreateProductForm/ContactInfo/ContactInfo.js'
import Description from '../../components/CreateProductForm/Description/Description.js'
import ImagesUpload from '../../components/CreateProductForm/ImagesUpload/ImagesUpload.js'
import Price from '../../components/CreateProductForm/Price/Price.js'
import { AuthContext } from '../../context/AuthContext.js'
import { FormContext } from '../../context/FormContext.js'
import { FormErrorsContext } from '../../context/FormErrorsContext.js'
import { createAd, getAd, updateProduct } from '../../services/ad.js'
import { deleteImages, uploadImg } from '../../services/uploadImg.js'
import styles from './CreateProductForm.module.css'
import { INITIAL_FORM_VALUES, validateForm } from './utils.js'

const CreateProductForm = () => {
  const { productId } = useParams()
  const [images, setImages] = useState(new Array(8).fill(undefined))
  const [editProduct, setEditProduct] = useState({})
  const [editMode, setEditMode] = useState(productId ? true : false)
  const { formData, setFormData } = useContext(FormContext)
  const { formErrors, setFormErrors } = useContext(FormErrorsContext)
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  //set form if edit mode
  useEffect(() => {
    if (productId) {
      getAd(productId).then((result) => {
        setFormData(result)
        setImages(result.images.map((img) => ({ img: '', url: img.url })))
        setEditProduct(result)
      })
    }
  }, [productId])

  const handleSubmit = async () => {
    const form = { ...formData }

    //upload images
    if (images.some((img) => img)) {
      try {
        for (const img of images) {
          const result = await uploadImg(img?.img)
          form.images.push(result)
        }
      } catch (error) {
        console.log(error, 'error')
        return
      }
    }

    const isValid = await validateForm(
      form,
      setFormErrors,
      formValidationSchema
    )

    if (isValid) {
      const cyrillic = new cyrillicToTranslit()
      createAd({
        ...form,
        userId: currentUser.uid,
        created_date: new Date().getTime(),
        category: cyrillic.transform(formData.category, '-').toLowerCase(),
        sub_category: cyrillic
          .transform(formData.subCategory.replace(', ', ' '), '-')
          .toLowerCase(),
      })

      setFormData(INITIAL_FORM_VALUES)
      navigate('/')
    }
  }

  const handleImagesSelect = (e) => {
    setImages(
      Array.from(e.target.files).map((img) => ({
        img: img,
        url: URL.createObjectURL(img),
      }))
    )

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
  }

  const handleEdit = async (e) => {
    const form = { ...editProduct, ...formData }

    //upload images if new ones
    if (images.some((value) => value.img !== '')) {
      deleteImages(editProduct.images)
      form.images = []
      try {
        for (const img of images) {
          const result = await uploadImg(img.img)
          form.images.push(result)
        }
      } catch (error) {
        console.log(error, 'error')
        return
      }
    }

    const isValid = await validateForm(
      form,
      setFormErrors,
      formValidationSchema
    )

    if (isValid) {
      updateProduct(productId, {
        ...form,
        userId: currentUser.uid,
        created_date: new Date().getTime(),
      })

      setFormData(INITIAL_FORM_VALUES)
      navigate('/')
    }
  }

  return (
    <Container fluid className={styles['add-ad']}>
      <h1 className={styles['add-ad-title']}>Добави обява</h1>
      <CategorySelect />
      <ImagesUpload handleImagesSelect={handleImagesSelect} images={images} />
      <Description />
      <Price />
      <ContactInfo />
      <Container className="d-flex justify-content-end">
        <Button
          onClick={editMode ? handleEdit : handleSubmit}
          variant="dark"
          type="submit"
        >
          {editMode ? 'Редактирай' : 'Добави обява'}
        </Button>
      </Container>
    </Container>
  )
}

export default CreateProductForm
