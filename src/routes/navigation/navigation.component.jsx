import styled from "@emotion/styled/macro"
import { 
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useState } from "react"
import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"

import logo from "../../assets/logo.png"

import Modal from "../../components/modal/modal.component"

import { selectCartCount, selectCartItems } from "../../store/cart/cart.selector"

const Logo = styled.img`
  height: 50px;
  cursor: pointer;
`

const CartItem = ({ cartItem }) => {
  const { name, quantity, imageUrl, price } = cartItem
  return (
    <Box 
      sx={{ 
        display: 'flex',
        marginTop: '20px'
      }}
    >
      <Box
        component="img"
        sx={{
          width: '30%'
        }}
        alt={name}
        src={imageUrl}
      />
      <Box 
        sx={{ 
          width: '70%', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'flex-start', 
          justifyContent: 'center', 
          padding: '10px 20px'
        }}
      >
        <Typography variant="h5">{name}</Typography>
        <Typography variant="h6">{quantity} x ${price}</Typography>
      </Box>
    </Box>
  )
}

const Navigation = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const cartCount = useSelector(selectCartCount)
  const cartItems = useSelector(selectCartItems)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const cartHandler = () => {
    handleClose()
    navigate("/cart")
  }

  return (
    <>
      <AppBar 
        position="fixed"
        color="default"
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box onClick={() => navigate('/')}>
              <Logo src={logo} />
            </Box>
            <Box 
              sx={{ display: 'flex', cursor: 'pointer' }}
              onClick={handleOpen}
            >
              <ShoppingCartIcon fontSize="large" />
              <Typography variant="h6">
                {cartCount}
              </Typography>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Modal open={open} onClose={handleClose}>
        <Box 
          sx={{ 
            height: '300px',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto'
          }}
        >
          {cartItems.length ? (
            cartItems.map((cartItem) => <CartItem key={cartItem.id} cartItem={cartItem} /> )
          ) : <Typography variant="h3">Your cart is empty</Typography>}
        </Box>
        <Button 
          variant="contained"
          fullWidth
          sx={{ 
            marginTop: '30px'
          }}
          onClick={cartHandler}
        >
          GO TO CART
        </Button>
      </Modal>
      <Outlet />
    </>
  )
}

export default Navigation
