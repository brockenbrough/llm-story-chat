import React, { useState } from 'react';
import axios from 'axios';

function SingleChatPage() {
    const [systemMessage, setSystemMessage] = useState('');
    const [userPrompt, setUserPrompt] = useState('');

    const handleAsk = async () => {
        try {
            const response = await axios.post('http://localhost:8081/chat/canned', {
                systemMessage,
                userPrompt
            });
            console.log('Response:', response.data);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <div>
            <h1>Chat Interface</h1>
            <div>
                <label>
                    System Message:
                    <input
                        type="text"
                        value={systemMessage}
                        onChange={(e) => setSystemMessage(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    User Prompt:
                    <input
                        type="text"
                        value={userPrompt}
                        onChange={(e) => setUserPrompt(e.target.value)}
                    />
                </label>
            </div>
            <button onClick={handleAsk}>Ask</button>
        </div>
    );
}

export default SingleChatPage;