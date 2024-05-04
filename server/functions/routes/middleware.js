import Busboy from 'busboy';
import { tmpdir as _tmpdir } from 'os';
import { join } from 'path';
import { createWriteStream, readFile, unlink } from 'fs';

export function filesUpload (req, res, next) {
  const busboy = new Busboy({ headers: req.headers, limits: { fileSize: 10 * 1024 * 1024 } });
  const tmpdir = _tmpdir();
  const fields = {};
  const files = [];
  const fileWrites = [];

  busboy.on('field', (fieldname, val) => {
    fields[fieldname] = val;
  });

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    const filepath = join(tmpdir, filename);
    const writeStream = createWriteStream(filepath);
    file.pipe(writeStream);

    fileWrites.push(new Promise((resolve, reject) => {
      file.on('end', () => writeStream.end());
      writeStream.on('finish', () => {
        readFile(filepath, (err, buffer) => {
          if (err) {
            reject(err);
          } else {
            files.push({
              fieldname,
              originalname: filename,
              encoding,
              mimetype,
              buffer,
              size: Buffer.byteLength(buffer),
            });
            resolve();
          }
          unlink(filepath, err => { if (err) console.error(err); });
        });
      });
      writeStream.on('error', reject);
    }));
  });

  busboy.on('finish', () => {
    Promise.all(fileWrites).then(() => {
      req.body = fields;
      req.files = files;
      next();
    }).catch(next);
  });

  busboy.end(req.rawBody);
}
