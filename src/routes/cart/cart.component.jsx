import DeleteIcon from '@mui/icons-material/Delete'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { 
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { 
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart
} from "../../store/cart/cart.action";
import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector"

const Cart = () => {
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const clearItemHandler = (cartItem) => dispatch(clearItemFromCart(cartItems, cartItem))
  const addItemHandler = (cartItem) => dispatch(addItemToCart(cartItems, cartItem))
  const removeItemHandler = (cartItem) => dispatch(removeItemFromCart(cartItems, cartItem))

  const checkoutHandler = () => {
    navigate("/checkout")
  }

  return (
    <Box sx={{ marginTop: '100px' }}>
      <TableContainer component={Paper}>
        <Table 
          aria-label="simple table"
          sx={{ minWidth: 650 }} 
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">Product</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((cartItem) => (
              <TableRow
                key={cartItem.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell 
                  align="center"
                  sx={{ width: '20%' }}
                >
                  <Box
                    component="img"
                    sx={{
                      width: '100%'
                    }}
                    alt={cartItem.name}
                    src={cartItem.imageUrl}
                  />
                </TableCell>
                <TableCell align="center">{cartItem.name}</TableCell>
                <TableCell align="center">
                  <IconButton 
                    aria-label="delete"
                    size="large"
                    onClick={() => removeItemHandler(cartItem)}
                  >
                    <KeyboardArrowLeftIcon fontSize="inherit" />
                  </IconButton>
                  {cartItem.quantity}
                  <IconButton 
                    aria-label="delete"
                    size="large"
                    onClick={() => addItemHandler(cartItem)}
                  >
                    <KeyboardArrowRightIcon fontSize="inherit" />
                  </IconButton>
                </TableCell>
                <TableCell align="center">{cartItem.price}</TableCell>
                <TableCell align="center">
                  <IconButton 
                    aria-label="delete" 
                    size="large"
                    onClick={() => clearItemHandler(cartItem)}
                  >
                    <DeleteIcon fontSize="inherit" sx={{ color: 'red' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box 
        sx={{
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '10px'
        }}
      >
        <Typography variant="h4">Total: ${cartTotal}</Typography>
        <Button 
          variant="contained"
          fullWidth
          sx={{ 
            marginTop: '30px',
            textTransform: 'initial'
          }}
          onClick={checkoutHandler}
        >
          Go To Checkout
        </Button>
      </Box>
    </Box>
  )
}

export default Cart
