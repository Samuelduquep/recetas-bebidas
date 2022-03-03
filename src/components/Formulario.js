import React, {useContext, useState} from 'react'
import { CategoriasContext } from '../context/CategoriasContext'
import { RecetasContext } from '../context/RecetasContext'

const Formulario = () => {

  const {categorias} = useContext(CategoriasContext)

  const {setBusquedaReceta, setConsultar, setRadio, radio} = useContext(RecetasContext)

  const [busqueda, setBusqueda] = useState({})

  const obtenerDatosReceta = e => {

    setBusqueda({
      ...busqueda,
      [e.target.name] : e.target.value
    })
  }

  const cambioRadio = e => {
    setRadio(e.target.value);
    setBusqueda({})
  }

  return (
    <form
        className='col-12'
        onSubmit={e =>{
          e.preventDefault();
          setBusquedaReceta(busqueda)
          setConsultar(true)
        }}
    >
      <fieldset className='text-center'>
          <legend>Busca Bebidas por Categoría</legend>
      </fieldset>

        <div class="form-check">
          <input 
            class="form-check-input" 
            type="radio" 
            id="categoria" 
            value='categoria'
            checked={radio==='categoria' ? true : false}
            onChange={cambioRadio}
            />
          <label class="form-check-label" htmlFor="categoria">
              Buscar por Categoría
          </label>
        </div>
        <div class="form-check">
          <input 
            class="form-check-input" 
            type="radio" 
            id="ingrediente"
            value='ingrediente'
            checked={radio==='ingrediente' ? true : false}
            onChange={cambioRadio}
            />
          <label class="form-check-label" htmlFor="ingrediente">
            Buscar por Ingrediente
          </label>
        </div>
        <div class="form-check">
          <input  
            class="form-check-input" 
            type="radio" 
            id="Alcoholic"
            value='Alcoholic'
            checked={radio==='Alcoholic' ? true : false}
            onChange={cambioRadio}
            />
          <label class="form-check-label" htmlFor="Alcoholic">
            Bebidas <apan className='font-weight-bold'> Con Alcohol</apan>
          
          </label>
        </div>
        <div class="form-check">
          <input  
            class="form-check-input" 
            type="radio" 
            id="Non_Alcoholic"
            value='Non_Alcoholic'
            checked={radio==='Non_Alcoholic' ? true : false}
            onChange={cambioRadio}
            />
          <label class="form-check-label" htmlFor="Non_Alcoholic">
            Bebidas <apan className='font-weight-bold'>Sin Alcohol</apan>
          </label>
        </div>

      <div className='row mt-4'>
          { radio === 'categoria' ? <div className='col-md-4 mb-4'>
              <select 
              className='form-control'
              name='categoria'
              onChange={obtenerDatosReceta}
              >
                <option value=''>Buscar por Categoría</option>
                {categorias.map(categoria=>(
                  <option
                    key={categoria.strCategory}
                    value={categoria.strCategory}
                  >{categoria.strCategory}</option>
                ))}
              </select>
          </div> : null}

          { radio === 'ingrediente' ? <div className='col-md-4 mb-4'>
              <input 
              type='text'
              className='form-control'
              name='ingrediente'
              placeholder='Escribe Ejemplo: Vodka'
              onChange={obtenerDatosReceta}
              />
          </div> : null }
          <div className='col-md-4'>
              <input
                type='Submit'
                className='btn btn-primary btn-block'
                value='Buscar Bebidas'
              />
          </div>
      </div>
    </form>
  )
}

export default Formulario
