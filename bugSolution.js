const http = require('http');

const requestListener = (request, response) => {
  response.writeHead(200);
  response.end('Hello, World!');
};

const server = http.createServer(requestListener);

// Handle errors
server.on('error', (err) => {
  console.error('Server error:', err);
  // Ensure the server closes on errors
  server.close();
});

// Listen on port and handle potential error
server.listen(8080, () => {
  console.log('Server listening on port 8080');
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error('Port 8080 is already in use.');
  } else {
    console.error('Failed to start server:', err);
  }
});

// Graceful shutdown
process.on('SIGINT', () => {
  server.close(() => {
    console.log('Server closed gracefully.');
    process.exit(0);
  });
});
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server closed gracefully.');
    process.exit(0);
  });
});