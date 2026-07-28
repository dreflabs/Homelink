const fs = require('fs');

function updateDict(keyPath, enText, idText) {
  const enFile = 'messages/en.json';
  const idFile = 'messages/id.json';
  
  const en = JSON.parse(fs.readFileSync(enFile, 'utf8'));
  const id = JSON.parse(fs.readFileSync(idFile, 'utf8'));
  
  const keys = keyPath.split('.');
  
  let currEn = en;
  let currId = id;
  
  for (let i = 0; i < keys.length - 1; i++) {
    if (!currEn[keys[i]]) currEn[keys[i]] = {};
    if (!currId[keys[i]]) currId[keys[i]] = {};
    currEn = currEn[keys[i]];
    currId = currId[keys[i]];
  }
  
  currEn[keys[keys.length - 1]] = enText;
  currId[keys[keys.length - 1]] = idText;
  
  fs.writeFileSync(enFile, JSON.stringify(en, null, 2));
  fs.writeFileSync(idFile, JSON.stringify(id, null, 2));
}

const args = process.argv.slice(2);
if (args.length >= 3) {
  updateDict(args[0], args[1], args[2]);
  console.log("Updated", args[0]);
}
