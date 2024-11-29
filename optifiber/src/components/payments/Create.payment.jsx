import { useState,useEffect } from 'react';

import CardCreatePayment from './Create.card';

function CreatePayment() {
    const [data,setData] = useState([]);

    const handleLoadClients = async () => {
        try {
            const token = sessionStorage.getItem('token');

            const res = await fetch('http://localhost:3200/api/client/all',{
                method: 'GET',
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                }
            });

            if(!res.ok) {
                const errorDetails = await res.json(); // obtener el error
                console.log('Server response error:', errorDetails);

                return;
            }

            const result = await res.json();
            setData(result);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleLoadClients();
    }, []);

    return (
        <>
            <div className="container-fluid d-flex justify-content-center mt-4">
                <CardCreatePayment clients={data ? data: []}/>
            </div>
        </>
    );
}

export default CreatePayment;