import { creaNota, creaNotaStructure, render } from './fn.js'
const $form = document.querySelector('form')
const $noteBox = document.querySelector('#notes-box')
const $filterBox = document.getElementById('filter')
const $searchbar = document.getElementById('searchBar')
const $pendingFilter = document.getElementById('pending')

const allNotes = JSON.parse(localStorage.getItem('notes')) || []
render(allNotes, $noteBox, creaNotaStructure) 

$form.addEventListener('submit', (e) => {
    e.preventDefault()
    let contenidoNota = e.target[0].value
    let newNote = creaNota(contenidoNota)
    allNotes.push(newNote)
    localStorage.setItem('notes', JSON.stringify(allNotes))
    render(allNotes, $noteBox, creaNotaStructure)
})
$noteBox.addEventListener('click', (e) => {
    let dataset = e.target.dataset
    if (dataset.changestate) {
        let note = allNotes.find(note => note.id === Number(dataset.changestate))
        note.state = !note.state
        localStorage.setItem('notes', JSON.stringify(allNotes))

        render(allNotes, $noteBox, creaNotaStructure)

    }
    if (dataset.delete) {
        let noteIndex = allNotes.findIndex(note => note.id === Number(dataset.delete))
        allNotes.splice(noteIndex, 1)
        localStorage.setItem('notes', JSON.stringify(allNotes))

        render(allNotes, $noteBox, creaNotaStructure)
    }
})
$filterBox.addEventListener('input', (e)=>{
    console.log($searchbar.value)
    console.log($pendingFilter.checked)

    let filtered = allNotes.filter( note => note.contenidoNota.toLowerCase().includes( $searchbar.value.toLowerCase() ) && (( !$pendingFilter.checked || $pendingFilter.checked != note.state ) ))
    render(filtered, $noteBox, creaNotaStructure)

})