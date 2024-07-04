import React, { useState, useEffect } from 'react';
import URLInputField from './URLInputField';
import TextInputArea from './TextInputArea';
import SummaryDisplay from './SummaryDisplay';
import History from './History';
import LoginForm from './LoginForm';

const Dashboard = () => {
  const [content, setContent] = useState('');
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState(null);
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(savedUser);
      const savedHistory = JSON.parse(localStorage.getItem(`history_${savedUser}`)) || [];
      setHistory(savedHistory);
    }
  }, []);

  const handleScrapedContent = (scrapedContent) => {
    setContent(scrapedContent);
  };

  const saveToHistory = (originalContent, summary) => {
    const newHistory = [...history, { originalContent, summary }];
    setHistory(newHistory);
    localStorage.setItem(`history_${user}`, JSON.stringify(newHistory));
  };

  const handleLogin = (username) => {
    setUser(username);
    localStorage.setItem('user', username);
    const savedHistory = JSON.parse(localStorage.getItem(`history_${username}`)) || [];
    setHistory(savedHistory);
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="container mx-auto p-4">
      <URLInputField onScrape={handleScrapedContent} disable={disable} setDisable={setDisable}/>
      <TextInputArea content={content} setContent={setContent}  setDisable={setDisable} />
      <SummaryDisplay content={content} saveToHistory={saveToHistory} disable={disable} />
      <History history={history} />
    </div>
  );
};

export default Dashboard;
