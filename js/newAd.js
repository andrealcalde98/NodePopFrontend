import AdFormController from "./controllers/AdFormController.js"
import MessageController from "./controllers/MessageController.js"
import LoaderController from "./controllers/LoaderController.js"
import DataService from "./services/DataService.js"

window.addEventListener('DOMContentLoaded', function () {

    // if (DataService.isAuthenticed() === false) {
    //     window.location.href = '/login.html?next=/new.html'
    // }

    // Cargamos el loader en la pagina
    const loaderDiv = document.querySelector('.loader')
    new LoaderController(loaderDiv)

    // Seleccionamos el formulario y se lo pasamos al controlador del formulario
    const form = document.querySelector('form')
    new AdFormController(form)

    // Seleccionamos el elemento del DOM donde mostrar mensajes de error y lo tratamos
    const messages = document.querySelector('.messages')
    new MessageController(messages)

})