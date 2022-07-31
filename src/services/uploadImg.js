import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage'
import { nanoid } from 'nanoid'
import { storage } from '../configs/firebase-config'

export const uploadImg = async (img) => {
  const fnWithNanoId = img.name + nanoid()
  const storageRef = ref(storage, `images/${fnWithNanoId}`)
  await uploadBytes(storageRef, img)
  const url = await getDownloadURL(storageRef)
  return { name: fnWithNanoId, url: url }
}

export const deleteImages = (images) => {
  images.forEach((image) => {
    const storageRef = ref(storage, `images/${image.name}`)

    deleteObject(storageRef)
      .then(() => {
        console.log('File deleted successfully')
      })
      .catch((error) => {
        console.log('Uh-oh, an error occurred!')
      })
  })
}
