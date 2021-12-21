import { useState, useEffect } from 'react'
const usePost = (url, data, method = "POST") => {
    const [res, setRes] = useState(null);
    const [waiting, setWaiting] = useState(true);
    useEffect(async () => {
        const response = await fetch(
            url,
            {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        );
        let res1 = await response.json();
        setRes(res1);
        setWaiting(false);
    }, []);

    return { res, waiting };
}

export default usePost