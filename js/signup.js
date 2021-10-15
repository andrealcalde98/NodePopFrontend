import SignupController from "./controllers/SignupController.js"
import MessageController from "./controllers/MessageController.js"
import LoaderController from "./controllers/LoaderController.js"

window.addEventListener('DOMContentLoaded', function () {

    // Seleccionamos el elemento formulario y lo pasamos al controlador
    const form = document.querySelector('form')
    new SignupController(form)

    // Seleccionamos el elemento del DOM para mostrar mensajes de error
    const messages = document.querySelector('.messages')
    new MessageController(messages)

    // Cargamos el loader en la pagina
    const loaderDiv = document.querySelector('.loader')
    new LoaderController(loaderDiv)

})