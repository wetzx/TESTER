document.addEventListener('DOMContentLoaded', async () => {
  const noteContainer = document.getElementById('note-container');
  const noteContent = document.getElementById('note-content');
  const noteError = document.getElementById('note-error');
  const createNewButton = document.getElementById('create-new');
  
  // Get the note ID from the URL
  const noteId = window.location.pathname.split('/').pop();
  
  if (!noteId) {
    showError();
    return;
  }
  
  try {
    console.log('Fetching note with ID:', noteId);
    const response = await fetch(`/.netlify/functions/create-note?id=${noteId}`);
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      showError();
      return;
    }
    
    const data = await response.json();
    console.log('Note retrieved successfully');
    
    if (data.content) {
      noteContent.textContent = data.content;
    } else {
      showError();
    }
  } catch (error) {
    console.error('Error fetching note:', error);
    showError();
  }
  
  // Show error message
  function showError() {
    noteContent.style.display = 'none';
    noteError.style.display = 'block';
  }
  
  // Create a new note
  if (createNewButton) {
    createNewButton.addEventListener('click', () => {
      window.location.href = '/';
    });
  }
  
  // Warn before leaving the page
  window.addEventListener('beforeunload', (event) => {
    const message = 'Are you sure you want to leave? This note will be destroyed.';
    event.returnValue = message;
    return message;
  });
});
