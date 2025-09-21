const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Smart Water Management System...\n');

// Kill existing processes
const killProcesses = () => {
  return new Promise((resolve) => {
    const killCmd = spawn('cmd', ['/c', 'for /f "tokens=5" %a in (\'netstat -aon ^| findstr ":500"\') do taskkill /f /pid %a 2>nul'], {
      stdio: 'inherit'
    });
    
    killCmd.on('close', () => {
      console.log('✅ Cleared existing processes\n');
      resolve();
    });
  });
};

// Start backend
const startBackend = () => {
  console.log('🔧 Starting Backend Server...');
  const backend = spawn('node', ['server.js'], {
    cwd: path.join(__dirname, 'backend'),
    stdio: 'inherit'
  });
  
  backend.on('error', (err) => {
    console.error('❌ Backend error:', err);
  });
  
  return backend;
};

// Start frontend
const startFrontend = () => {
  setTimeout(() => {
    console.log('🎨 Starting Frontend Server...');
    const frontend = spawn('npm', ['start'], {
      cwd: path.join(__dirname, 'frontend'),
      stdio: 'inherit',
      shell: true
    });
    
    frontend.on('error', (err) => {
      console.error('❌ Frontend error:', err);
    });
  }, 3000);
};

// Main execution
const main = async () => {
  try {
    await killProcesses();
    startBackend();
    startFrontend();
    
    console.log('\n✅ System started successfully!');
    console.log('🌐 Backend: http://localhost:5002');
    console.log('🎨 Frontend: http://localhost:3000');
    console.log('\nPress Ctrl+C to stop all servers');
    
  } catch (error) {
    console.error('❌ Failed to start system:', error);
  }
};

main();