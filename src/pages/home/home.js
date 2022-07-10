import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import SearchToolbar from '../../components/ButtonToolbar/ButtonToolbar.js'
import CatFigure from '../../components/Categories/Categories.js'
import AdCard from '../../components/AdCard/AdCard'
import CardContainer from '../../components/CardContainer/CardContainer'
import './home.css'
import { getAds } from '../../services/ad.js'

const Home = (props) => {
  const [ads, setAds] = useState([])

  useEffect(() => {
    getAds(setAds)
  }, [])

  console.log(ads)

  return (
    <>
      <SearchToolbar />
      <CatFigure></CatFigure>
      <CardContainer
        cards={
          <Row className="g-4">
            {ads.length &&
              ads.map((doc) => (
                <Col key={doc.id} xs lg="3">
                  <AdCard
                    title={doc.title}
                    descr={doc.data.description}
                    img={doc.data.images[0]?.url}
                    btnText={'Преглед'}
                  />
                </Col>
              ))}
          </Row>
        }
      ></CardContainer>
      <section className="home-overview-section">
        <h2>xlO</h2>
        <p>
          xlO e сайт за безплатни обяви в категории: Недвижими имоти, Автомобили
          и авточасти, Eлектроника, Мода, За бебето и детето, Дом и градина,
          Свободно време, Домашни любимци. Тук може да намериш интересни обяви и
          лесно да се свържеш с продавача. Ако искаш да купиш нещо - може да
          намериш атрактивни предложения на цени, по-ниски, отколкото в
          магазина. Ако искаш да продадеш нещо - можеш да добавиш обява бързо,
          лесно и безплатно и да пуснеш за продажба практически всичко, за което
          се сетиш. Купувай и продавай в xlO!
        </p>
      </section>
      <div className="footer-basic">
        <footer>
          <div className="social">
            <a href="#">
              <i className="fa-brands fa-instagram-square"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-snapchat-square"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
          </div>
          <ul className="list-inline">
            <li className="list-inline-item">
              <a href="#">Home</a>
            </li>
            <li className="list-inline-item">
              <a href="#">Services</a>
            </li>
            <li className="list-inline-item">
              <a href="#">About</a>
            </li>
            <li className="list-inline-item">
              <a href="#">Terms</a>
            </li>
            <li className="list-inline-item">
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
          <p className="copyright">Company Name © 2018</p>
        </footer>
      </div>
    </>
  )
}

export default Home
