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

            // chequeamos que cumpla las condiciones añadidadas al form
            if (this.element.checkValidity()) {
                // referenciamos form en una variable
                const data = new FormData(this.element)
                const name = data.get('nombre')
                const status = data.get('precio')
                const price = data.get('estado')
                console.log(name, status, price)
                try {
                    PubSub.publish(PubSub.events.SHOW_LOADING)
                    const result = await DataService.createAd(name, status, price)
                    PubSub.publish(PubSub.events.SHOW_SUCCESS)
                } catch (error) {
                    PubSub.publish(PubSub.events.SHOW_ERROR, error)
                } finally {
                    PubSub.publish(PubSub.events.HIDE_LOADING)
                }

            }
        })

    }

}
