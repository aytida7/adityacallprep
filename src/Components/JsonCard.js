// JsonCard.js
import React, { useState } from 'react';

const JsonCard = ({ data, depth = 0 }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const copyToClipboard = () => {
    const jsonString = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(jsonString)
      .then(() => {
        console.log('JSON copied to clipboard');
      })
      .catch((err) => {
        console.error('Copy to clipboard failed:', err);
      });
  };

  const downloadJsonFile = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'downloaded.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderElement = (element, depth) => {
    if (typeof element === 'object') {
      return <JsonCard key={Math.random()} data={element} depth={depth + 1} />;
    } else {
      return <span>{element}</span>;
    }
  };

  const getColorForDepth = (depth) => {
    const colors = ['#FFAAAA', '#AAFFAA', '#AAAAFF', '#FFD700', '#DA70D6']; 
    return colors[depth % colors.length];
  };

  const renderJson = (jsonData, depth) => {
    const isList = Array.isArray(jsonData);
    const borderStyle = {
      border: `1px solid ${getColorForDepth(depth)}`,
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '10px',
      backgroundColor: 'black',
      color: 'white',
      width: '80%',
      margin: 'auto',
      overflow: 'hidden',
      transition: 'background-color 0.3s',
      cursor: 'pointer',
    };

    return (
      <div style={borderStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span onClick={toggleCollapse} style={{ textDecoration: 'underline', marginRight: '5px' }}>
            {isCollapsed ? '▶' : '▼'}
          </span>
          <div>
            <button onClick={copyToClipboard}>Copy JSON</button>
            <button onClick={downloadJsonFile}>Download JSON</button>
          </div>
        </div>
        {isList ? '[' : '{'}
        {isCollapsed ? null : (
          <div style={{ marginLeft: '20px' }}>
            {Object.entries(jsonData).map(([key, value]) => (
              <div key={Math.random()} style={{ marginBottom: '5px' }}>
                {isList ? null : <span style={{ fontWeight: 'bold' }}>{key}:</span>}
                {renderElement(value, depth)}
              </div>
            ))}
          </div>
        )}
        {isList ? ']' : '}'}
      </div>
    );
  };

  return renderJson(data, depth);
};

export default JsonCard;
