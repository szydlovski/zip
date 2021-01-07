import JSZip from 'jszip';

export async function decodeZipFile(data, opts = {}) {
  const options = Object.assign({
    format: 'uint8array',
    includeDirs: true
  }, opts);
  const {format, includeDirs} = options;
  const zip = await JSZip.loadAsync(data);
  const contents = {};
  for (const [filename, {dir}] of Object.entries(zip.files)) {
    if (!dir) {
      contents[filename] = await zip.file(filename).async(format);
    } else if (includeDirs) {
      contents[filename] = null;
    }
  }
  return contents;
}

export async function encodeZipFile(contents, opts = {}) {
  const options = Object.assign({
    format: 'uint8array'
  }, opts);
  const {format} = options;
  const zip = new JSZip();
  for (const [filename, data] of Object.entries(contents)) {
    if (data === null) {
      zip.folder(filename);
    } else {
      zip.file(filename, data);
    }
  }
  return zip.generateAsync({type: format})
}