'use client';

import { useEffect, useState } from 'react';

export default function CompletionPage() {
    const [prompt, setPrompt] = useState('');
    const [completion, setCompletion] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const complete = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPrompt('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/completion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error('Failed to fetch completion');
            }

            setCompletion(data.text);
            setError('');
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
        } finally {
            setIsLoading(false);
        }
    }
	return (
		<div>
            <h1>Completion Page</h1>
            {
                isLoading ? (
                    <p>Loading...</p>
                ) : completion ? (
                    <p>{completion}</p>
                ) : null
            }
            {
                error && (
                    <p className='text-red-500'>{error}</p>
                )
            }
            <form onSubmit={complete}>
                <input
                    type="text"
                    placeholder="Enter your prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
		</div>
	);
}