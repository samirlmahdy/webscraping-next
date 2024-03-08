"use client";

import { useState } from "react";
import { urlDownloadHandler } from "@/app/api/data";
import { CSVLink } from "react-csv";

export default function Home() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [csv, setCsv] = useState<any>(null);
  const [status, setStatus] = useState(false);

  const urlChangeHandler = (e: any) => {
    setUrl(e.target.value);
  };

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    setStatus(true);
    const link = url;
    try {
      const csvData = await urlDownloadHandler(link);
      // Handle the downloaded CSV data (replace with your desired logic)
      if (csvData) setCsv(csvData);
    } catch (error) {
      console.error(error);
      setError("Download failed. Please try again."); // Update error state
    } finally {
      setStatus(false);
    }
  };

  return (
    <main className="App">
      <h1>Web Scrapping Tool</h1>
      <form>
        <div>
          <label htmlFor="url">URL</label>
          <input
            className="input"
            placeholder="Add the URL of the page..."
            name="url"
            value={url}
            onChange={urlChangeHandler}
          />
        </div>
        <button
          onClick={(e) => onSubmitHandler(e)}
          type="submit"
        >
          {status ? "Downloading..." : "Submit"}
        </button>
        {csv && <CSVLink data={csv}>Download me</CSVLink>}
        {error && <div>{error}</div>}
      </form>
      <p>Made with 💛 by Samir Elmahdy</p>
    </main>
  );
}
