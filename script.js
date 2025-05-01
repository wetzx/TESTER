document.addEventListener('DOMContentLoaded', () => {
  const createContainer = document.getElementById('create-container');
  const linkContainer = document.getElementById('link-container');
  const createNoteButton = document.getElementById('create-note');
  const showOptionsButton = document.getElementById('show-options');
  const noteContent = document.getElementById('note-content');
  const noteLink = document.getElementById('note-link');
  const copyLinkButton = document.getElementById('copy-link');
  const createNewButton = document.getElementById('create-new');

  // Check if all elements exist
  if (!createNoteButton || !noteContent || !noteLink) {
    console.error('Required elements not found!');
    return;
  }

  // Create a new note
  createNoteButton.addEventListener('click', async () => {
    const content = noteContent.value.trim();
    if (!content) {
      alert('Please enter a note before creating.');
      return;
    }

    try {
      console.log('Creating note...');
      const response = await fetch('/.netlify/functions/create-note', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error creating note:', errorData);
        alert(`Failed to create note. Please try again. (${errorData.error})`);
        return;
      }

      const data = await response.json();
      console.log('Note created with ID:', data.id);
      
      // Generate the link
      const link = `${window.location.origin}/view/${data.id}`;
      noteLink.value = link;
      
      // Show the link container and hide the create container
      createContainer.style.display = 'none';
      linkContainer.style.display = 'block';
    } catch (error) {
      console.error('Error creating note:', error);
      alert(`Failed to create note. Please try again. (${error.message})`);
    }
  });

  // Copy the link to clipboard
  if (copyLinkButton) {
    copyLinkButton.addEventListener('click', () => {
      noteLink.select();
      document.execCommand('copy');
      alert('Link copied to clipboard!');
    });
  }

  // Create a new note
  if (createNewButton) {
    createNewButton.addEventListener('click', () => {
      noteContent.value = '';
      createContainer.style.display = 'block';
      linkContainer.style.display = 'none';
    });
  }

  // Show options
  if (showOptionsButton) {
    showOptionsButton.addEventListener('click', () => {
      alert('Options shown! (This is just a demo)');
    });
  }
});
