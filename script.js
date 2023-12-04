let notesContainer = document.querySelector('.notes-container');
let notes = [
  {
    id: '1',
    content: 'random text 1',
    priority: 1,
    category: 'home',
    profile: 'images/5987424.png'
  },
  {
    id: '2',
    content: 'random text 2',
    priority: 1,
    category: 'hobbies',
    profile: 'images/5987424.png'
  },
  {
    id: '3',
    content: 'random text 3',
    priority: 1,
    category: 'work',
    profile: 'images/5987424.png'
  }
];

updateUINotesContainer();
function updateUINotesContainer() {
  notesContainer.innerHTML = ''
  notes.forEach(function (noteItem) {
    let noteHTML = generatNoteHTML(noteItem);
    notesContainer.innerHTML += noteHTML;
  });
}

function generatNoteHTML(noteItem) {
  return `
  <div class="flex items-center gap-5 p-4 rounded-md bg-gray-200 relative">
      <div class="h-12 w-12 overflow-hidden rounded-full">
          <img src="${noteItem.profile}" alt="" />
      </div>
      <p>${noteItem.content}</p>
      <p class="absolute top-4 right-4 rounded-full h-8 w-8 p-3 bg-white flex justify-center items-center cursor-pointer"><span onclick="deleteNote('${noteItem.id}')">X</span></p>
  </div>
  `;
}

function deleteNote(noteID){
  notes = notes.filter(function(note){
    // if same ID that we want to delete, return false
    if(noteID === note.id){
      return false;
    } else {
      return true;
    }
  })
  updateUINotesContainer();
}

let textAreaInput = document.querySelector('textarea')
let textAreaInputError = document.querySelector('#text-area-error')

let categoryInput = document.querySelector('select')
let categoryInputError = document.querySelector('#category-input-error')

function addNote(){
  let contentValid = validateTextAreaInput();
  let priorityValid = validatePriorityInput();
  let categoryValid = validateCategoryInput();
  // validate user inputs
  if(contentValid &&  priorityValid && categoryValid){
    let priorityInputValue = document.querySelector('input[name="priority"]:checked').value
    let newNote = {
      id : generateNoteID(),
      profile: 'profile.webp'
    };
    newNote.content = textAreaInput.value
    newNote['priority'] = priorityInputValue
    newNote['category'] = categoryInput.value
    
    // push to notes array
    notes.push(newNote)
    updateUINotesContainer();
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
