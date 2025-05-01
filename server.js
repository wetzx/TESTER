import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const notes = new Map();

app.post('/api/notes', (req, res) => {
  const id = uuidv4();
  notes.set(id, req.body.content);
  res.json({ id });
});

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  if (notes.has(id)) {
    const content = notes.get(id);
    notes.delete(id);
    res.json({ content });
  } else {
    res.status(404).json({ error: 'Note not found or already viewed' });
  }
});

app.get('/view/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'view.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
