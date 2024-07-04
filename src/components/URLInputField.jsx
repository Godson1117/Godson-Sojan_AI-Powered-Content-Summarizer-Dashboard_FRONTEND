import { useState } from 'react';
import axios from 'axios';

const URLInputField = ({ onScrape, disable, setDisable }) => {
  const [url, setUrl] = useState('');
  const [scrapeOption, setScrapeOption] = useState('entire');
  const [suggestedContent, setSuggestedContent] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleScrape = async () => {
    setError(null);
    setLoading(true);

    try {
      const response = await axios.get('http://localhost:8000/scrap', { url, scrapeOption })
      console.log(response)
      const textContent = response.data
      onScrape(textContent);
    }
    catch (error) {
      setError('Error scraping the webpage. Please ensure the URL is correct and the website allows scraping.');
      console.log(error)
    }
    finally {
      setLoading(false);
    }

  };


  return (
    <div className="mb-4">
      <input
        type="text"
        className="w-full p-2 border rounded"
        value={url}
        onChange={(e) => {
          setUrl(e.target.value)
          setDisable(!e.target.value)
        }}
        placeholder="Enter URL"
      />
      <div className="mt-2">
        <label className="mr-2">
          <input
            type="radio"
            name="scrapeOption"
            value="entire"
            checked={scrapeOption === 'entire'}
            onChange={(e) => setScrapeOption(e.target.value)}
          />
          Entire Page
        </label>
        <label>
          <input
            type="radio"
            name="scrapeOption"
            value="main"
            checked={scrapeOption === 'main'}
            onChange={(e) => setScrapeOption(e.target.value)}
          />
          Main Article
        </label>
        <label>
          <input
            type="radio"
            name="scrapeOption"
            value="section"
            checked={scrapeOption === 'section'}
            className="ml-2"
            onChange={(e) => setScrapeOption(e.target.value)}
          />
          Main Section
        </label>
      </div>
      <button
        onClick={handleScrape}
        className="mt-2 p-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-200"
        disabled={loading || disable}
      >
        {loading ? 'Scraping...' : 'Scrape'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {suggestedContent && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">Suggested Main Content</h3>
          <textarea
            className="w-full h-32 p-2 border rounded mt-2"
            value={suggestedContent}
            readOnly
          />
          <button
            onClick={() => onScrape(suggestedContent)}
            className="mt-2 p-2 bg-green-500 text-white rounded"
          >
            Use Suggested Content
          </button>
        </div>
      )}
    </div>
  );
};

export default URLInputField;
