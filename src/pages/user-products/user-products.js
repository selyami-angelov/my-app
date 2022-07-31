import { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import ProductCardLandscape from '../../components/ProductCardLandscape/ProductCardLandscape.js'
import SearchToolbar from '../../components/SearchToolbar/SearchToolbar.js'
import { AuthContext } from '../../context/AuthContext.js'
import UserProductCard from '../../hoc/UserProductCard.js'
import { getProductsQuery } from '../../services/ad.js'
import styles from './user-products.module.css'

const UserProducts = () => {
  const [userProducts, setUserProducts] = useState([])
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    getProductsQuery('userId', currentUser.uid)
      .then((result) => {
        setUserProducts(result)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <SearchToolbar />
      <br></br>
      <section className={styles['container']}>
        <Container className={styles['container']}>
          {userProducts.map((product) => (
            <UserProductCard key={product.id}>
              <ProductCardLandscape
                url={product.data.images[0]?.url}
                title={product.data.title}
                price={product.data.price}
                currency={product.data.currency}
                city={product.data.city}
                id={product.id}
              ></ProductCardLandscape>
            </UserProductCard>
          ))}
        </Container>
      </section>
    </>
  )
}

export default UserProducts
