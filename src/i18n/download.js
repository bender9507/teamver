const fs = require("fs");
const { loadGoogleSheet, BASE_PATH } = require("./index");

const createDir = (path) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, { recursive: true }, (error) => {
      if (error) reject(error);
      else resolve();
    });
  });
};

const createJson = (path, json) => {
  fs.writeFile(path, JSON.stringify(json), "utf8", (error) => {
    if (error) throw error;
  });
};

const sheetToJson = async (sheet) => {
  const rows = await sheet.getRows();

  const data = rows.reduce((acc, row) => {
    const rowData = row.toObject();
    const [[, key], ...languages] = Object.entries(rowData);

    languages.forEach(([language, value]) => {
      acc[language] = {
        ...acc[language],
        [key]: value ?? ""
      };
    });

    return acc;
  }, {});

  Object.entries(data).forEach(async ([language, values]) => {
    await createDir(`${BASE_PATH}/${language}`);

    createJson(`${BASE_PATH}/${language}/${sheet.title}.json`, values);
  });
};

const download = async () => {
  const doc = await loadGoogleSheet();

  Array(doc.sheetCount)
    .fill(0)
    .forEach(async (_, index) => {
      const sheet = doc.sheetsByIndex[index];
      sheetToJson(sheet);
    });
};

download();
