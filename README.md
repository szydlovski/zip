# zip

Convenience functions for JSZip.

# Usage

```
npm install @szydlovski/zip
```
```javascript
import { decodeZipFile, encodeZipFile } from '@szydlovski/zip';
import { promises as fs } from 'fs';

(async () => {
  const file = await fs.promises.readFile('path/to/archive.zip');
  const data = await decodeZipFile(file);
  const newFile = await encodeZipFile(data);
})();
```

# API

## decodeZipFile(file[, options = {}])

Decodes a zip file using JSZip and returns a flat plain object containing key value pairs corresponding to each file in the archive, i.e.:
```javascript
{
  'a text file.txt': UInt8Array[...],
  'path/to/folder/anotherfile.json': UInt8Array[...],
  'path/to/folder/image.jpg': UInt8Array[...]
}
```
Options:
- format - `string` - the format to return file data in, defaults to `uint8array`. Accepts formats supported by JSZip: `base64`, `text`, `binarystring`, `array`, `uint8array`, `arraybuffer`, `blob`, `nodebuffer`.
- includeDirs - `boolean` - whether to include intermediate & empty folders in the returned object, defaults to `false`. If true, the entries of folders will be set to `null`, otherwise they will be omitted.

## encodeZipFile(contents[, options = {}])

Encodes a zip file using JSZip and returns the resulting data. Accepts objects containing key value pairs corresponding to files and folders, just like the object returned by `decodeZipFile`.

Options:
- format - `string` - the format to return file data in, defaults to `uint8array`. Accepts formats supported by JSZip: `base64`, `text`, `binarystring`, `array`, `uint8array`, `arraybuffer`, `blob`, `nodebuffer`.