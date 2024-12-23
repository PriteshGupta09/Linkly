'use client'
// pages/index.js
// pages/index.js
import { useState } from 'react';

export default function Home() {
  const [inputValue, setInputValue] = useState('');

  const handleInputClick = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        setInputValue(text);
      } else {
        alert('Clipboard API not supported in your browser.');
      }
    } catch (err) {
      alert('Failed to read clipboard. Please check permissions or try on a secure HTTPS connection: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Clipboard Auto Paste</h1>
      <p>Click on the input field below, and the text from your clipboard will be pasted automatically.</p>
      <input
        type="text"
        value={inputValue}
        onClick={handleInputClick}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ padding: '10px', width: '300px', fontSize: '16px' }}
        placeholder="Click here to paste clipboard content"
      />
    </div>
  );
}

