const {
  readDir,
  readFile,
  loadGoogleSheet,
  LOCALE_DIR,
  BASE_LANGUAGE,
  LANGUAGES
} = require("./utils");

async function uploadNamespaceToSheet(doc, namespaceName) {
  const namespaceFile = await readFile(`${LOCALE_DIR}/${BASE_LANGUAGE}/${namespaceName}.json`);
  const namespaceJSON = JSON.parse(namespaceFile);

  let sheet = doc.sheetsByTitle[namespaceName];

  if (!sheet) {
    await doc.addSheet({ title: namespaceName, headerValues: ["key", ...LANGUAGES] });
    sheet = doc.sheetsByTitle[namespaceName];
  }

  const rows = await sheet.getRows();

  for (const key of Object.keys(namespaceJSON)) {
    const existing = rows.find((row) => row.get("key") === key);

    if (!existing) await sheet.addRow({ key });
  }
}

async function uploadJSONToSheet() {
  const doc = await loadGoogleSheet();
  const baseLanguageNamespaces = await readDir(`${LOCALE_DIR}/${BASE_LANGUAGE}`);

  const namespacePromises = baseLanguageNamespaces.map(async (namespaceFileName) => {
    const namespaceName = namespaceFileName.split(".")[0];

    await uploadNamespaceToSheet(doc, namespaceName);
  });

  await Promise.all(namespacePromises);
}

uploadJSONToSheet();
