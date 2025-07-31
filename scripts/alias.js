import { exec } from 'child_process';

exec('npm run lint:fix && npm run format', (err, stdout, stderr) => {
  if (err) {
    console.error(`❌ Error: ${err.message}`);
    return;
  }
  if (stderr) {
    console.error(`⚠️ Stderr: ${stderr}`);
    return;
  }
  console.log(`✅ Code tidied up!\n${stdout}`);
});
