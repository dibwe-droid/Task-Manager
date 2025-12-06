// Simple test runner to check if tests can execute
const { exec } = require('child_process');

console.log('Running tests...\n');

const testProcess = exec('npm test', { cwd: __dirname }, (error, stdout, stderr) => {
  if (error) {
    console.error('Error:', error);
  }
  if (stderr) {
    console.error('Stderr:', stderr);
  }
  if (stdout) {
    console.log('Stdout:', stdout);
  }
});

testProcess.stdout.on('data', (data) => {
  console.log(data.toString());
});

testProcess.stderr.on('data', (data) => {
  console.error(data.toString());
});
