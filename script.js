

const addButton = document.querySelector('#add');

const updateLSData = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];

    textAreaData.forEach((note) => {
        return notes.push(note.value);
    });

    console.log(notes);

    localStorage.setItem('notes', JSON.stringify(notes));
};

const addNewNote = (text) => {
    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = `
        <div class="operation">
            <button class="edit"> <i class="fas fa-edit"> </i></button>
            <button class="delete"> <i class="fas fa-trash-alt"></i> </button>
        </div>
        <div class="main" ${text ? "" : "hidden"}>${text}</div>
        <textarea class="${text ? "hidden" : ""}">${text}</textarea>`;

    note.insertAdjacentHTML('afterbegin', htmlData);

    const editButton = note.querySelector('.edit');
    const delButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    delButton.addEventListener('click', () => {
        note.remove();
        updateLSData();
    });

    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
        if (!textArea.classList.contains('hidden')) {
            textArea.focus();
        }
    });

    textArea.addEventListener('input', () => {
        mainDiv.textContent = textArea.value; // Update mainDiv content when textarea is edited
        updateLSData();
    });

    document.body.appendChild(note);
};

const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) {
    notes.forEach((note) => addNewNote(note));
}

addButton.addEventListener('click', () => addNewNote());
