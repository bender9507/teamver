/* eslint-disable */
require("dotenv").config();

const { JWT } = require("google-auth-library");
const { GoogleSpreadsheet } = require("google-spreadsheet");

const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
const BASE_PATH = "public/locales";

const loadGoogleSheet = async () => {
  const auth = new JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_CLIENT_KEY.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });

  const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, auth);

  await doc.loadInfo();

  return doc;
};

module.exports = {
  loadGoogleSheet,
  BASE_PATH
};
