export const handleLoadDocuments = async (client) => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:3200/api/document/all/${client}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if(!res) {
            const errorDetails = await res.json(); // obtener el error
            console.log('Server response error:', errorDetails);

            return;
        }

        const result = await res.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}