
let notesContainer = document.querySelector('.notes-container');
const notes = [
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
      <p class="absolute top-4 right-4 rounded-full h-8 w-8 p-3 bg-white flex justify-center items-center cursor-pointer"><span>X</span></p>
  </div>
  `;
}
