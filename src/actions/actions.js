"use server";

const puppeteer = require("puppeteer");
const { Parser } = require("json2csv");
const { fs } = require("fs");
const { scrapeInfiniteScrollItems } = require("../utils/scrape");

async function getData(url, category) {
  console.log("Scraping data for URL:", url); // Add this line for debugging
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);

  // Call the asynchronous function and await its result
  const items = await scrapeInfiniteScrollItems(page, 100);

  console.log(items);
  const json2csvParser = new Parser();
  const csv = json2csvParser.parse(items);

  // Write the CSV data to a file with UTF-8 encoding
  try {
    fs.writeFileSync(
      `./scrapped_data/${category}_Best_Seller_Amazon.csv`,
      "\ufeff" + csv,
      "utf-8"
    );
  } catch (error) {
    console.log(error);
  }

  console.log("Data saved to", `${category}_Best_Seller_Amazon.csv`);
}

export default getData;
