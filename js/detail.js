import LoaderController from "./controllers/LoaderController.js"
import MessageController from "./controllers/MessageController.js"
import AdDetailController from "./controllers/AdDetailController.js"

window.addEventListener('DOMContentLoaded', function () {

    // Cogemos y tratamos el elemnento del DOM que mostrará el PubSub
    const messagesDiv = document.querySelector('.messages')
    new MessageController(messagesDiv)

    const loaderDiv = document.querySelector('.loader')
    new LoaderController(loaderDiv)

    // obtengo el ID del anuncio a cargar de la URL
    const id = new URLSearchParams(window.location.search).get('id')

    // instanciamos el controlador del detalle del anuncio
    const adDiv = document.querySelector('.ad')
    new AdDetailController(adDiv, id)

})
