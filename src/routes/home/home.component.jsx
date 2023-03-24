import { 
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography
} from '@mui/material'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { addItemToCart } from "../../store/cart/cart.action"
import { selectCartItems } from "../../store/cart/cart.selector"
import { fetchProductsStart } from "../../store/products/products.action"
import { selectProducts, selectProductsIsLoading } from "../../store/products/products.selector"

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)

  const addToCartHandler = () => {
    dispatch(addItemToCart(cartItems, product))
  }

  return (
    <Card>
      <CardMedia
        component="img"
        alt={name}
        height="140"
        image={imageUrl}
        sx={{ 
          minHeight: '250px', 
          '&:hover': {opacity: 0.5} 
        }}
      />
      <CardContent>
        <Typography 
          gutterBottom 
          variant="h5" 
          component="div" 
          sx={{ 
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden'
          }}
        >
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${price}
        </Typography>
      </CardContent>
      <CardActions 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center' 
        }}
      >
        <Button variant='contained' onClick={addToCartHandler}>Add to card</Button>
      </CardActions>
    </Card>
  )
}

const Home = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector(selectProductsIsLoading)
  const products = useSelector(selectProducts)
  
  useEffect(() => {
    dispatch(fetchProductsStart())
  }, [dispatch])

  const productComponent = (
    <Box sx={{ marginTop: '100px' }}>
      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
        {
          products &&
          products.map((product, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <ProductCard key={product.id} product={product} />
            </Grid>
          ))
        }
      </Grid>
    </Box>
  )

  return (
    isLoading ? 
      <CircularProgress color="inherit" />
    :
      productComponent
  )
}

export default Home
