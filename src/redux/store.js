import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import reducerPoke from './pokeReducer'

const todosReducer = combineReducers({
    leerPokemones: reducerPoke
})


//extension para chrome
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default function generarTienda(){
    const tienda = createStore(todosReducer, composeEnhancers(applyMiddleware(thunk)))
    return tienda
}