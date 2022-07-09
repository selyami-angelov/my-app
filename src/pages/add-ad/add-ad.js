import ListGroup from 'react-bootstrap/ListGroup';
import SplitButton from 'react-bootstrap/SplitButton';
import React, { useState, useRef, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import styles from './add-ad.module.css'
import imgPlaceholder from '../../images/img-placeholder.png'
import { cats } from '../../configs/cats-config.js';
import CatPopover from '../../components/CatPopover/CatPopover.js';
import Card from 'react-bootstrap/Card';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

const AddAd = (props) => {
    const [showPopOver, setShowPopOver] = useState(false);
    const [target, setTarget] = useState(null);
    const [images, setImages] = useState(new Array(8).fill(imgPlaceholder))
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('0');
    const [conditionValue, setConditionValue] = useState(0);


    const showSubCats = (e) => {
        const labelText = target?.innerText
        const currentLabelText = e.target?.innerText


        currentLabelText !== labelText ? setShowPopOver(true) : setShowPopOver(!showPopOver);
        setTarget(e.target);
    }


    return (
        <Container fluid className={styles['add-ad']}>
            <h1 className={styles['add-ad-title']}>Добави обява</h1>
            <Container className={styles['ad-cat']} >
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
            </Container>
            <Container className={styles['add-image-section']} >
                <h4>Снимки</h4>
                <label>Първата снимка ще бъде основната в обявата ти.</label>
                <Container  >
                    <Row xs="auto" className={`g-2 ${styles['imgs-row']}`}>
                        {images.map(img => (
                            <Col >
                                <Card className="bg-dark text-white">
                                    <Card.Img src={img} alt="Card image" />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </Container>
            <Container className={styles['description-section']}>
                <Container>
                    <Form.Label htmlFor="basic-url">Описание*</Form.Label>
                    <InputGroup className={styles.description} size='lg'>
                        <Form.Control placeholder='Напиши това, което ти се иска да прочетеш, ако ти гледаше тази обява' as="textarea" aria-label="With textarea" />
                    </InputGroup>
                </Container>
            </Container>
            <Container>
                <Container className={styles['price-section']}>
                    <ButtonGroup className={styles['button-group']}>
                        <ToggleButton
                            id={'price'}
                            type="radio"
                            variant={'outline-dark'}
                            name="price"
                            value={'1'}
                            checked={radioValue === '1'}
                            onChange={(e) => setRadioValue(e.currentTarget.value)}
                        >
                            Цена
                        </ToggleButton>
                        <ToggleButton
                            id={'free'}
                            type="radio"
                            variant={'outline-dark'}
                            name="free"
                            value={'2'}
                            checked={radioValue === '2'}
                            onChange={(e) => setRadioValue(e.currentTarget.value)}
                        >
                            Безплатно
                        </ToggleButton>
                    </ButtonGroup>
                    <Form.Label htmlFor="basic-url">Цена*</Form.Label>
                    <InputGroup className="mb-1">
                        <Form.Control aria-label="Text input with dropdown button" />
                        <Form.Select size="lg">
                            <option>лв</option>
                            <option>eur</option>
                        </Form.Select>
                    </InputGroup>
                    <div key={'inline-radio'} className="mb-3">
                        <h5>Доставката се поема от</h5>
                        <Form.Check
                            inline
                            label='купувача'
                            name='delivery'
                            type='radio'
                            id={'inline-radio-1'}
                        />
                        <Form.Check
                            inline
                            label='продавача'
                            name='delivery'
                            type='radio'
                            id={'inline-radio-2'}
                        />
                        <Form.Check
                            inline
                            label='лично предаване'
                            name='delivery'
                            type='radio'
                            id={'inline-radio-3'}
                        />
                    </div>
                    <Form.Label htmlFor="basic-url">Състояние*</Form.Label>
                    <ButtonGroup className={styles['button-group']}>
                        <ToggleButton
                            id={'new'}
                            type="radio"
                            variant={'outline-dark'}
                            name="new"
                            value={'1'}
                            checked={conditionValue === '1'}
                            onChange={(e) => setConditionValue(e.currentTarget.value)}
                        >
                            Цена
                        </ToggleButton>
                        <ToggleButton
                            id={'used'}
                            type="radio"
                            variant={'outline-dark'}
                            name="used"
                            value={'2'}
                            checked={conditionValue === '2'}
                            onChange={(e) => setConditionValue(e.currentTarget.value)}
                        >
                            Безплатно
                        </ToggleButton>
                    </ButtonGroup>
                </Container>
            </Container>
            <Container className={styles.contacts}>
                <Container>
                    <h4>Данни за контакт</h4>
                    <Form.Label htmlFor="basic-url">Локация*</Form.Label>
                    <InputGroup size='lg' className={`mb-1 ${styles['contact-input']}`}>
                        <Form.Control
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <Form.Label htmlFor="basic-url">Лице за контакт*</Form.Label>
                    <InputGroup size='lg' className={`mb-1 ${styles['contact-input']}`}>
                        <Form.Control
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <Form.Label htmlFor="basic-url">Имейл адрес</Form.Label>
                    <InputGroup size='lg' className={`mb-1 ${styles['contact-input']}`}>
                        <Form.Control
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <Form.Label htmlFor="basic-url">Телефонен номер</Form.Label>
                    <InputGroup size='lg' className={`mb-1 ${styles['contact-input']}`}>
                        <Form.Control
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </Container>
            </Container>
            <Container className={styles['add-section']}>
                <Container>
                    <Button variant='dark'>Добави обява</Button>
                </Container>
            </Container>
        </Container>
    )
}

export default AddAd