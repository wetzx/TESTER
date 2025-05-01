const { v4: uuidv4 } = require('uuid');

// In-memory storage (will be lost on function restart)
// For production, use a database like Fauna, Supabase, etc.
const notes = {};

exports.handler = async function(event, context) {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
  };

  // Handle OPTIONS request (CORS preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Create a new note
    if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body);
      const noteId = uuidv4();
      
      if (!body.content) {
        return {
          statusCode: 400,
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'Note content is required' })
        };
      }
      
      notes[noteId] = body.content;
      
      console.log(`Note created with ID: ${noteId}`);
      
      return {
        statusCode: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: noteId })
      };
    }
    
    // Retrieve a note
    if (event.httpMethod === 'GET') {
      const noteId = event.queryStringParameters?.id;
      
      if (!noteId) {
        return {
          statusCode: 400,
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'Note ID is required' })
        };
      }
      
      if (!notes[noteId]) {
        return {
          statusCode: 404,
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'Note not found or already viewed' })
        };
      }
      
      const content = notes[noteId];
      delete notes[noteId]; // Delete after reading
      
      console.log(`Note retrieved and deleted: ${noteId}`);
      
      return {
        statusCode: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      };
    }
    
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  } catch (error) {
    console.error('Function error:', error);
    
    return {
      statusCode: 500,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal server error', details: error.message })
    };
  }
};
