import { createContext, useState } from 'react'
import { INITIAL_FORM_ERRORS } from '../components/CreateProductForm/utils.js'

export const FormErrorsContext = createContext(INITIAL_FORM_ERRORS)

export const FormErrorsContextProvider = ({ children }) => {
  const [state, setState] = useState(INITIAL_FORM_ERRORS)

  return (
    <FormErrorsContext.Provider
      value={{ formErrors: state, setFormErrors: setState }}
    >
      {children}
    </FormErrorsContext.Provider>
  )
}
