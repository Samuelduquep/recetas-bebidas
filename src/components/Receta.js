import React, { useState } from 'react'
import { useContext } from 'react'
import { ModalContext } from '../context/ModalContext'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 300,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        overflow: 'scroll',
        height: '100%',
        maxHeight: 500,
        display: 'block'
    },
    header: {
        padding: '12px 0',
        borderBottom: '1px solid darkgrey'
        },
        content: {
        padding: "12px 0",
        overflow: 'scroll'
        }
}));


const Receta = ({receta}) => {

const [modalStyle] = useState(getModalStyle)
const [open, setOpen] = useState(false)

const classes = useStyles()

const handleOpen = () => {
    setOpen(true)
}

const handleClose = () => {
    setOpen(false)
}

const {setIdReceta, infoReceta, setReceta} = useContext(ModalContext)

const mostrarIngredientes = infoReceta => {
    let ingredientes = [];
    for (let i = 1; i < 16; i++ ){
        if(infoReceta[`strIngredient${i}`]){
            ingredientes.push(
                <li>{infoReceta[`strIngredient${i}`]} {infoReceta[`strMeasure${i}`]} </li>
            )
        }
    }

    return ingredientes;
}

  return (
    <div className='col-md-6 col-lg-4 mb-4'>
        <div className='card h-100 d-flex'>
                <h2 className='card-header'>{receta.strDrink}</h2>
                <img className='card-img-top' src={receta.strDrinkThumb} alt={`imagen de ${receta.strDrink}`}/>
            <div className='card-body'>
                <button 
                    type='button'
                    className='btn btn-primary btn-block'
                    onClick={() =>{
                       setIdReceta(receta.idDrink) 
                       handleOpen()
                    }}
                >
                    Ver Receta
                </button>
                <Modal
                    open={open}
                    onClose={() =>{
                        setIdReceta('')
                        setReceta({})
                        handleClose()
                    }}
                >
                    <div style={modalStyle} className={classes.paper}>
                        <h2>{infoReceta.strDrink}</h2>
                        <h3 className='mt-4'>Instruciones</h3>
                        <p>{infoReceta.strInstructions}</p>
                        <img className='img-fluid my-4' src={infoReceta.strDrinkThumb} alt={`imagen de ${infoReceta.strDrink}`}/>
                        <h3>Ingredientes y cantidades</h3>
                        <ul>
                            {mostrarIngredientes(infoReceta)}
                        </ul>
                    </div>
                </Modal>
            </div>
        </div>
    </div>
  )
}

export default Receta