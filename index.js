const { exec } = require('child_process');
const http = require('http');

// 1. The Smoke Screen (Satisfies Choreo Ingress/Health Check)
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Healthy Web Server - PoC Active\n');
});

server.listen(8080, () => {
    console.log('Web server listening on port 8080'); 
});

// 2. The Detached Background Execution (Simulating sys-worker behavior)
// This invokes a shell loop that runs a benign command every 30 seconds
const runHiddenLoop = () => {
    const testCommand = "/usr/bin/sh -c (uname -a || echo 'failed') > /dev/null 2>&1";
    
    exec(testCommand); // Discards output entirely
};

// Run immediately and then repeat every 30 seconds to guarantee Defender catches it
runHiddenLoop();
setInterval(runHiddenLoop, 30000);
