import { createContext, useState, useEffect } from "react"

export const CategoriasContext = createContext();

//Provide es donde se encuentran las funciones y el state

const CategoriasProvider = (props) => {
   
    const [categorias, setCategorias] = useState([])

    useEffect(() => {
     const obtenerCategorias = async () => {
        const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        setCategorias(resultado.drinks)
     }
     obtenerCategorias()
    }, [])
    

    return(
        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
    )
}

export default CategoriasProvider;