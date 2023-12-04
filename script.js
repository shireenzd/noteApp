let categoryToClassesMap = {
  home:"bg-red-200",
  hobbies:"bg-green-200",
  work:"bg-yellow-200"
};

let notesContainer = document.querySelector('.notes-container');
let notes = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];

updateNotesArray(notes)
function updateUINotesContainer(notesToDisplay = null) {
  notesToDisplay = notesToDisplay || notes
  notesContainer.innerHTML = ''
  notesToDisplay.forEach(function (noteItem) {
    let noteHTML = generatNoteHTML(noteItem);
    notesContainer.innerHTML += noteHTML;
  });
}

function generatNoteHTML(noteItem) {
  return `
  <div class="flex items-center ${categoryToClassesMap[noteItem.category]} gap-5 p-4 rounded-md bg-gray-200 relative">
      <div class="h-12 w-12 overflow-hidden rounded-full">
          <img src="${noteItem.profile}" alt="" />
      </div>
      <p>${noteItem.content}</p>
      <div class="actions absolute top-4 right-4 flex gap-3">
        <p class="rounded-full h-8 w-8 p-3 bg-white flex justify-center items-center cursor-pointer">
          <span onclick="editNote('${noteItem.id}')"> edit </span>
        </p>
        <p class="rounded-full h-8 w-8 p-3 bg-white flex justify-center items-center cursor-pointer">
          <span onclick="deleteNote('${noteItem.id}')">X</span>
        </p>
      </div>
  </div>
  `;
}

function deleteNote(noteID){
  let newNotes = notes.filter(function(note){
    // if same ID that we want to delete, return false
    if(noteID === note.id){
      return false;
    } else {
      return true;
    }
  })
  updateNotesArray(newNotes)
}

let textAreaInput = document.querySelector('textarea')
let textAreaInputError = document.querySelector('#text-area-error')

let categoryInput = document.querySelector('#category')
let categoryInputError = document.querySelector('#category-input-error')

function addNote(){
  let contentValid = validateTextAreaInput();
  let priorityValid = validatePriorityInput();
  let categoryValid = validateCategoryInput();
  // validate user inputs
  if(contentValid &&  priorityValid && categoryValid){
    let priorityInputValue = document.querySelector('input[name="priority"]:checked').value
    let newNote = {
      id : noteBeingEdited?.id ? noteBeingEdited.id : generateNoteID(),
      profile: 'profile.webp'
    };
    newNote.content = textAreaInput.value
    newNote['priority'] = priorityInputValue
    newNote['category'] = categoryInput.value
    
    // push to notes array
    updateNotesArray([...notes, newNote]);
    populateFormInputs();
  }
  
}

function generateNoteID(){
  // We can use Math.random()
  return Date.now().toString();
}

function validateTextAreaInput (){
  if(!textAreaInput.value){
    textAreaInputError.classList.remove('hidden')
    return false;
  }
  textAreaInputError.classList.add('hidden')
  return true;
}

function validatePriorityInput(){
  let priorityInputValue = document.querySelector('input[name="priority"]:checked')?.value
  let priorityInputError = document.querySelector('#priority-input-error')
  if(!priorityInputValue){
    priorityInputError.classList.remove('hidden')
    return false;
  }
  priorityInputError.classList.add('hidden')
  return true;
}

function validateCategoryInput(){
  if(!categoryInput.value){
    categoryInputError.classList.remove('hidden')
    return false;
  }
  categoryInputError.classList.add('hidden')
  return true;
}

let noteBeingEdited;
function editNote (noteID){
  // get note
  noteBeingEdited = notes.find(function(note){
    return noteID === note.id
  })
  if(!noteBeingEdited){
    return;
  }
  
  // remove from notes array
  deleteNote(noteID)
  
  // populate in inputs
  populateFormInputs(noteBeingEdited)
}

function populateFormInputs(noteObject = {}){
  // content
  textAreaInput.value = noteObject.content || '';
  // priority
  // document.querySelectorAll('input[type=radio]')[4].value
  document.querySelectorAll('input[name="priority"]').forEach(function(radioInput){
    if(radioInput.value == noteObject.priority){
      radioInput.checked = true;
    } else {
      radioInput.checked = false;
    }
  })
  
  // category
  categoryInput.value = noteObject.category || ''
  
}

function updateNotesArray (notesArray=[]){
  notes = notesArray
  localStorage.setItem('notes', JSON.stringify(notes))
  // reflect changes to UI
  // never call outside of this function
  updateUINotesContainer();
}

function sortNotesAsc(){
  let sortedNotesArray = notes.sort(function(a,b){
    return a.priority-b.priority
  })
  updateNotesArray(sortedNotesArray)
}
function sortNotesDesc(){
  let sortedNotesArray = notes.sort(function(a,b){
    return b.priority-a.priority
  })
  updateNotesArray(sortedNotesArray)
}

function filterNotesByCategory(){
  let filteredArray = notes.filter(function(noteItem){
    if(!this.event.target.value || noteItem.category == this.event.target.value){
      return true;
    }
    return false;
  })
  
  updateUINotesContainer(filteredArray)
}