document.addEventListener('DOMContentLoaded', () => {
  const createNoteButton = document.getElementById('create-note');
  const showOptionsButton = document.getElementById('show-options');
  const noteContent = document.getElementById('note-content');
  const linkContainer = document.getElementById('link-container');
  const noteLink = document.getElementById('note-link');

  createNoteButton.addEventListener('click', async () => {
    const content = noteContent.value.trim();
    if (content) {
      try {
        const response = await fetch('/api/notes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content }),
        });
        const data = await response.json();
        const link = `${window.location.origin}/view/${data.id}`;
        noteLink.value = link;
        linkContainer.style.display = 'block';
        noteContent.value = '';
      } catch (error) {
        console.error('Error creating note:', error);
        alert('Failed to create note. Please try again.');
      }
    } else {
      alert('Please enter a note before creating.');
    }
  });

  showOptionsButton.addEventListener('click', () => {
    alert('Options shown! (This is just a demo)');
  });
});
