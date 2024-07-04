import { useState } from 'react';
import ExportFeature from './ExportFeature';

const mockAISummarize = (text, length) => {

  // Mock summarization logic here
  if (!text) throw new Error('Content is empty');
  if (length === 'short') return 'Short summary of the content...';
  if (length === 'medium') return 'Medium summary of the content...';
  return 'Long summary of the content...';
};

const SummaryDisplay = ({ content, saveToHistory, disable }) => {
  const [summary, setSummary] = useState('');
  const [length, setLength] = useState('medium');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateSummary = () => {
    setError(null);
    setLoading(true);
    setTimeout(() => {
      try {
        const generatedSummary = mockAISummarize(content, length);
        setSummary(generatedSummary);
        saveToHistory(content, generatedSummary);
      } catch (error) {
        setError('Error generating summary. Please ensure the content is valid.');
      } finally {
        setLoading(false);
      }
    }, 3000);
  };

  return (
    <div className="mb-4">
      <div className="mb-2">
        <label className="mr-2">
          Summary Length:
          <select
            className="ml-2 p-1 border rounded"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          >
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </label>
        <button
          onClick={generateSummary}
          className="ml-2 p-2 bg-green-500 text-white rounded disabled:text-gray-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
          disabled={loading || disable}
        >
          {loading ? 'Generating...' : 'Generate Summary'}
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="border p-4 rounded">
        <h3 className="font-bold mb-2">Original Content</h3>
        <p>{content}</p>
        <h3 className="font-bold mt-4 mb-2">Summary</h3>
        <p>{summary}</p>
      </div>

      <ExportFeature content={summary}/>
    </div>
  );
};

export default SummaryDisplay;
