import DataService from "../services/DataService.js"
import { adView } from '../views.js'
import PubSub from "../services/PubSub.js"


export default class AdListController {

    constructor(element) {

        this.element = element
    }

    async renderAds() {
        // añadimos un loader a la carga de anuncios
        PubSub.publish(PubSub.events.SHOW_LOADING)
        try {
            const ads = await DataService.getads()
            for (const ad of ads) {
                const adElement = document.createElement('div')
                adElement.className = 'carta'
                adElement.innerHTML = adView(ad)
                this.element.appendChild(adElement)
            }
        } catch (error) {
            PubSub.publish(PubSub.events.SHOW_ERROR, error)
        } finally {
            PubSub.publish(PubSub.events.HIDE_LOADING)
        }
    }

}