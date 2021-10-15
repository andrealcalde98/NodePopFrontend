export default {

    parseAd: function (ad) {
        ad.nombre = ad.nombre
        ad.precio = ad.precio
        ad.estado = ad.estado
        ad.foto = ad.foto
        ad.author = ad.user.username
        ad.canBeDeleted = ad.userId === this.getAuthUserId()
        return ad
    },


    getads: async function () {
        const url = 'http://localhost:8000/api/anuncios?_expand=user'
        const response = await fetch(url)
        if (response.ok) {
            const ads = await response.json()
            // Evaluamos si el obj esta vacio, si lo esta tratamos el error
            if (ads.length !== 0) {
                return ads.map(ad => this.parseAd(ad))
            } else {
                throw new Error('No existen anuncios')
            }
        }
        else {
            throw new Error('Imposible recuperar los anuncios :(')
        }
    },


    getAdDetail: async function (adID) {
        const url = `http://localhost:8000/api/anuncios/${adID}?_expand=user`
        const response = await fetch(url)
        if (response.ok) {
            const ad = await response.json()
            if (ad.length !== 0) {
                return this.parseAd(ad)
            } else {
                throw new Error('No existe este anuncios')
            }
        } else {
            throw new Error('Error al cargar el anuncio')
        }
    },

    createAd: async function (name, status, price) {
        const url = 'http://localhost:8000/api/anuncios'
        return await this.post(url, { nombre: name, estado: status, precio: price })
    },

    delete: async function (url, body = {}) {
        return await this.request('DELETE', url, body)
    },

    post: async function (url, body) {
        return await this.request('POST', url, body)
    },

    put: async function (url, body) {
        return await this.request('PUT', url, body)
    },

    request: async function (method, url, body) {
        const requestConfig = {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }
        if (this.isAuthenticed()) {
            const token = localStorage.getItem('AUTH_TOKEN')
            // requestConfig.headers.Authorization = `Bearer ${token}`
            requestConfig.headers['Authorization'] = `Bearer ${token}`
        }
        const response = await fetch(url, requestConfig)
        try {
            const data = await response.json()
            if (response.ok) {
                return data
            } else {
                throw new Error(data.message)
            }
        } catch (error) {
            throw error
        }
    },

    login: async function (username, password) {
        const url = 'http://localhost:8000/auth/login'
        const data = await this.post(url, { username, password })
        // Obtenemos el token de acceso
        const token = data.accessToken
        // Añadimos el token al navegador con el nombre ATH_TOKEN
        localStorage.setItem('AUTH_TOKEN', token)
    },


    registerUser: async function (username, password) {
        const url = 'http://localhost:8000/auth/register'
        return await this.post(url, { username, password })
    },

    isAuthenticed: function () {
        return localStorage.getItem('AUTH_TOKEN') !== null
    },

    deleteAd: async function (adID) {
        const url = `http://localhost:8000/api/anuncios/${adID}`
        return await this.delete(url)
    },

    getAuthUserId: function () {
        const token = localStorage.getItem('AUTH_TOKEN')
        if (token === null) {
            return null
        }
        const b64Parts = token.split('.')
        if (b64Parts.length !== 3) {
            return null
        }
        const b64Data = b64Parts[1]
        try {
            const userJSON = atob(b64Data)
            const user = JSON.parse(userJSON)
            return user.userId
        } catch (error) {
            console.error('Error while decoding JWT Token', error)
            return null
        }
    }

}
