import React, { useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import { useNavigate } from 'react-router'
import { cats } from '../../configs/cats-config.js'
import SubItemsPopover from '../SubItemsPopover/SubItemsPopover'
import CyrillicToTranslit from 'cyrillic-to-translit-js'
import './Categories.css'
import { transliterate } from '../../common/utils/text-transform.js'

const CatFigure = () => {
  const [showPopOver, setShowPopOver] = useState(false)
  const [target, setTarget] = useState(null)
  const [items, setItems] = useState([])
  const navigate = useNavigate()

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
    console.log(e.currentTarget)
    setTarget(e.currentTarget)
  }

  const subItemClick = (e) => {
    const cyrillicToTranslit = new CyrillicToTranslit()
    const category = cyrillicToTranslit
      .transform(target.innerText, '-')
      .toLowerCase()
    const subCategory = cyrillicToTranslit
      .transform(e.target.innerText.replace(', ', ' '), '-')
      .toLowerCase()

    navigate(`/products/${category}/${subCategory}`)
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
        onSubItemClick={subItemClick}
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
