const History = ({ history }) => {
  return (
    <div className="mt-4">
      <h3 className="font-bold mb-2">History</h3>
      {history.length === 0 ? (
        <p>No history available.</p>
      ) : (
        <ul className="list-disc pl-5">
          {history.map((item, index) => (
            <li key={index} className="mb-2">
              <div className="border p-2 rounded">
                <p><strong>Original Content:</strong> {item.originalContent}</p>
                <p><strong>Summary:</strong> {item.summary}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
