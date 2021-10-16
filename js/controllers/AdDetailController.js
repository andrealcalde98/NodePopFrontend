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
            this.addDeleteButtonEventListener(ad)
        } catch (error) {
            console.log(error)
            PubSub.publish(PubSub.events.SHOW_ERROR, error)
        } finally {
            PubSub.publish(PubSub.events.HIDE_LOADING)
        }
    }

    addDeleteButtonEventListener(tweet) {
        const button = this.element.querySelector('button')
        if (button) {
            button.addEventListener('click', async () => {
                // confirm devuelve un true/false en funcion de lo que hayamos escogido
                const answer = confirm('¿Seguro que quieres borrar el anuncio?')
                if (answer === true) {
                    PubSub.publish(PubSub.events.SHOW_LOADING)
                    // desactivamos el boton ya que si tarda la operación el usuario le dará al botón repedidas veces
                    button.setAttribute('disabled', 'disabled')
                    try {
                        await DataService.deleteAd(tweet.id)
                        window.location.href = '/?message=ad-deleted'
                    } catch (error) {
                        PubSub.publish(PubSub.events.SHOW_ERROR, error)
                        button.removeAttribute('disabled')
                    } finally {
                        PubSub.publish(PubSub.events.HIDE_LOADING)
                    }
                }
            })
        }
    }
}