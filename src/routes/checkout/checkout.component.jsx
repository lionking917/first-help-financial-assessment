import { 
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    Grid,
    Input,
    InputLabel,
    Radio,
    Snackbar,
    Typography
} from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { forwardRef, useState } from "react";
import Cards from "react-credit-cards-2"
import { IMaskInput } from 'react-imask';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { addItemToCard, removeItemFromCard, updateItemFromCard } from "../../store/card/card.action";
import { selectCardItems } from "../../store/card/card.selector";
import {
    selectCartItems,
    selectCartTotal,
} from "../../store/cart/cart.selector"

import Modal from "../../components/modal/modal.component"

const renderFlexRow = (title, detail, subTitle) => {
    return (
        <Box 
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '5px'
            }}
        >
            <Box sx={{ display: 'flex', maxWidth: '80%' }}>
                <Typography>{title}</Typography>
                {subTitle && 
                    <>
                        <Typography>:</Typography>
                        <Typography 
                            sx={{ 
                                marginLeft: '5px', 
                                whiteSpace: 'nowrap', 
                                fontWeight: 'bold' 
                            }}
                        >
                            {subTitle}
                        </Typography>
                    </>
                }
            </Box>
            <Typography sx={{ fontWeight: 'bold' }}>{detail}</Typography>
        </Box>
    )
}

const renderTickets = (cartItems) => {
    return (
        <Box>
            <Typography variant="h6">
                Tickets
            </Typography>
            {
                cartItems.map((cartItem, index) => (
                    <Box key={index}>
                        {renderFlexRow(cartItem.name, `$${cartItem.price * cartItem.quantity}`, `$${cartItem.price} * ${cartItem.quantity}`)}
                    </Box>
                ))
            }
        </Box>
    )
}

const renderCards = (cardItems, editItemHandler, removeItemHandler, selectedRadioValue, handleRadioChange) => {
    return (
        <>
            {
                cardItems.map(cardItem => (
                    <Box
                        key={cardItem.id}
                        sx={{
                            display: 'flex',
                            width: '100%',
                            marginTop: '20px',
                            padding: '20px',
                            backgroundColor: '#f2f7fc',
                            border: '1.5px solid #e4eefa',
                            borderRadius: '5px'
                        }}
                    >
                        <Box
                            sx={{
                                width: '50px'
                            }}
                        >
                            <Radio
                                checked={selectedRadioValue === cardItem.id.toString()}
                                onChange={handleRadioChange}
                                value={cardItem.id}
                                name="radio-buttons"
                                inputProps={{ 'aria-label': 'A' }}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                flex: 1
                            }}
                        >
                            <Box sx={{ display: 'flex' }}>
                                <Typography 
                                    variant="h6" 
                                    sx={{ 
                                        fontStyle: 'italic', 
                                        color: '#212670' 
                                    }} 
                                >
                                    VISA
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        marginLeft: '10px'
                                    }}
                                >
                                    <Typography>
                                        Visa - {cardItem.cvc}
                                    </Typography>
                                    <Typography sx={{ color: '#7f8284' }}>
                                        {cardItem.name} | exp. {cardItem.expiry.substring(0, 2)}/{cardItem.expiry.substring(2)}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginTop: '10px'
                                        }}
                                    >
                                        <Button 
                                            sx={{ 
                                                minWidth: 'auto', 
                                                padding: 0, 
                                                marginRight: '5px' 
                                            }}
                                            onClick={() => editItemHandler(cardItem)}
                                        >
                                            Edit
                                        </Button>
                                        |
                                        <Button 
                                            sx={{ 
                                                minWidth: 'auto', 
                                                padding: 0, 
                                                marginLeft: '5px' 
                                            }}
                                            onClick={() => removeItemHandler(cardItem)}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Box>
                                    <Typography>Security Code</Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            padding: '10px',
                                            border: '1.5px solid #000',
                                            borderRadius: '5px'
                                        }}
                                    >
                                        <MoreHorizIcon />
                                        <CheckCircleOutlineIcon 
                                            color="success"
                                        />
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginLeft: '10px'
                                    }}
                                >
                                    <CreditCardIcon fontSize="large" />
                                    <Typography>3-digits on back of card</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ))        
            }
        </>
    )
}

const CustomTextMask = forwardRef((props, ref) => {
    const { onChange, ...other } = props;
    let mask = '';

    if (props.name === 'number') {
        mask = "0000-0000-0000-0000";
    } else if (props.name === 'expiry') {
        mask = "00/00";
    } else if (props.name === 'cvc') {
        mask = "0000";
    }
    return (
        <IMaskInput
            {...other}
            mask={mask}
            definitions={{
                '#': /[1-9]/,
            }}
            inputRef={ref}
            unmask={true}
            onAccept={(value) => {
                onChange({ target: { value } })
            }}
            overwrite
        />
    )
})

const Checkout = () => {
    const cardItems = useSelector(selectCardItems)
    const cartItems = useSelector(selectCartItems)
    const cartTotal = useSelector(selectCartTotal)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const addItemHandler = (cardItem) => dispatch(addItemToCard(cardItems, cardItem))
    const removeItemHandler = (cardItem) => dispatch(removeItemFromCard(cardItems, cardItem))
    const updateItemHandler = (cardItem) => dispatch(updateItemFromCard(cardItems, cardItem))
    const editItemHandler = (cardItem) => {
        setId(cardItem.id)
        setNumber(cardItem.number)
        setExpiry(cardItem.expiry)
        setCVC(cardItem.cvc)
        setName(cardItem.name)

        handleOpen()
        setEditing(true)
    }

    const [editing, setEditing] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const [open, setOpen] = useState(false)
    const [id, setId] = useState('')
    const [number, setNumber] = useState('')
    const [expiry, setExpiry] = useState('')
    const [cvc, setCVC] = useState('')
    const [name, setName] = useState('')
    const [focused, setFocused] = useState('')
    const [errors, setErrors] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: ''
    })

    const [selectedRadioValue, setSelectedRadioValue] = useState('')

    const handleRadioChange = (event) => {
        console.log(event.target.value)
        setSelectedRadioValue(event.target.value)
    }

    const [snackBarOpen, setSnackBarOpen] = useState(false)

    const handleSnackBarOpen = () => setSnackBarOpen(true)
    const handleSnackBarClose = () => setSnackBarOpen(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => {
        setId('')
        setNumber('')
        setExpiry('')
        setCVC('')
        setName('')
        setFocused('')
        setOpen(false)
        setEditing(false)
    }

    const cancelOrder = () => {
        navigate('/cart')
    }

    const addCard = () => {
        const newErrors = Object.assign({}, errors)
        if (!number || number.length !== 16) {
            newErrors.number = 'invalid card number'
        }

        if (!expiry || expiry.length !== 4) {
            newErrors.expiry = 'invalid card expiry'
        }

        if (!cvc || cvc.length !== 4) {
            newErrors.cvc = 'invalid card cvc'
        }

        if (!name) {
            newErrors.name = 'invalid card name'
        }

        if (!newErrors.cvc && !newErrors.number && !newErrors.expiry && !newErrors.name) {
            if (editing) {
                updateItemHandler({
                    id,
                    number,
                    name,
                    expiry,
                    cvc
                })

                handleClose()
            } else {
                const index = cardItems.findIndex(cardItem => cardItem.number === number)
                if (index !== -1) {
                    newErrors.number = 'same card number exists'
                } else {
                    addItemHandler({
                        id: new Date().getTime(),
                        number,
                        name,
                        expiry,
                        cvc
                    })

                    handleClose()
                }
            }
        }

        setErrors(newErrors)
    }

    return (
        <>
            <Box sx={{ marginTop: '100px' }}>
                <Grid container spacing={{ sm: 1, md: 2 }}>
                    <Grid item sm={12} md={7}>
                        <Box
                            sx={{
                                padding: '20px',
                                border: '1.5px solid gray',
                                borderRadius: '5px'
                            }}
                        >
                            <Box 
                                sx={{ 
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <Typography variant="h5">
                                    Delivery
                                </Typography>
                                <CheckCircleOutlineIcon 
                                    color="success"
                                    fontSize="large"
                                />
                            </Box>
                            <Typography 
                                variant="h6"
                                sx={{ marginTop: '10px' }}
                            >
                                Mobile Entry - Free
                            </Typography>
                            <Typography
                                sx={{ marginTop: '10px' }}
                            >
                                Tickets Available by Sun Apr 3, 2022
                                <br />
                                {`These mobile tickets will be transferred directly to you from a trusted seller. 
                                We'll email you instructions on how to accept them on the original ticket provider's mobile app.`}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                padding: '20px',
                                border: '1.5px solid gray',
                                borderRadius: '5px',
                                marginTop: '20px'
                            }}
                        >
                            <Box 
                                sx={{ 
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <Typography variant="h5">
                                    Payment
                                </Typography>
                                <CheckCircleOutlineIcon 
                                    color="success"
                                    fontSize="large"
                                />
                            </Box>
                            <Typography 
                                variant="h6"
                                sx={{ 
                                    marginTop: '20px',
                                    marginLeft: '15px'
                                }}
                            >
                                Use Credit / Debit Card
                            </Typography>
                            {renderCards(cardItems, editItemHandler, removeItemHandler, selectedRadioValue, handleRadioChange)}
                            <Button 
                                color="inherit"
                                sx={{ 
                                    marginTop: '20px',
                                    marginBottom: '20px'
                                }}
                                variant="outlined"
                            >
                                <AddIcon color="primary" fontSize="large" />
                                <CreditCardIcon fontSize="large" />
                                <Typography 
                                    variant="h6"
                                    sx={{
                                        marginLeft: '5px',
                                        textTransform: 'initial'
                                    }}
                                    onClick={handleOpen}
                                >
                                    Add New Card
                                </Typography>
                            </Button>
                            <Divider />
                            <Box sx={{ marginTop: '20px' }}>
                                <Typography variant="h6">
                                    Or Pay With
                                </Typography>
                                <Typography>
                                    By using a digital wallet and continuing past this page, you have read and are accepting the <Typography component="span" color="#3271d8">Terms of Use</Typography>.
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item sm={12} md={5}>
                        <Accordion 
                            expanded={expanded} 
                            sx={{ border: '1.5px solid gray'}}
                            onChange={() => setExpanded(!expanded)}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                                sx={{
                                    display: 'flex'
                                }}
                            >
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="h5">
                                        Total
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="h5">${cartTotal}</Typography>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                {renderTickets(cartItems)}
                                <Box sx={{ marginTop: '20px' }}>
                                    <Typography variant="h6">
                                        Notes From Seller
                                    </Typography>
                                    <Typography>
                                        {`xfr XFER Proof of at least one dose of COVID-19 vaccination 
                                        for ages 5 to 11 and guests ages 12 and up will be required to show proof 
                                        of two COVID-19 vaccine doses or one dose of the Johnson & Johnson vaccine. 
                                        Masks must be worn.`}
                                    </Typography>
                                </Box>
                                <Box sx={{ marginTop: '20px' }}>
                                    <Typography variant="h6">
                                        Fees
                                    </Typography>
                                    {renderFlexRow('Service Fee', '$88.16', '$44.08 * 2')}
                                    {renderFlexRow('Order Processing Fee', '$2,95')}
                                </Box>
                                <Box sx={{ marginTop: '20px' }}>
                                    <Typography variant="h6">
                                        Delivery
                                    </Typography>
                                    {renderFlexRow('Mobile Entry', 'Free')}
                                </Box>
                                <Button
                                    sx={{ 
                                        marginTop: '20px',
                                        padding: 0, 
                                        minWidth: 'auto',
                                        textTransform: 'initial'
                                    }}
                                    onClick={cancelOrder}
                                >
                                    Cancel Order
                                </Button>
                                <Typography
                                    sx={{
                                        marginTop: '30px',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    *All Sales Final - No Refunds
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginTop: '20px'
                                    }}
                                >
                                    <Checkbox />
                                    <Typography>
                                        I have read and agree to the current <Typography component="span" sx={{ color: '#3271d8' }}>Terms of Use</Typography>.
                                    </Typography>
                                </Box>
                                <Button 
                                    variant="contained" 
                                    color="success"
                                    fullWidth
                                    sx={{ 
                                        marginTop: '20px',
                                        textTransform: 'initial'
                                    }}
                                    onClick={handleSnackBarOpen}
                                >
                                    Place Order
                                </Button>
                                <Typography
                                    sx={{
                                        marginTop: '10px',
                                        fontSize: '12px',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    *Exceptions may apply, see our Terms of Use
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>
            </Box>
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        width: { sm: '400px', md: '500px'}
                    }}
                >
                    <Cards
                        number={number}
                        expiry={expiry}
                        cvc={cvc}
                        name={name}
                        focused={focused}
                    />
                    <FormControl 
                        variant="standard"
                        fullWidth
                        sx={{ marginTop: '20px' }}
                    >
                        <InputLabel htmlFor="card-number">Card number</InputLabel>
                        <Input
                            value={number}
                            name="number"
                            fullWidth
                            inputComponent={CustomTextMask}
                            placeholder="xxxx-xxxx-xxxx-xxxx"
                            onChange={(event) => {
                                setErrors({ ...errors, number: '' })
                                setNumber(event.target.value)
                            }}
                        />
                        {
                            errors.number && <Typography color="red">{errors.number}</Typography>
                        }
                    </FormControl>
                    <FormControl 
                        variant="standard"
                        fullWidth
                        sx={{ marginTop: '5px' }}
                    >
                        <InputLabel htmlFor="card-name">Name</InputLabel>
                        <Input
                            value={name}
                            name="name"
                            fullWidth
                            placeholder="Kimberley Wang"
                            onChange={(event) => {
                                setErrors({ ...errors, name: '' })
                                setName(event.target.value)
                            }}
                        />
                        {
                            errors.name && <Typography color="red">{errors.name}</Typography>
                        }
                    </FormControl>
                    <FormControl 
                        variant="standard"
                        fullWidth
                        sx={{ marginTop: '5px' }}
                    >
                        <InputLabel htmlFor="card-number">Expiry</InputLabel>
                        <Input
                            value={expiry}
                            name="expiry"
                            fullWidth
                            inputComponent={CustomTextMask}
                            placeholder="xx/xx"
                            onChange={(event) => {
                                setErrors({ ...errors, expiry: '' })
                                setExpiry(event.target.value)
                            }}
                        />
                        {
                            errors.expiry && <Typography color="red">{errors.expiry}</Typography>
                        }
                    </FormControl>
                    <FormControl 
                        variant="standard"
                        fullWidth
                        sx={{ marginTop: '5px' }}
                    >
                        <InputLabel htmlFor="card-number">CVC</InputLabel>
                        <Input
                            value={cvc}
                            name="cvc"
                            required
                            fullWidth
                            inputComponent={CustomTextMask}
                            placeholder="xxxx"
                            onChange={(event) => {
                                setErrors({ ...errors, cvc: '' })
                                setCVC(event.target.value)
                            }}
                        />
                        {
                            errors.cvc && <Typography color="red">{errors.cvc}</Typography>
                        }
                    </FormControl>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ 
                            marginTop: '20px',
                            textTransform: 'initial'
                        }}
                        onClick={addCard}
                    >
                        {editing ? 'Update Card' : 'Add Card'}
                    </Button>
                </Box>
            </Modal>
            <Snackbar
                open={snackBarOpen}
                autoHideDuration={2000}
                onClose={handleSnackBarClose}
                message="Ordered successfully!!!"
            />
        </>
    )
}

export default Checkout  