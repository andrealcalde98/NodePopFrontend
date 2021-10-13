export function adView(ad) {
    return `<a href="/detail.html?id=${ad.id}">
    <dt> <img src="${ad.foto}" alt="no picture"></img> </dt>
     <dt>
        <b>
           <p>${ad.nombre}</p>
        </b>
    </dt>
    <dd> Estado: ${ad.estado}</dd>
    <dd> Precio: ${ad.precio}€</dd>
    </a>`
}

export function errorView(message) {
    return `<div class="error">
        ${message}
        <button>Cerrar</button>
    </div>`
}

export function successView(message) {
    return `<div class="success">
        ${message}
        <button>Cerrar</button>
    </div>`
}

export function loaderView() {
    return '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>'
}

export function adDetailView(ad) {
    return `
        <div class="detailPhoto"> <img src="${ad.foto}" alt="no picture"></img> </div>
        <div class="detailInfo">
        <p style="font-size:2em">${ad.precio}€</p><br><hr>
            <p style="font-size:1.5em">${ad.nombre}</p>
            <p style="font-size:1.5em">Estado: ${ad.estado}</p>
        </div>
    `
}