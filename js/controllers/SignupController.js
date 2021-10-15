import DataService from "../services/DataService.js"
import PubSub from "../services/PubSub.js"

export default class SignupController {

    constructor(element) {
        this.element = element
        this.attachEventListeners()
    }

    checkIfAllPasswordsAreEqual() {
        const inputsPassword = this.element.querySelectorAll('input[type="password"]')

        // guardo las contraseñas que hay en los inputs
        let passwords = []
        for (const input of inputsPassword) {
            if (passwords.includes(input.value) === false) {
                passwords.push(input.value)
            }
        }

        if (passwords.length == 1) {
            // esta bien ya que solo encontramos una contraseña
            for (const input of inputsPassword) {
                input.setCustomValidity('')
            }
        } else {
            // esta mal ya que no es igual
            for (const input of inputsPassword) {
                input.setCustomValidity('Las password no coinciden')
            }
        }

    }

    attachEventListeners() {
        this.element.addEventListener('submit', async function (event) {
            event.preventDefault()
            PubSub.publish(PubSub.events.SHOW_LOADING)

            if (this.checkValidity()) {
                try {
                    const data = new FormData(this)
                    const username = data.get('username')
                    const password = data.get('password')
                    const result = await DataService.registerUser(username, password)
                    PubSub.publish(PubSub.events.SHOW_SUCCESS_SIGNUP, 'Registrado!')
                    // desactivamos el boton para no intentar crear el mismo usuario y genere error
                    this.querySelector('button').setAttribute('disabled', true)
                } catch (error) {
                    PubSub.publish(PubSub.events.SHOW_ERROR, error)
                    // desactivamos el boton para forzar cambio en el siguiente intento
                    this.querySelector('button').setAttribute('disabled', true)
                } finally {
                    PubSub.publish(PubSub.events.HIDE_LOADING)
                }
            } else {
                // si no valida, mostrar un mensaje de error
                let errorMessage = ''
                for (const element of this.elements) {
                    if (element.validity.valid === false) {
                        errorMessage += `Error en el campo ${element.name}: ${element.validationMessage}. `
                    }
                }
                PubSub.publish(PubSub.events.SHOW_ERROR, errorMessage)
            }

        })

        // establecer la validación personalizada de los input de tipo password
        // for (const input of this.element.querySelectorAll('input[type="password"]'))
        this.element.querySelectorAll('input[type="password"]').forEach(input => {
            input.addEventListener('input', () => {
                this.checkIfAllPasswordsAreEqual()
            })
        })

        // controlamos cambios en cada uno de los inputs y validamos el formulario para activar o desactivar el botón
        this.element.querySelectorAll('input').forEach(inputElement => {
            // para cada input del formulario
            inputElement.addEventListener('input', () => {
                // cada vez que el usuario escriba en cada input
                if (this.element.checkValidity()) {
                    // si el formulario esta ok, habilitamos boton
                    this.element.querySelector('button').removeAttribute('disabled')
                } else {
                    // si no esta ok, deshabilitamos boton
                    this.element.querySelector('button').setAttribute('disabled', true)
                }
            })
        })

    }

}
