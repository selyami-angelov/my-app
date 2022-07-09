import { storage } from '../configs/firebase-config'
import { ref, uploadBytes } from 'firebase/storage'

export const uploadImage = (img) => {
  //should pass file name concated with nanoid() as second param
  console.log(img, 'img')
  const imgRef = ref(storage, `images/${img.name}`)
  uploadBytes(imgRef, img).then((result) => {
    console.log(result)
  })

  // img.forEach((image) => {
  //   const imgRef = ref(storage, `images/${image.name}`)
  //   uploadBytes(imgRef, image).then((result) => {
  //     console.log(result)
  //   })
  // })
}
