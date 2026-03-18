const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();
const filesToPatch = [
  path.join(projectRoot, 'node_modules', 'apollo-upload-client', 'public', 'createUploadLink.js'),
  path.join(projectRoot, 'node_modules', 'apollo-upload-client', 'public', 'ReactNativeFile.js'),
  path.join(projectRoot, 'node_modules', 'apollo-upload-client', 'public', 'isExtractableFile.js'),
];

const replacements = [
  {
    from: "require('extract-files/public/extractFiles')",
    to: "require('extract-files').extractFiles",
  },
  {
    from: "require('extract-files/public/extractFiles.js')",
    to: "require('extract-files').extractFiles",
  },
  {
    from: "require('extract-files/public/ReactNativeFile')",
    to: "require('extract-files').ReactNativeFile",
  },
  {
    from: "require('extract-files/public/ReactNativeFile.js')",
    to: "require('extract-files').ReactNativeFile",
  },
  {
    from: "require('extract-files/public/isExtractableFile')",
    to: "require('extract-files').isExtractableFile",
  },
  {
    from: "require('extract-files/public/isExtractableFile.js')",
    to: "require('extract-files').isExtractableFile",
  },
];

let changed = 0;

for (const filePath of filesToPatch) {
  if (!fs.existsSync(filePath)) continue;
  const original = fs.readFileSync(filePath, 'utf8');
  let next = original;
  for (const { from, to } of replacements) next = next.replaceAll(from, to);
  if (next !== original) {
    fs.writeFileSync(filePath, next, 'utf8');
    changed += 1;
  }
}

if (changed > 0) {
  console.log(`[patch-apollo-upload-client] patched ${changed} file(s).`);
} else {
  console.log('[patch-apollo-upload-client] no changes needed.');
}
