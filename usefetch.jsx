const fetchData = async () => {
    try {
        const response = await fetch('http://36.92.168.180:6380/vito-anjay/dashboard/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                "ngrok-skip-browser-warning": "true",
            },
            credentials: 'omit', // 'omit' is the equivalent of `withCredentials: false` in axios
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        const allData = data.data;
        console.log(data);
        setData(allData);
        setTotalPages(Math.ceil(allData.length / itemsPerPage));
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
