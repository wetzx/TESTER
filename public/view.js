document.addEventListener('DOMContentLoaded', async () => {
  const noteContent = document.getElementById('note-content');
  const id = window.location.pathname.split('/').pop();

  try {
    const response = await fetch(`/.netlify/functions/create-note?id=${id}`);
    if (response.ok) {
      const data = await response.json();
      noteContent.textContent = data.content;
    } else {
      noteContent.textContent = 'This note has already been viewed or does not exist.';
    }
  } catch (error) {
    console.error('Error fetching note:', error);
    noteContent.textContent = 'An error occurred while fetching the note.';
  }
});

window.addEventListener('beforeunload', () => {
  return 'Are you sure you want to leave? This note will be destroyed.';
});
