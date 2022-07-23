import styles from './Footer.module.css'

const Footer = () => {
  return (
    <div className={styles['footer-basic']}>
      <footer>
        <div className={styles['social']}>
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
        <p className={styles['copyright']}>Company Name © 2018</p>
      </footer>
    </div>
  )
}

export default Footer
