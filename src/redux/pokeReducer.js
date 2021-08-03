//importaciones
import axios from 'axios'


//vistas
const vistaInicial = {
    count: 0,
    next: null,
    previous: null,
    results: []
}


//types
const CONSUMIR_API = 'CONSUMIR_API'
const SIGUIENTE_POKE = 'SIGUIENTE_POKE'
const DETALLES_POKE = 'DETALLES_POKE'

//reducer
export default function reducerPoke(state=vistaInicial, action){
    switch(action.type){
        case CONSUMIR_API:
            return {...state, ...action.payload}
        case SIGUIENTE_POKE:
            return{...state, ...action.payload}
        case DETALLES_POKE:
            return {...state, poke: action.payload}
        default: 
            return state
    }
}



//acciones

export const detallesPoke = (url = 'https://pokeapi.co/api/v2/pokemon/1/') => async (dispatch) =>{

    if(localStorage.getItem(url)){
        dispatch({
            type: DETALLES_POKE,
            payload: JSON.parse(localStorage.getItem(url))
        })
        console.log('desde localStorage')
        return
    }

    try {
        console.log('desde api')
        const respuesta = await axios.get(url)
        dispatch({
            type: DETALLES_POKE,
            payload: {
                nombre: respuesta.data.name,
                ancho: respuesta.data.weight,
                alto: respuesta.data.height,
                imagen: respuesta.data.sprites.front_default
            }
        })
        localStorage.setItem(url, JSON.stringify({
            nombre: respuesta.data.name,
            ancho: respuesta.data.weight,
            alto: respuesta.data.height,
            imagen: respuesta.data.sprites.front_default
        }))
    } catch (error) {
        console.log(error)
    }
}


export const obtenerPokemones = () => async (dispatch) =>{

    if(localStorage.getItem('offset=0')){
        console.log('datos guardados de obtenerPokemones')
        dispatch({
            type: CONSUMIR_API,
            payload: JSON.parse(localStorage.getItem('offset=0'))
        })
        return 
    }

    try {
        console.log('guardando datos de la api de obtenerPokemones')
        const respuesta = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=5`)
        dispatch({
            type: CONSUMIR_API,
            payload: respuesta.data
        })

        localStorage.setItem('offset=0', JSON.stringify(respuesta.data))
    } catch (error) {
        console.log(error)
    }
}

//adelante
export const siguientePoke = () => async(dispatch, getState)=>{
  

    const sigui = getState().leerPokemones.next

    if(localStorage.getItem(sigui)){
        console.log('datos guardado de siguientePoke')
        dispatch({
            type: CONSUMIR_API,
            payload: JSON.parse(localStorage.getItem(sigui))
        })
        return
    }

    try {
        console.log('guardando datos desde la api de siguientePoke')
        const respuesta = await axios.get(sigui)
        dispatch({
            type: SIGUIENTE_POKE,
            payload: respuesta.data
        })

    localStorage.setItem(sigui, JSON.stringify(respuesta.data))
    } catch (error) {
        console.log(error)
    }
}


//atras
export const anteriorPoke = () => async(dispatch, getState) =>{
    
    const {previous} = getState().leerPokemones

    if(localStorage.getItem(previous)){
        console.log('datos guardado de anteriorPoke')
        dispatch({
            type: CONSUMIR_API,
            payload: JSON.parse(localStorage.getItem(previous))
        })
        return
    }


    try {
        console.log('guardando datos desde la api de anteriorPoke')
        const respuesta = await axios.get(previous)
        dispatch({
            type: SIGUIENTE_POKE,
            payload: respuesta.data
        })

    localStorage.setItem(previous, JSON.stringify(respuesta.data))
    } catch (error) {
        console.log(error)
    }
}