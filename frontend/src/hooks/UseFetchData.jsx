import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function UseFetchData(url) {
    const token = useSelector(state => state.auth.token);
   

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
   
    useEffect(() => {
        const fetchData = async () => {
           
            if (!token) {
                // Token is not available, don't make the fetch request
                console.log('No token available. Skipping fetch request.');
                return;
            }
            setLoading(true);
            try {
                const response = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                
              
                const result = await response.json();
             
                if (!response.ok) {
                    throw new Error(result.message);
                }
                setLoading(false);
                setData(result.data);
            } catch (error) {
                setLoading(false);
                setError(error.message);
            }
        };

        fetchData(); // Call fetchData here

    }, [token, url]); // Make sure to include token and url in the dependencies array

    return {
        data, loading, error
    };
}


export default UseFetchData;