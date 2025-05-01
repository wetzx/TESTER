document.addEventListener('DOMContentLoaded', () => {
  const createNoteButton = document.getElementById('create-note');
  const showOptionsButton = document.getElementById('show-options');
  const noteContent = document.getElementById('note-content');

  createNoteButton.addEventListener('click', () => {
    alert('Note created! (This is just a demo)');
    noteContent.value = '';
  });

  showOptionsButton.addEventListener('click', () => {
    alert('Options shown! (This is just a demo)');
  });
});
