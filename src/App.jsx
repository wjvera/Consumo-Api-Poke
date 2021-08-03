import React from 'react'
import Pokemones from './components/Pokemones';
import {Provider} from 'react-redux'
import generarTienda from './redux/store'

function App() {

  const store = generarTienda()

  return (
   <Provider store = {store}>
      <div className="container mt-5">
          <Pokemones />
      </div>
   </Provider>
  );
}

export default App;
