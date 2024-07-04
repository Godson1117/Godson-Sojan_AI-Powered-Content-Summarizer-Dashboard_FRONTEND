import { useState } from 'react';
import { jsPDF } from 'jspdf';

const ExportFeature = ({ content }) => {
  const [error, setError] = useState(null);

  const exportAsPDF = () => {
    setError(null);
    try {
      const doc = new jsPDF();
      const lines = doc.splitTextToSize(content, 180);
      doc.text(lines, 10, 10);
      doc.save('summary.pdf');
    } catch (error) {
      setError('Error exporting the content as PDF.');
    }
  };

  return (
    <div className="mb-4 mt-4">
      <button
        onClick={exportAsPDF}
        className="p-2 bg-red-500 text-white rounded disabled:bg-gray-400"
        disabled={content.length <= 0 ? true : false}
      >
        Export as PDF
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default ExportFeature;
