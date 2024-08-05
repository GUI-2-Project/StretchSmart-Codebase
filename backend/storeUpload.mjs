// Straight from the apollo-upload-examples repo, 
// but substitued nanoid for shortid due to security concerns:
// https://github.com/jaydenseric/apollo-upload-examples/blob/master/api/storeUpload.mjs

import { createWriteStream, unlink } from 'fs';
import { nanoid } from 'nanoid';

// TODO: consoloidate constants into a single file
const UPLOAD_DIRECTORY_URL = new URL("../static_content/", import.meta.url);

export default async function storeUpload({ upload }) {
    // upload.filename, upload.mimetype, upload.encoding, upload.createReadStream
    const { createReadStream, filename } = await upload;
    const stream = createReadStream();
    const storedFileName = `${nanoid.generate()}-${filename}`;
    const storedFileUrl = new URL(storedFileName, UPLOAD_DIRECTORY_URL);

    // Store the file in the filesystem.
    await new Promise((resolve, reject) => {
    // Create a stream to which the upload will be written.
    const writeStream = createWriteStream(storedFileUrl);

    // When the upload is fully written, resolve the promise.
    writeStream.on("finish", resolve);

    // If there's an error writing the file, remove the partially written file
    // and reject the promise.
    writeStream.on("error", (error) => {
      unlink(storedFileUrl, () => {
        reject(error);
      });
    });

    // In Node.js <= v13, errors are not automatically propagated between piped
    // streams. If there is an error receiving the upload, destroy the write
    // stream with the corresponding error.
    stream.on("error", (error) => writeStream.destroy(error));

    // Pipe the upload into the write stream.
    stream.pipe(writeStream);
  });

  return storedFileName;
}