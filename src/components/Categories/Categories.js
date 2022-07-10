import React, { useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import { cats } from '../../configs/cats-config.js'
import CatPopover from '../CatPopover/CatPopover.js'
import './Categories.css'

const CatFigure = () => {
  const [showPopOver, setShowPopOver] = useState(false)
  const [target, setTarget] = useState(null)
  const [subCats, setSubCats] = useState([])

  const labelText = target?.getElementsByTagName('label')[0].innerText

  const showSubCats = (e) => {
    const currentLabelText =
      e.currentTarget.getElementsByTagName('label')[0].innerText

    currentLabelText !== labelText
      ? setShowPopOver(true)
      : setShowPopOver(!showPopOver)
    setTarget(e.currentTarget)
  }

  return (
    <Container className="cat-container">
      <h2 className="cat-title">Главни категории</h2>
      <ul className="categories">
        {cats.map((cat) => (
          <li onClick={showSubCats} key={cat.label} className="category">
            <a href="#">{cat.icon}</a> <label>{cat.label}</label>
          </li>
        ))}
      </ul>
      <CatPopover
        placement={'bottom'}
        labelText={labelText ?? ''}
        show={showPopOver}
        target={target}
      ></CatPopover>
    </Container>
  )
}

export default CatFigure
