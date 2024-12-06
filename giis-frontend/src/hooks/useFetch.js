import { useState, useEffect } from "react";

export const useFetch = (endpoint) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    useEffect(() => {
        const fetchData = async () => {
            setIsPending(true);
            try {
                const response = await fetch(backendUrl + endpoint);
                if (!response.ok) throw new Error(response.statusText);
                const json = await response.json();
                setIsPending(false);
                setData(json);
                setError(null);
            } catch (error) {
                setError(`${error} Could not Fetch Data `);
                setIsPending(false);
            }
        };
        fetchData();
    }, [endpoint, backendUrl]);
    return { data, isPending, error };
};