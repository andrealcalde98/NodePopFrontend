import LoginController from "./controllers/LoginController.js"
import MessageController from "./controllers/MessageController.js"
import MessageController from "./controllers/MessageController.js"

window.addEventListener('DOMContentLoader', function () {

    // Seleccionamos el elemento formulario y lo pasamos al controlador
    const form = document.querySelector('form')
    new LoginController(form)

    // Seleccionamos el elemento del DOM para mostrar mensajes de error
    const messages = document.querySelector('.messages')
    new MessageController(messages)

    // Cargamos el loader en la pagina
    const loaderDiv = document.querySelector('.loader')
    new LoaderController(loaderDiv)
})