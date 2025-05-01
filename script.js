document.addEventListener('DOMContentLoaded', () => {
  const createNoteContainer = document.getElementById('create-note-container');
  const noteLinkContainer = document.getElementById('note-link-container');
  const viewNoteContainer = document.getElementById('view-note-container');
  const createNoteButton = document.getElementById('create-note');
  const noteContent = document.getElementById('note-content');
  const errorMessage = document.getElementById('error-message');
  const noteLinkInput = document.getElementById('note-link');
  const copyLinkButton = document.getElementById('copy-link');
  const createNewNoteButton = document.getElementById('create-new-note');
  const noteContentView = document.getElementById('note-content-view');

  function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  function saveNote(note) {
    const id = generateUniqueId();
    localStorage.setItem(id, JSON.stringify(note));
    return id;
  }

  function getNote(id) {
    const note = localStorage.getItem(id);
    if (note) {
      localStorage.removeItem(id);
      return JSON.parse(note);
    }
    return null;
  }

  createNoteButton.addEventListener('click', () => {
    if (noteContent.value.trim() === '') {
      errorMessage.classList.remove('hidden');
    } else {
      errorMessage.classList.add('hidden');
      const note = {
        content: noteContent.value,
        selfDestruct: document.getElementById('self-destruct-option').value,
        noConfirmation: document.getElementById('no-confirmation').checked,
        password: document.getElementById('manual-password').value,
        notificationEmail: document.getElementById('notification-email').value,
        referenceName: document.getElementById('reference-name').value
      };
      const id = saveNote(note);
      const noteLink = `${window.location.href}#${id}`;
      noteLinkInput.value = noteLink;
      createNoteContainer.classList.add('hidden');
      noteLinkContainer.classList.remove('hidden');
    }
  });

  copyLinkButton.addEventListener('click', () => {
    noteLinkInput.select();
    document.execCommand('copy');
  });

  createNewNoteButton.addEventListener('click', () => {
    noteContent.value = '';
    document.getElementById('manual-password').value = '';
    document.getElementById('confirm-password').value = '';
    document.getElementById('notification-email').value = '';
    document.getElementById('reference-name').value = '';
    noteLinkContainer.classList.add('hidden');
    createNoteContainer.classList.remove('hidden');
  });

  function showNote(id) {
    const note = getNote(id);
    if (note) {
      noteContentView.textContent = note.content;
      createNoteContainer.classList.add('hidden');
      noteLinkContainer.classList.add('hidden');
      viewNoteContainer.classList.remove('hidden');
    } else {
      noteContentView.textContent = 'This note has already been viewed or does not exist.';
    }
  }

  // Check if there's a note ID in the URL
  const hashId = window.location.hash.substr(1);
  if (hashId) {
    showNote(hashId);
  }
});
