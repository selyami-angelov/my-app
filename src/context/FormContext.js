import { createContext, useState } from 'react'
import { INITIAL_FORM_VALUES } from '../components/CreateProductForm/utils.js'

export const FormContext = createContext(INITIAL_FORM_VALUES)

export const FormContextProvider = ({ children }) => {
  const [state, setState] = useState(INITIAL_FORM_VALUES)
  return (
    <FormContext.Provider value={{ formData: state, setFormData: setState }}>
      {children}
    </FormContext.Provider>
  )
}
