import { createContext, useState } from 'react'

const INITIAL_FORM_ERRORS = {
  category: undefined,
  contact_person: undefined,
  delivery: undefined,
  description: undefined,
  email: undefined,
  images: undefined,
  location: undefined,
  phone: undefined,
  price: undefined,
  currency: undefined,
  title: undefined,
}

export const FormContext = createContext(INITIAL_FORM_ERRORS)

export const FormContextProvider = ({ children }) => {
  const [state, setState] = useState(INITIAL_FORM_ERRORS)

  return (
    <FormErrorsContext.Provider
      value={{ formErrors: state, setFormErrors: setState }}
    >
      {children}
    </FormErrorsContext.Provider>
  )
}
