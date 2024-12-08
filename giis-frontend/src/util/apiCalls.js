const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const fetchData = async (endpoint, callback) => {
    try {
        const response = await fetch(backendUrl + endpoint, {
            credentials: 'include'
        });
        const data = await response.json();
        callback(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export const postData = async (endpoint, payload) => {
    try {
        const response = await fetch(backendUrl + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
            credentials: 'include'
        })
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'An unexpected error occurred');
        }

        return data;
    }
    catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};