import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage'
import { nanoid } from 'nanoid'
import { storage } from '../configs/firebase-config'

export const uploadImages = async (file, setCreateAdData) => {
  const downloadUrl = []

  const fnWithNanoId = file.name + nanoid()
  const storageRef = ref(storage, `images/${fnWithNanoId}`)

  const uploadTask = uploadBytesResumable(storageRef, file)

  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  const res = uploadTask.on(
    'state_changed',
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log('Upload is ' + progress + '% done')
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused')
          break
        case 'running':
          console.log('Upload is running')
          break
        default:
      }
    },
    (error) => {
      console.log(error)
      // Handle unsuccessful uploads
    },
    async () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      return await getDownloadURL(uploadTask.snapshot.ref)

      // .then((downloadURL) => {
      //   console.log('File available at', downloadURL)
      //   downloadUrl.push({ name: fnWithNanoId, url: downloadURL })
      //   // setCreateAdData((prev) => ({
      //   //   ...prev,
      //   //   images: [...prev.images, { name: fnWithNanoId, url: downloadURL }],
      //   // }))
      // })
    }
  )
}

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
