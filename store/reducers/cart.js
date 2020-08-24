import { ADD_TO_CART, REMOVE_FROM_CART} from "../actions/cart";
import {ADD_ORDER} from '../actions/orders';
import CartItem from '../../models/cart-item';
const initialState = {
    items:{},
    totalAmount:0
};

export default (state=initialState,action)=>{
    switch (action.type){
        case ADD_TO_CART:
            const addedProduct = action.product;
            const price = parseInt(addedProduct.price);
            const title = addedProduct.title;
            let updatedOrNewCartItem;
    if(state.items[addedProduct.id]){
                   updatedOrNewCartItem = new CartItem(
                      state.items[addedProduct.id].quantity+1,
                      price,
                      title,
                      state.items[addedProduct.id].sum+price
                  );
             }else{
                 updatedOrNewCartItem = new CartItem(1,price,title,price);
                }
                return {
                    ...state,
                    items:{...state.items,[addedProduct.id]:updatedOrNewCartItem},
                    totalAmount:state.totalAmount+price
                };
                case REMOVE_FROM_CART: 
                    const selectedCartItem = state.items[action.pid];
                    const currentQty = selectedCartItem.quantity;
                    let updatedCartItems;
                    if(currentQty>1){
                        const updatedCartItem= new CartItem(selectedCartItem.quantity-1,
                                                            selectedCartItem.price,
                                                            selectedCartItem.title,
                                                            selectedCartItem.sum-selectedCartItem.price)
                       updatedCartItems={...state.items,[action.pid]:updatedCartItem}
                    }else{
                        const updatedCartItems = {...state.items};
                        delete updatedCartItems[action.pid];
                    }
                    return {
                        ...state,
                        items:updatedCartItems,
                        totalAmount:state.totalAmount - selectedCartItem.price
                    };
                    case ADD_ORDER:
                        return initialState;
    }
    return state;
};