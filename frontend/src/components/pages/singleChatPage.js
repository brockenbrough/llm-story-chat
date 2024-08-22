import React, { useState } from 'react';
import axios from 'axios';

function SingleChatPage() {
    const [systemMessage, setSystemMessage] = useState('');
    const [userPrompt, setUserPrompt] = useState('');
    const [responseMessage, setResponseMessage] = useState('');  // State for storing the response

    const handleAsk = async () => {
        try {
            const response = await axios.post('http://localhost:8081/chat/canned', {
                systemMessage,
                userPrompt
            });
            setResponseMessage(response.data.content);  // Set the response data in the state
        } catch (error) {
            console.error('There was an error!', error);
            setResponseMessage('There was an error processing your request.');  // Set an error message
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
            <div>
                <h2>Response:</h2>
                <p>{responseMessage}</p>  {/* Display the response message */}
            </div>
        </div>
    );
}

export default SingleChatPage;
