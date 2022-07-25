import { object, string, number, array } from 'yup'

export const REQUIRED_FIELD = 'Това поле е задължително!'
export const MIN_LEN_DESCRIPTION =
  'Минимум 80 символи. Опиши възможно най-детайлно продукта или услугата, която предлагаш'
export const PHONE_MATCH_PATTERN =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
export const VALID_PRICE = 'Въведи валидна цена'
export const VALID_EMAIL = 'Моля, въведете валиден имейл адрес!'
export const VALID_PHONE = 'Моля, въведете валиден телефонен номер!'

export const formValidationSchema = {
  category: string().required(REQUIRED_FIELD),
  subCategory: string().required(REQUIRED_FIELD),
  contact_person: string().required(REQUIRED_FIELD),
  delivery: string().required(REQUIRED_FIELD),
  description: string().min(80, MIN_LEN_DESCRIPTION).required(REQUIRED_FIELD),
  images: array().max(8),
  region: string().required(REQUIRED_FIELD),
  city: string().required(REQUIRED_FIELD),
  phone: string()
    .required(REQUIRED_FIELD)
    .matches(PHONE_MATCH_PATTERN, VALID_PHONE),
  price: number().positive(VALID_PRICE).required(REQUIRED_FIELD),
  currency: string().required(REQUIRED_FIELD),
  title: string().required(REQUIRED_FIELD),
}

export const formValidationSchemaObj = object({ ...formValidationSchema })
