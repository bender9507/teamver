/* eslint-disable  */
const fs = require("fs");
const { loadGoogleSheet, BASE_PATH } = require("./index");

const readDir = (path) => {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (error, fileList) => {
      if (error) reject(error);
      else resolve(fileList);
    });
  });
};

const readFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (error, file) => {
      if (error) reject(error);
      else resolve(file);
    });
  });
};

const addRows = async (sheet, language, callback) => {
  const sheetName = sheet.title;
  const languageFile = await readFile(`${BASE_PATH}/${language}/${sheetName}.json`);
  const languageData = JSON.parse(languageFile);
  const languageDataArray = Object.entries(languageData);

  const rows = callback(languageDataArray);

  await sheet.addRows(rows);
};

const convertLanguageFile = async (doc, language, languages, file) => {
  const sheetName = file.split(".")[0];
  const sheet = doc.sheetsByTitle[sheetName];

  if (sheet) {
    const rows = await sheet.getRows();

    await addRows(sheet, language, (data) =>
      data.reduce((_data, [key]) => {
        const hasRow = rows.findIndex((row) => row.get("key") === key);

        return hasRow === -1 ? [..._data, { key }] : _data;
      }, [])
    );
  } else {
    const newSheet = await doc.addSheet({
      title: sheetName,
      headerValues: ["key", ...languages]
    });

    await addRows(newSheet, language, (data) =>
      data.reduce((_data, [key]) => [..._data, { key }], [])
    );
  }
};

const convertLanguageFolder = async (doc, language, languages) => {
  const files = await readDir(`${BASE_PATH}/${language}`);

  for (const file of files) {
    await convertLanguageFile(doc, language, languages, file);
  }
};

const upload = async () => {
  const doc = await loadGoogleSheet();

  const languages = await readDir(BASE_PATH);

  for (const language of languages) {
    await convertLanguageFolder(doc, language, languages);
  }
};

upload();
