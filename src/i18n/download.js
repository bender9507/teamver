const { createFile, loadGoogleSheet, LOCALE_DIR, LANGUAGES } = require("./utils");

async function downloadSheetToJSON() {
  const doc = await loadGoogleSheet();
  const sheets = doc.sheetsByIndex;

  sheets.forEach(async (sheet) => {
    const title = sheet.title;
    const rows = await sheet.getRows();

    LANGUAGES.forEach(async (language) => {
      const data = rows.reduce((_data, row) => {
        console.log(row.get(language));

        return {
          ..._data,
          [row.get("key")]: row.get(language)?.replaceAll("\\n", "\n") ?? ""
        };
      }, {});

      await createFile(`${LOCALE_DIR}/${language}/${title}.json`, data);
    });
  });
}

downloadSheetToJSON();
