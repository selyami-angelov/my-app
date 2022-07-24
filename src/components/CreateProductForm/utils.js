export const initialFormValues = {
  category: '',
  contact_person: '',
  delivery: '',
  description: '',
  email: '',
  images: [],
  location: '',
  phone: '',
  price: 0,
  currency: '',
  title: '',
}

export const formErrors = {
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

export const onInput = (e, setFormData) => {
  const inputName = e.target.dataset.name
  setFormData((prev) => ({ ...prev, [inputName]: e.target.value }))
}
