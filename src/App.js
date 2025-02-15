import { useState } from 'react'

import './styles/reset.css'
import './styles/index.css'

import Store from './components/Store'
import Cart from './components/Cart'
import Footer from './components/Footer'

export default function App() {
  const [cart, setCart] = useState([])

  const addToCart = storeItem => {
    // Using find to see if the storeItem is already in the cart
    const found = cart.find(cartItem => cartItem.id === storeItem.id)
    // If found is a truthy value, we increase the quantity of chosen item then return
    if (found) {
      const updatedCart = cart.map(item => {
        if (item.name === storeItem.name) {
          return { ...item, quantity: item.quantity + 1 }
        } else {
          return item
        }
      })
      setCart(updatedCart)
      return
    }

    const newCartItem = { ...storeItem, quantity: 1 }
    setCart([...cart, newCartItem])
  }

  // One function to edit the cart quantities. Takes in the item and a string of either 'decrement' or 'increment'
  // If the quantity is 0, we set it to null, then filter it out before updating the whole cart
  const editCartItem = (cartItem, operation) => {
    let updatedCart

    if (operation === 'decrement') {
      updatedCart = cart.map(item => {
        if (item.name === cartItem.name) {
          const copy = { ...item, quantity: item.quantity - 1 }
          if (copy.quantity === 0) return null
          return copy
        }
        return item
      })
    } else if (operation === 'increment') {
      updatedCart = cart.map(item => {
        if (item.name === cartItem.name) {
          return { ...item, quantity: item.quantity + 1 }
        } else {
          return item
        }
      })
    }

    setCart(updatedCart.filter(item => item !== null))
  }

  return (
    <>
      <Store addToCart={addToCart} />
      <Cart cart={cart} editCartItem={editCartItem} />
      <Footer />
    </>
  )
}
