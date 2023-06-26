const resultados = document.querySelector("#resultado");
const year = document.querySelector("#year");
const marca = document.querySelector("#marca");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");
const maxYear = new Date().getFullYear();
const minYear = maxYear - 14;


// parámetros de búsqueda 
const dataSearch = {
    marca: "",
    year: "",
    minimo: "",
    maximo: "",
    puertas: "",
    transmision: "",
    color: ""
}


document.addEventListener('DOMContentLoaded', () => {

    // llenar componentes con datos
    mostrarCarros(autos);
    fillYears();
})

// eventos a los selects

marca.addEventListener('change', (e) => {
    dataSearch['marca'] = e.target.value;
    filtrarAutos();

});

year.addEventListener('change', (e) => {
    dataSearch['year'] = parseInt(e.target.value);
    filtrarAutos();
})

minimo.addEventListener('change', (e) => {
    dataSearch['minimo'] = parseInt(e.target.value);
    filtrarAutos();
})
maximo.addEventListener('change', (e) => {
    dataSearch['maximo'] = parseInt(e.target.value);
    filtrarAutos();
})

puertas.addEventListener('change', (e) => {
    dataSearch['puertas'] = parseInt(e.target.value);
    filtrarAutos();
})

color.addEventListener('change', (e) => {
    dataSearch['color'] = e.target.value;
    filtrarAutos();
})

transmision.addEventListener('change', (e) => {
    dataSearch['transmision'] = e.target.value;
    filtrarAutos();
})

function fillYears() {
    for (let i = maxYear; i > minYear; i--) {
        option = document.createElement('option')
        option.value = i;
        option.textContent = i
        year.appendChild(option);
    }
}

function mostrarCarros(autos) {

    limpiarResultados()

    autos.forEach(auto => {
        let {
            marca,
            modelo,
            year,
            precio,
            puertas,
            color,
            transmision
        } = auto

        mostrarHTML = document.createElement('p');
        mostrarHTML.textContent = `
        ${marca} ${modelo} - ${year} - ${puertas} PUERTAS - TRANSMISIÓN: ${transmision} - PRECIO: ${precio} - COLOR: ${color}
        `;

        resultados.appendChild(mostrarHTML)
    });

}

function filtrarAutos() {
    let resultados = autos.filter(filtrarMarcas)
                            .filter(filterYear)
                                .filter(filterMinimo)
                                    .filter(filterMaximo)
                                        .filter(filterPuertas)
                                            .filter(filterColor)
                                                .filter(filterTransmision);
    if(resultados.length)                                            
    mostrarCarros(resultados);    
    else
    noResultados()
}

function noResultados() {
    limpiarResultados()
    let respuesta0 = document.createElement('div');
    respuesta0.classList.add('alerta', 'error');
    respuesta0.textContent = "No se encontró ningún resultado"
    resultados.appendChild(respuesta0);
}

function limpiarResultados() {
    while(resultados.firstChild){
        resultados.removeChild(resultados.firstChild)
    }
}

function filtrarMarcas(auto){
    
    if(dataSearch.marca){
        return dataSearch.marca === auto.marca;
    }
    return auto;
}

function filterYear(auto) {
    
    if(dataSearch.year){
        return auto.year === dataSearch.year;
    }
    return auto;
}
function filterMinimo(auto) {
    if(dataSearch.minimo){
        return auto.precio >= dataSearch.minimo;
    }
    return auto;
}

function filterMaximo(auto) {
    if(dataSearch.maximo){
        return auto.precio <= dataSearch.maximo ;
    }
    return auto;
}

function filterPuertas(auto) {
    if(dataSearch.puertas){
        return auto.puertas === dataSearch.puertas;
    }
    return auto;
}
function filterColor(auto) {
    if(dataSearch.color){
        return auto.color === dataSearch.color;
    }
    return auto;
}

function filterTransmision(auto) {
    if(dataSearch.transmision){
        return auto.transmision === dataSearch.transmision;
    }
    return auto
}