export function creaNota(contenidoNota) { 
    return {
        id: new Date().getTime(),
        contenidoNota,
        state: false
    }
}
export function creaNotaStructure({ id, contenidoNota, state }) {
    let article = document.createElement('article') //creaelemento article
    article.className = 'note'

    let div = document.createElement('div')
    div.className = 'btns'

    let label = document.createElement('label')
    label.setAttribute('for', 'check-done')
    label.setAttribute('data-cambiostate', id)

    label.textContent = state === false ? 'Pending ' : 'Done ' //check de pending o false

    let buttonX = document.createElement('button')
    buttonX.className = 'btn-x'
    buttonX.setAttribute('data-delete', id)
    buttonX.textContent = 'x'
    div.append(label, buttonX)

    let checkbox = document.createElement('input')
    checkbox.setAttribute('data-cambiostate', id)  //tipo de datp
    checkbox.setAttribute('type', 'checkbox')
    checkbox.setAttribute('name', 'check-done')
    checkbox.setAttribute('id', 'check-done')
    checkbox.checked = state
    label.append(checkbox)

 

    let contentDiv = document.createElement('div')
    contentDiv.className = 'content-note'
    let p = document.createElement('p')
    p.textContent = contenidoNota
    contentDiv.append(p)

    article.append(div, contentDiv)
    return article
}
export function render(array, container, fn) {
    container.innerHTML = ''
    let fragment = document.createDocumentFragment()
    array.forEach(note => {
        let element = fn(note)
        fragment.appendChild(element)
    });
    container.appendChild(fragment)
}