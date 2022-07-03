import DropdownButton from 'react-bootstrap/DropdownButton';
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import SplitButton from 'react-bootstrap/SplitButton';
import React, { useState, useRef, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './add-ad.css'
import { cats } from '../../configs/cats-config.js';
import CatPopover from '../../components/CatPopover/CatPopover.js';

const AddAd = (props) => {
    const [showPopOver, setShowPopOver] = useState(false);
    const [target, setTarget] = useState(null);
    const [subCats, setSubCats] = useState([])
  
    const showSubCats = (e) => {
      const labelText = target?.innerText
      const currentLabelText = e.target?.innerText
  
      console.log(e.target,'in e')

      currentLabelText !== labelText ? setShowPopOver(true) : setShowPopOver(!showPopOver);
      setTarget(e.target);
    }
  


    return (
        <section className='add-ad'>
            <h1 className='add-ad-title'>Добави обява</h1>
            <section className='ad-cat'>
                <Container>
                    <Form.Label htmlFor="basic-url">Заглавие*</Form.Label>
                    <InputGroup size="lg">
                        <Form.Control
                            aria-label="Large"
                            aria-describedby="inputGroup-sizing-sm"
                        />
                    </InputGroup>
                    <br />
                    <Form.Label htmlFor="basic-url">Категория*</Form.Label>
                    <InputGroup size='lg' className="mb-3">
                        <SplitButton
                            variant="outline-secondary"
                            title="Избери категория"
                            id="segmented-button-dropdown-1"
                        >
                            <ListGroup variant="flush">
                                {cats.map(cat => (
                                    <ListGroup.Item onClick={showSubCats}>{cat.icon} {cat.label}</ListGroup.Item>
                                ))}
                            </ListGroup>
                            <CatPopover placement={'right'} labelText={target?.innerText ?? ''} show={showPopOver} target={target}></CatPopover>
                        </SplitButton>
                        <Form.Control aria-label="Text input with dropdown button" />
                    </InputGroup>
                </Container>
            </section>
        </section>
    )
}

export default AddAd