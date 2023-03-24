import { CircularProgress } from '@mui/material'
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./routes/home/home.component"))
const Cart = lazy(() => import ("./routes/cart/cart.component"))
const Navigation = lazy(() => import ("./routes/navigation/navigation.component"))
const Checkout = lazy(() => import ("./routes/checkout/checkout.component"))

const App = () => {
  return (
    <Suspense fallback={<CircularProgress color="inherit" />}>
      <Routes>
        <Route path="/" element={ <Navigation /> }>
          <Route index element={<Home />} />
          <Route path="cart" element={ <Cart /> } />
          <Route path="checkout" element={ <Checkout /> } />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
