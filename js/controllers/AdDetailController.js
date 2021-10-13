import DataService from "../services/DataService.js"
import PubSub from "../services/PubSub.js"
import { adDetailView } from "../views.js"

export default class AdDetailController {

    constructor(element, adID) {
        this.element = element
        this.loadAd(adID)
    }

    async loadAd(adID) {
        PubSub.publish(PubSub.events.SHOW_LOADING)
        try {
            const ad = await DataService.getAdDetail(adID)
            this.element.innerHTML = adDetailView(ad)
            // this.addDeleteButtonEventListener(twet)
        } catch (error) {
            console.log(error)
            PubSub.publish(PubSub.events.SHOW_ERROR, error)
        } finally {
            PubSub.publish(PubSub.events.HIDE_LOADING)
        }
    }
}