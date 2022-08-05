import { object, string, number, array, reach } from 'yup'

export const INITIAL_FORM_VALUES = {
  category: '',
  sub_category: '',
  contact_person: '',
  delivery: 'купувача',
  description: '',
  images: [],
  region: '',
  city: '',
  phone: '',
  price: '',
  currency: 'лв',
  title: '',
}

export const INITIAL_FORM_ERRORS = {
  category: undefined,
  sub_category: undefined,
  contact_person: undefined,
  delivery: undefined,
  description: undefined,
  email: undefined,
  images: undefined,
  region: undefined,
  city: undefined,
  phone: undefined,
  price: undefined,
  currency: undefined,
  title: undefined,
}

export const onInput = (e, setFormData) => {
  const inputName = e.target.dataset.name
  setFormData((prev) => ({ ...prev, [inputName]: e.target.value }))
}

export const validateForm = async (form, setFormErrors, schema, field) => {
  let isValid = true

  if (field) {
    const fieldSchema = schema[field]
    fieldSchema
      .validate(form[field])
      .then((result) => {
        setFormErrors((prev) => ({ ...prev, [field]: undefined }))
      })
      .catch((err) => {
        const splitErrMessage = err.message.split(',')[0].trim()
        if (splitErrMessage === 'this must be a `number` type') {
          setFormErrors((prev) => ({ ...prev, [field]: 'Въведи валидна цена' }))
          return
        }
        setFormErrors((prev) => ({ ...prev, [field]: err.message }))
      })
    return
  }

  for (const fieldName of Object.keys(schema)) {
    try {
      const result = await schema[fieldName].validate(await form[fieldName])
      setFormErrors((prev) => ({ ...prev, [fieldName]: undefined }))
    } catch (error) {
      isValid = false
      console.log('in catch')
      console.log(fieldName, 'fieldName')
      console.log(error.message, 'error in catch')
      const splitErrMessage = error.message.split(',')[0].trim()
      if (splitErrMessage === 'this must be a `number` type') {
        setFormErrors((prev) => ({
          ...prev,
          [fieldName]: 'Въведи валидна цена',
        }))
        return
      }
      setFormErrors((prev) => ({ ...prev, [fieldName]: error.message }))
    }
  }

  console.log(isValid, 'isvalid')
  return isValid
}
