import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

//useDipatch para consumir la accion
import {obtenerPokemones, siguientePoke, anteriorPoke, detallesPoke} from '../redux/pokeReducer'
import Poke from './Poke'

//useSelector para consumir la vista o data


const Pokemones = () => {

    const dispatch = useDispatch()

    const pokemones = useSelector(dev => dev.leerPokemones.results) //estamos accediendo a todo el store
    const sig = useSelector(dev => dev.leerPokemones.next)
    const ant = useSelector(dev => dev.leerPokemones.previous)


    useEffect(() => {
        const fetchData = () =>{
            dispatch(obtenerPokemones())
        }
        fetchData()
     }, [dispatch])


    return (
        <div className="row">

            <div className="col-md-6">

                <h1>Lista de Pokemones</h1>

                <br />

                <div className = "d-flex justify-content-between">
                        {
                            pokemones.length === 0 &&  
                            <button onClick = {()=> dispatch(obtenerPokemones())} className="btn btn-dark">
                                Obtener Pokemones
                            </button>
                        }
                            
                        {
                            sig &&
                            <button onClick = {()=> dispatch(siguientePoke())} className="btn btn-dark">
                                Next
                            </button>
                        }
                    

                        {
                            ant &&
                            <button onClick = {()=> dispatch(anteriorPoke())} className="btn btn-dark">
                                Back
                            </button>
                        }
                </div>                

                <ul className = "list-group mt-3">
                    {
                        pokemones.map(dev => (
                            <li key={dev.name} className = "list-group-item">
                                {dev.name}
                                
                                <button 
                                    className = "btn btn-dark btn-sm float-end"
                                    onClick = {()=> dispatch(detallesPoke(dev.url))}
                                >
                                    Detalles
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </div>
            
            <div className="col-md-6">
                <h3>Detalle del pokemon</h3>
                <Poke />
            </div>
        </div>
    )
}

export default Pokemones
