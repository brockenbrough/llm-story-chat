import React, { useState } from 'react';
import axios from 'axios';

function SingleChatPage() {
    const [systemMessage, setSystemMessage] = useState('You are a useful assistant.');
    const [userPrompt, setUserPrompt] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [loading, setLoading] = useState(false); // State to manage loading


    const handleAsk = async () => {
        setLoading(true); // Set loading state to true
        document.body.style.cursor = 'wait'; // Change cursor to wait
        
        try {
            const response = await axios.post('http://localhost:8081/chat/canned', {
                systemMessage,
                userPrompt
            });
            setResponseMessage(response.data.content);
        } catch (error) {
            console.error('There was an error!', error);
            setResponseMessage('There was an error processing your request.');
        } finally {
            setLoading(false); // Set loading state to false
            document.body.style.cursor = 'default'; // Reset cursor to default
        }
    };

    return (
        <div className="page-container">
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
    );
}

export default SingleChatPage;

