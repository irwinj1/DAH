//variables globales

const formulario = document.querySelector('#frmEstudiante')
const list = document.querySelector('.lista')
const contenidoListas = document.querySelector('.listas')
let estudiantes = []


//funcion listener
Listeners()

function Listeners() {
    formulario.addEventListener('submit',capturarEstudiante)
    document.addEventListener('DOMContentLoaded',()=>{
       estudiantes = JSON.parse(localStorage.getItem('estudiantes'))
       mostrarContenido(estudiantes)
    })
}
//metodos o funcionalidad
function mostrarContenido(data){
    limpiarHtml()
    if (data) {
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
            const eliminar = document.createElement('p')
            eliminar.textContent = 'x'
            eliminar.onclick = ()=>{
                elimarEstudiante(estudiante.id);
            }
            eliminar.classList.add('eliminar')
            cardBody.appendChild(h2)
            cardBody.appendChild(p)
            cardBody.appendChild(span)
            cardBody.appendChild(eliminar)
            card.appendChild(cardBody)
            contenidoListas.appendChild(card)
            
        })
    }else{
        const nodata = document.createElement('p')
        nodata.textContent='No tienes estudiantes registrados'
        contenidoListas.appendChild(nodata)
    }
    

 
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
        id: Date.now(),
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
            estudiantes.push(objEstudiante)
            mostrarContenido(estudiantes)
            localStorage.setItem('estudiantes', JSON.stringify(estudiantes))
            //console.log(estudiantes);
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

function elimarEstudiante(id){
    //console.log(id);
    estudiantes = estudiantes.filter(estudiante=> estudiante.id !== id)
    mostrarContenido(estudiantes)

}
function limpiarHtml(){
    while(contenidoListas.firstChild){
        contenidoListas.removeChild(contenidoListas.firstChild)
    }
}