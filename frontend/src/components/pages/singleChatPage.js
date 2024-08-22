import React, { useState } from 'react';
import axios from 'axios';

function SingleChatPage() {
    const [systemMessage, setSystemMessage] = useState('You are a useful assistant.');
    const [userPrompt, setUserPrompt] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [messageHistory, setMessageHistory] = useState([
        { role: "system", content: 'You are a useful assistant.' },
    ]);
    const [loading, setLoading] = useState(false); // State to manage loading

    const handleAsk = async () => {
        setLoading(true); // Set loading state to true
        document.body.style.cursor = 'wait'; // Change cursor to wait

        const newMessageHistory = [
            ...messageHistory,
            { role: "user", content: userPrompt },
        ];

        try {
            const response = await axios.post('http://localhost:8081/chat/canned', {
                messageHistory: newMessageHistory
            });

            const responseContent = response.data.message.content;
            setResponseMessage(responseContent);

            setMessageHistory([
                ...newMessageHistory,
                { role: "assistant", content: responseContent }
            ]);
        } catch (error) {
            console.error('There was an error!', error);
            setResponseMessage('There was an error processing your request.');
        } finally {
            setLoading(false); // Set loading state to false
            document.body.style.cursor = 'default'; // Reset cursor to default
        }
    };

    return (
        <div className="page-container" style={{ display: 'flex', height: '100vh' }}>
            <div style={{ flex: 1 }}>
                <h1>Ask Me</h1>
                <div className="input-container">
                    <label>
                        Your Prompt:
                        <input
                            type="text"
                            value={userPrompt}
                            onChange={(e) => setUserPrompt(e.target.value)}
                        />
                    </label>
                </div>
                <button className="ask-button" onClick={handleAsk}>Ask</button>
                <div className="response-container">
                    <h2>Response:</h2>
                    <p>{responseMessage}</p>
                </div>
            </div>
            <div style={{ flex: 1, overflowY: 'scroll', borderLeft: '1px solid #ccc', padding: '10px' }}>
                <h2>Message History:</h2>
                {messageHistory.map((message, index) => (
                    <div key={index}>
                        <strong>{message.role}:</strong> {message.content}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SingleChatPage;

