// app.js

document.getElementById('save-note').addEventListener('click', function() {
    const title = document.getElementById('note-title').value;
    const content = document.getElementById('note-content').value;
    const link = document.getElementById('note-link').value;
    const type = document.getElementById('note-type').value;
    const timestamp = new Date().toLocaleString();
    const noteIndex = document.getElementById('note-index').value;

    if (title && content) {
        const note = {
            title,
            content,
            link,
            type,
            timestamp
        };

        if (noteIndex === '') {
            saveNoteToLocalStorage(note);
        } else {
            updateNoteInLocalStorage(noteIndex, note);
        }
        
        displayNotes();
        clearForm();
    } else {
        alert('Title and Content are required.');
    }
});

function saveNoteToLocalStorage(note) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
}

function updateNoteInLocalStorage(index, updatedNote) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes[index] = updatedNote;
    localStorage.setItem('notes', JSON.stringify(notes));
}

function deleteNoteFromLocalStorage(index) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

function editNoteInLocalStorage(index) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    const note = notes[index];

    document.getElementById('note-title').value = note.title;
    document.getElementById('note-content').value = note.content;
    document.getElementById('note-link').value = note.link;
    document.getElementById('note-type').value = note.type;
    document.getElementById('note-index').value = index;
}

function displayNotes() {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';

    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.setAttribute('data-index', index);
        
        noteElement.innerHTML = `
            <h2>${note.title} (${note.type})</h2>
            <p>${note.content}</p>
            ${note.link ? `<a href="${note.link}" target="_blank">${note.link}</a>` : ''}
            <p><small>${note.timestamp}</small></p>
            <button onclick="editNoteInLocalStorage(${index})">Edit</button>
            <button onclick="deleteNoteFromLocalStorage(${index})">Delete</button>
        `;
        
        notesList.appendChild(noteElement);
    });
}

function clearForm() {
    document.getElementById('note-title').value = '';
    document.getElementById('note-content').value = '';
    document.getElementById('note-link').value = '';
    document.getElementById('note-type').value = 'general';
    document.getElementById('note-index').value = '';
}

// Display notes on page load
document.addEventListener('DOMContentLoaded', displayNotes);

