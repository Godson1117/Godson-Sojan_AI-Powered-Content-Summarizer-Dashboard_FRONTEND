const TextInputArea = ({ content, setContent, setDisable }) => {
  return (
    <textarea
      className="w-full h-64 p-2 border rounded mb-4"
      value={content}
      onChange={(e) => {
        setContent(e.target.value)
        setDisable(!e.target.value)
      }}
      placeholder="Paste or type your content here"
    />
  );
};

export default TextInputArea;
