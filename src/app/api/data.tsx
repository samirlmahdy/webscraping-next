"use server";

import { scrapeInfiniteScrollItems } from "../../utils/scrape";
import puppeteer from "puppeteer";
// import { Parser } from "json2csv";

export async function urlDownloadHandler(url: string) {
  // Validate and potentially encode URL

  // Assuming URL encoding is needed

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    console.log("Navigating to:", url); // Log the URL for debugging

    // Navigate to the validated and potentially encoded URL
    await page.goto(url);

    setTimeout(() => {
      console.log("waiting to complete loading");
    }, 2000);

    const csv = await scrapeInfiniteScrollItems(page, 100);
    // const json2csvParser = new Parser();
    // const csv = json2csvParser.parse(items);

    await browser.close();
    return csv;
  } catch (error) {
    console.error(error);
    // Consider providing a more informative error message if appropriate
  }
}
