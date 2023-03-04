//variables globales

const formulario = document.querySelector('#frmEstudiante')
const list = document.querySelector('.lista')
const contenidoListas = document.querySelector('.listas')
let estudiantes = []


//funcion listener
Listeners()

function Listeners() {
    formulario.addEventListener('submit',capturarEstudiante)
    document.addEventListener('DOMContentLoaded',mostrarContenido(estudiantes))
}
//metodos o funcionalidad
function mostrarContenido(data){
    limpiarHtml()
    data.forEach((estudiante)=>{
        const card = document.createElement('div')
        card.classList.add('card')
        const cardBody = document.createElement('div')
        cardBody.classList.add('card-body')
        const h2 = document.createElement('h2')
        h2.textContent = estudiante.nombre+' '+estudiante.apellido 
        h2.classList.add('card-title')
        const p = document.createElement('p')
        p.textContent = estudiante.email
        p.classList.add('card-text')
        const span = document.createElement('span')
        span.textContent = estudiante.telefono
        cardBody.appendChild(h2)
        cardBody.appendChild(p)
        cardBody.appendChild(span)
        card.appendChild(cardBody)
        contenidoListas.appendChild(card)
        
    })

 
}
function capturarEstudiante(event){
    event.preventDefault()
    const nombre = document.querySelector('#nombre').value
    const apellido = document.querySelector('#apellido').value
    const email = document.querySelector('#email').value
    const tel = document.querySelector('#tel').value
  
    
    if (!nombre ||!apellido || !email || !tel) {
        alert('Los campos son obligatorios')
        return
    }
    console.log(tel.length);
    for (let index = 0; index < tel.length; index += 1) {
        if (/^[a-zA-Z]+$/.test(tel[index]) || tel.length >8) {
            document.querySelector('#tel').classList.add('invalid')
            alert('El numero de telefono es invalido')
           
            return
        }
        
    }
    if (!/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(email)) {
        document.querySelector('#email').classList.add('invalid')
        alert('El email no es valido')
    }

    
    document.querySelector('#tel').classList.remove('invalid')
    document.querySelector('#email').classList.remove('invalid')
    const objEstudiante ={
        nombre: nombre,
        apellido:apellido,
        email: email,
        telefono:tel
    }
    swal.fire({
        title: 'Queres agregar el estudiante?',
        showDenyButton: true,
        
        confirmButtonText: 'Guardar',
        denyButtonText: `No guardar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            estudiantes = [...estudiantes, objEstudiante]
        mostrarContenido(estudiantes)
        console.log(estudiantes);
        document.querySelector('#nombre').value = ''
        document.querySelector('#apellido').value = ''
        document.querySelector('#email').value = ''
        document.querySelector('#tel').value = ''
          Swal.fire('Estudiante guardado!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('No se agregego al estudiante', '', 'error')
        }
      })
  
    
}

function limpiarHtml(){
    while(contenidoListas.firstChild){
        contenidoListas.removeChild(contenidoListas.firstChild)
    }
}