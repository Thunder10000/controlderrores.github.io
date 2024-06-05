class SinPropiedadError extends Error {
    constructor(propiedad) {
        super(`La propiedad "${propiedad}" no existe.`);
        this.name = "SinPropiedadError";
    }
}

class NombreNull extends Error {
    constructor() {
        super("El nombre es null.");
        this.name = "NombreNull";
    }
}

class IdError extends Error {
    constructor(id) {
        super(`El id "${id}" no es un número.`);
        this.name = "IdError";
    }
}

const BaseDeDatosFalsa = [
    { id: "a", nombre: "Juan", apellido: "Perez", edad: 66, profecion: "Ing Mecanico" },
    { id: 2, nombre: "Sofía", apellido: "Rodríguez", edad: 22, profecion: "Lic Marketing Digital" },
    { id: 3, nombre: "Mariana", apellido: "García", edad: 33, profecion: "Ing Sistemas Computacionales" },
    { id: 4, nombre: null, apellido: "Martínez", edad: 18, profecion: "Ing Industrial" },
    { id: 5, nombre: "Valentina", apellido: "Gómez", edad: 26, profecion: "Lic Derecho" },
    { id: 6, nombre: "Alejandro", apellido: "Flores", edad: 17 }
];

const validarObjeto = (obj) => {
    if (isNaN(obj.id)) throw new IdError(obj.id);
    if (obj.nombre === null) throw new NombreNull();
    ['apellido', 'edad', 'profecion'].forEach(prop => {
        if (!obj.hasOwnProperty(prop)) throw new SinPropiedadError(prop);
    });
    return "Todos los datos son correctos.";
};

document.addEventListener('DOMContentLoaded', () => {
    const resultadoDiv = document.getElementById('resultado');
    const buscarBtn = document.getElementById('buscarBtn');
    const inputId = document.getElementById('inputId');

    buscarBtn.addEventListener('click', () => {
        resultadoDiv.innerHTML = ''; // Limpiar resultados anteriores
        const idBuscado = inputId.value;
        const objetoEncontrado = BaseDeDatosFalsa.find(obj => obj.id == idBuscado);

        if (objetoEncontrado) {
            try {
                const resultado = validarObjeto(objetoEncontrado);
                const resultadoDivMensaje = document.createElement('div');
                resultadoDivMensaje.textContent = resultado;
                resultadoDivMensaje.classList.add('correcto'); // Añadir clase correcto
                resultadoDiv.appendChild(resultadoDivMensaje);
            } catch (error) {
                if (error instanceof Error) {
                    const errorDiv = document.createElement('div');
                    errorDiv.classList.add('error');
                    errorDiv.textContent = error.message;
                    resultadoDiv.appendChild(errorDiv);
                }
            }
        } else {
            const errorDiv = document.createElement('div');
            errorDiv.classList.add('error');
            errorDiv.textContent = `No se encontró ningún registro con el id "${idBuscado}".`;
            resultadoDiv.appendChild(errorDiv);
        }
    });
});
