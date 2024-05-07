import { useEffect, useState } from 'react';

// Reusable custom hook to make GET API call to any url
const useFetch = (url) => {
    // Set initial states for data, loading state, and error state 
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState({ status: false, msg: "" });

    // Fetch data from the provided URL
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Network error fetching data from the API');
                }

                // Parse JSON data and update the state
                const data = await response.json();
                setData(data);
                setIsLoading(false);
            } catch (error) {
                // Handle any errors that occur during data fetching
                console.error('Error fetching data:', error);
                setData(null);
                setIsLoading(false);
                setIsError({ status: true, msg: 'Error fetching data: ' + error });
            }
        };

        fetchData();
    }, [url]);

    // Return data, loading state, and error state to the component
    return { data, isLoading, isError };
};

export default useFetch;