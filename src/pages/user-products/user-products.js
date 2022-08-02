import { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useLocation } from 'react-router'
import ProductCardLandscape from '../../components/ProductCardLandscape/ProductCardLandscape.js'
import SearchToolbar from '../../components/SearchToolbar/SearchToolbar.js'
import { AuthContext } from '../../context/AuthContext.js'
import UserProductCard from '../../hoc/UserProductCard.js'
import { getProductsQuery } from '../../services/ad.js'
import styles from './user-products.module.css'

const UserProducts = () => {
  const { state } = useLocation()
  const [userProducts, setUserProducts] = useState([])

  useEffect(() => {
    getProductsQuery('userId', state?.userId)
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
                id={product.id}
                title={product.data.title}
                price={product.data.price}
                currency={product.data.currency}
                region={product.data.region}
                city={product.data.city}
                category={product.data.category_bg}
                subCategory={product.data.sub_category_bg}
                url={product.data.images[0]?.url}
                userId={product.data.userId}
              ></ProductCardLandscape>
            </UserProductCard>
          ))}
        </Container>
      </section>
    </>
  )
}

export default UserProducts
