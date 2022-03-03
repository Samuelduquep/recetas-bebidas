import { createContext, useState, useEffect } from "react"

export const ModalContext = createContext();

//Provide es donde se encuentran las funciones y el state

const ModalProvider = (props) => {

    const [infoReceta, setReceta] = useState([])
    const [idReceta, setIdReceta] = useState('')

    useEffect(() => {
     
            const obtenerRecetas = async () => {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            setReceta(resultado.drinks[0])
        }          
             obtenerRecetas()
  
       }, [idReceta])
    

    return(
        <ModalContext.Provider
            value={{
                infoReceta,
                setIdReceta,
                setReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
    )
}

export default ModalProvider;