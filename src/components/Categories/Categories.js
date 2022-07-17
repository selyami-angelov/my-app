import React, { useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import { cats } from '../../configs/cats-config.js'
import SubItemsPopover from '../SubItemsPopover/SubItemsPopover'
import './Categories.css'

const CatFigure = () => {
  const [showPopOver, setShowPopOver] = useState(false)
  const [target, setTarget] = useState(null)
  const [items, setItems] = useState([])

  const labelText = target?.getElementsByTagName('label')[0].innerText

  const showSubCats = (e) => {
    const currentLabelText =
      e.currentTarget.getElementsByTagName('label')[0].innerText

    if (currentLabelText !== labelText) {
      const subCats = cats.find(
        (cat) => cat.label.trim() === currentLabelText.trim()
      )
      setShowPopOver(true)
      setItems(subCats)
    } else {
      setShowPopOver(!showPopOver)
    }
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
      <SubItemsPopover
        items={items.subCats}
        placement={'bottom'}
        labelText={labelText ?? ''}
        show={showPopOver}
        target={target}
      ></SubItemsPopover>
    </Container>
  )
}

export default CatFigure
