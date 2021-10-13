import AdListController from "./controllers/AdsListController.js"
import MessageController from "./controllers/MessageController.js"
import LoaderController from "./controllers/LoaderController.js"


window.addEventListener('DOMContentLoaded', function () {

    // Cogemos y tratamos el elemento del DOM que mostrará el PubSub
    const messagesDiv = document.querySelector('.messages')
    new MessageController(messagesDiv)


    // cargamos el elemento del DOM donde mostraremos el loader
    const loaderDiv = document.querySelector('.loader')
    new LoaderController(loaderDiv)


    // coger el elemento del DOM (HTML) donde quiero cargar los tweets
    const container = document.querySelector('.container')
    // en este caso en la lista trataremos el error y mostraremos los anuncios
    const adListController = new AdListController(container)
    // decir al controlador que pinte los anuncios
    adListController.renderAds()


})