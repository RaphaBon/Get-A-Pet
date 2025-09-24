import bus from '../utils/bus'

export default function useFlashMessage(){

    function setFlashMessage(msg, type){

        bus.emit('flash', {   //Capitamos a palavra flash para emitir o evento
            message: msg,
            type: type,
        })   

    }

    return { setFlashMessage }

}