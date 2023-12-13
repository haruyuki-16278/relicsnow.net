import * as ftp from 'basic-ftp';
import 'dotenv/config';

const client = new ftp.Client();
client.ftp.verbose = true;

async function Deploy() {
  try {
    await client.access({
      host: process.env.FTP_SERVER,
      user: process.env.FTP_USER,
      password: process.env.FTP_KEY,
      secure: true,
    });
    await client.ensureDir('~/www');
    await client.clearWorkingDir();
    await client.uploadFromDir('dist/relicsnow.net/browser');
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
}

Deploy().then(() => {
  console.log('success');
});
