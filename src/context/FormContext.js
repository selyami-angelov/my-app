import { createContext, useState } from 'react'

const INITIAL_FORM_VALUES = {
  category: '',
  contact_person: '',
  delivery: '',
  description: '',
  email: '',
  images: [],
  location: '',
  phone: '',
  price: 0,
  currency: 'лв',
  title: '',
}

export const FormContext = createContext(INITIAL_FORM_VALUES)

export const FormContextProvider = ({ children }) => {
  const [state, setState] = useState(INITIAL_FORM_VALUES)

  return (
    <FormContext.Provider value={{ formData: state, setFormData: setState }}>
      {children}
    </FormContext.Provider>
  )
}
