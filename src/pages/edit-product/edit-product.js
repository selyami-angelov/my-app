import { useContext, useEffect } from 'react'
import { useParams } from 'react-router'
import CreateProductForm from '../../components/CreateProductForm/CreateProductForm.js'
import { FormContext, FormContextProvider } from '../../context/FormContext.js'
import {
  FormErrorsContext,
  FormErrorsContextProvider,
} from '../../context/FormErrorsContext.js'
import { getAd } from '../../services/ad.js'

const EditProduct = () => {
  return <CreateProductForm />
}

export default EditProduct
