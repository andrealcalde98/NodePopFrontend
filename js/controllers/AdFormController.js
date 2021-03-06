import DataService from "../services/DataService.js"
import PubSub from "../services/PubSub.js"

export default class AdFormController {

    constructor(element) {
        this.element = element
        this.attachEventListeners()
    }

    attachEventListeners() {
        this.element.addEventListener('submit', async event => {
            event.preventDefault()
            PubSub.publish(PubSub.events.SHOW_LOADING)

            // chequeamos que cumpla las condiciones añadidadas al form
            if (this.element.checkValidity()) {
                // referenciamos form en una variable
                const data = new FormData(this.element)
                const name = data.get('nombre')
                const status = data.get('estado')
                const price = data.get('precio')
                console.log(status)
                try {
                    const result = await DataService.createAd(name, status, price)
                    PubSub.publish(PubSub.events.SHOW_SUCCESS, 'Creado! Añade uno nuevo o dirigete a la pagina principal')
                    this.element.reset()

                } catch (error) {
                    PubSub.publish(PubSub.events.SHOW_ERROR, error)
                } finally {
                    PubSub.publish(PubSub.events.HIDE_LOADING)
                }
            } else {
                PubSub.publish(PubSub.events.SHOW_ERROR, '"Precio" Tiene que ser un valor numerico')
                PubSub.publish(PubSub.events.HIDE_LOADING)
            }
        })

    }

}
