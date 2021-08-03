import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {detallesPoke} from '../redux/pokeReducer'


const Poke = () => {

    const dispatch = useDispatch()

    useEffect(() => {
       const fetchData = () =>{
           dispatch(detallesPoke())
       }
       fetchData()
    }, [dispatch])


    const mostrar = useSelector(tienda => tienda.leerPokemones.poke)
    console.log(mostrar)


    return mostrar ? (
        <div className = "card mt-4 text-center">
            <div className="card-body">
                <img src={mostrar.imagen} className = "img-fluid" alt=""/>
                <div className="card-title text-uppercase">{mostrar.nombre}</div>
                <p className="card-text">Alto: {mostrar.alto} | Ancho: {mostrar.ancho}</p>
            </div>
        </div>
    ) : null 
}

export default Poke
