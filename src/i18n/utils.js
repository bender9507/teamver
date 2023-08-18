const { JWT } = require("google-auth-library");
const { GoogleSpreadsheet } = require("google-spreadsheet");

require("dotenv").config();

const fs = require("fs");

const LOCALE_DIR = "public/locales";
const BASE_LANGUAGE = "ko";
const LANGUAGES = ["ko", "en", "jp"];

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

const createFile = (path, file) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(file), (error, file) => {
      if (error) reject(error);
      else resolve(file);
    });
  });
};

const loadGoogleSheet = async () => {
  const auth = new JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_CLIENT_KEY.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });

  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, auth);

  await doc.loadInfo();

  return doc;
};

module.exports = {
  readDir,
  readFile,
  createFile,
  loadGoogleSheet,
  LOCALE_DIR,
  BASE_LANGUAGE,
  LANGUAGES
};
