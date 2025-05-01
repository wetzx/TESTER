import { v4 as uuidv4 } from 'uuid';

const notes = new Map();

export async function handler(event) {
  if (event.httpMethod === 'POST') {
    const { content } = JSON.parse(event.body);
    const id = uuidv4();
    notes.set(id, content);
    return {
      statusCode: 200,
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json"
      }
    };
  } else if (event.httpMethod === 'GET') {
    const id = event.queryStringParameters.id;
    if (notes.has(id)) {
      const content = notes.get(id);
      notes.delete(id);
      return {
        statusCode: 200,
        body: JSON.stringify({ content }),
        headers: {
          "Content-Type": "application/json"
        }
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Note not found or already viewed' }),
        headers: {
          "Content-Type": "application/json"
        }
      };
    }
  }

  return {
    statusCode: 405,
    body: 'Method Not Allowed'
  };
}
