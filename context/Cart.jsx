import { createContext, useEffect, useContext } from "react";
import { UserContext } from './User'
import { useMutation } from '@apollo/client';
import { CREATE_CART_LOGIN } from "../utils/api";

const CartContext = createContext({})

const CartContextProvider = props => {
    const {auth} = useContext(UserContext)
    const [createCart, {data}] = useMutation(CREATE_CART_LOGIN)

    useEffect(() => {
        if (!localStorage.getItem('cart') && auth && localStorage.getItem('user')) {
            createCart({
            variables : {users_permissions_user: localStorage.getItem('user')}
        })
        }
    },[auth])

    useEffect(() => {
        if (data && !localStorage.getItem('cart')) {
          localStorage.setItem('cart', data.createCart.data.id)
        }
      }, [data])
    
    const value = {
    }
    
    return (
        <CartContext.Provider value = {value}>
            {props.children}
        </CartContext.Provider>
    )

}

export {
    CartContextProvider,
    CartContext
}