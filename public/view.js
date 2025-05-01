document.addEventListener('DOMContentLoaded', async () => {
  const noteContent = document.getElementById('note-content');
  const id = window.location.pathname.split('/').pop();

  try {
    const response = await fetch(`/api/notes/${id}`);
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
  // This message won't actually be shown in modern browsers,
  // but it will trigger the confirmation dialog
  return 'Are you sure you want to leave? This note will be destroyed.';
});
