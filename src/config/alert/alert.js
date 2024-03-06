import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const AlertClient = withReactContent(Swal); 


//Titulo y mensajes definidos succes | error | confirm 

//Alerta para error
//Alerta para succes
//Alerta para confirmar

export const customAlert = (title, text, icon) =>{
    return AlertClient.fire({
        title, 
        text, 
        icon, 
        confirmButtonColor:'#3085d6',
        confirmButtonText: 'Aceptar'
    })
}
