import CreateProductForm from '../../components/CreateProductForm/CreateProductForm'
import { FormContextProvider } from '../../context/FormContext.js'
import { FormErrorsContextProvider } from '../../context/FormErrorsContext.js'

const CreateProduct = () => {
  return (
    <FormErrorsContextProvider>
      <FormContextProvider>
        <CreateProductForm />
      </FormContextProvider>
    </FormErrorsContextProvider>
  )
}

export default CreateProduct
