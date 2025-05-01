document.addEventListener('DOMContentLoaded', () => {
  const createNoteButton = document.getElementById('create-note');
  const showOptionsButton = document.getElementById('show-options');
  const noteContent = document.getElementById('note-content');
  const linkContainer = document.getElementById('link-container');
  const noteLink = document.getElementById('note-link');

  if (!createNoteButton) {
    console.error('createNoteButton element not found!');
    return;
  }

  if (!noteLink) {
    console.error('noteLink element not found!');
    return;
  }

  createNoteButton.addEventListener('click', async () => {
    console.log('Create note button clicked!'); // Add this line
    const content = noteContent.value.trim();
    if (content) {
      try {
        const response = await fetch('/.netlify/functions/create-note', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error creating note:', errorData);
          alert(`Failed to create note. Status: ${response.status}, Error: ${errorData.error}`);
          return;
        }

        const data = await response.json();
        const link = `${window.location.origin}/view/${data.id}`;
        noteLink.value = link;
        linkContainer.style.display = 'block';
        noteContent.value = '';
      } catch (error) {
        console.error('Error creating note:', error);
        alert(`Failed to create note. Please try again. Details: ${error.message}`);
      }
    } else {
      alert('Please enter a note before creating.');
    }
  });

  showOptionsButton.addEventListener('click', () => {
    alert('Options shown! (This is just a demo)');
  });
});
