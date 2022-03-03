import { createContext, useState, useEffect } from "react"

export const RecetasContext = createContext();

//Provide es donde se encuentran las funciones y el state

const RecetasProvider = (props) => {

    const [recetas, setRecetas] = useState([])
   
    const [busquedaReceta, setBusquedaReceta] = useState({

    })

    const [consultar, setConsultar] = useState(false)

    const [radio, setRadio] = useState('')

    const {categoria, ingrediente} = busquedaReceta; 

    useEffect(() => {
      if(consultar){
        const obtenerRecetas = async () => {
            const obur = () =>{
            if(categoria){
               const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoria}`
               return url;   
               } else if(ingrediente){
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`
                return url;  
               } else if (radio === 'Alcoholic') {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${radio}`
                return url; 
               } else if(radio === 'Non_Alcoholic'){
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${radio}`
                return url; 
               }
           }
            const respuesta = await fetch(obur())
            const resultado = await respuesta.json() 
            setRecetas(resultado.drinks)
        } 
          obtenerRecetas()
      }
        
      } , [busquedaReceta, categoria, consultar, ingrediente, radio]);

   
     

   
    
    return(
        <RecetasContext.Provider
            value={{
                setBusquedaReceta,
                recetas,
                setConsultar,
                setRadio,
                radio
            }}
        >
            {props.children}
        </RecetasContext.Provider>
    )
}

export default RecetasProvider;