"use server";

import { scrapeInfiniteScrollItems } from "../../utils/scrape";
import puppeteer from "puppeteer-core";
import edgeChromium from "chrome-aws-lambda";
// import { Parser } from "json2csv";

export async function urlDownloadHandler(url: string) {
  // Validate and potentially encode URL

  // Assuming URL encoding is needed
  const executablePath = await edgeChromium.executablePath("https://github.com/Sparticuz/chromium/releases/download/v110.0.1/chromium-v110.0.1-pack.tar");
  try {
    const browser = await puppeteer.launch({
      executablePath,
      args: edgeChromium.args,
    });

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
