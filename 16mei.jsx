import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const DeviceStatus = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterSignalStatus, setFilterSignalStatus] = useState('');
    const [filterBatteryStatus, setFilterBatteryStatus] = useState('');
    const navigate = useNavigate();
    
    const fetchData = async () => {
        try {
            const response = await axios.get("http://36.92.168.180:6380/vito-anjay/dashboard/", {
                headers: {
                    'Accept': 'application/json',
                    "ngrok-skip-browser-warning": "true",
                },
                withCredentials: false,
            });
            console.log(response.data);
            // Mengambil hanya 20 data pertama
            setData(response.data.data.slice(0,20));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    const handleDetailClick = () => {
        navigate('/detail');
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const timeDifference = (now - date) / 1000;
        
        const secondsInMinute = 60;
        const secondsInHour = secondsInMinute * 60;
        const secondsInDay = secondsInHour * 24;
        const secondsInWeek = secondsInDay * 7;
        const secondsInMonth = secondsInDay * 30; // Rata-rata 30 hari per bulan
        const secondsInYear = secondsInDay * 365; // Rata-rata 365 hari per tahun
        
        if (timeDifference < secondsInMinute) {
            return 'Just now';
        } else if (timeDifference < secondsInHour) {
            const minutes = Math.floor(timeDifference / secondsInMinute);
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (timeDifference < secondsInDay) {
            const hours = Math.floor(timeDifference / secondsInHour);
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (timeDifference < secondsInWeek) {
            const days = Math.floor(timeDifference / secondsInDay);
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (timeDifference < secondsInMonth) {
            const weeks = Math.floor(timeDifference / secondsInWeek);
            return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
        } else if (timeDifference < secondsInYear) {
            const months = Math.floor(timeDifference / secondsInMonth);
            return `${months} month${months > 1 ? 's' : ''} ago`;
        } else {
            const years = Math.floor(timeDifference / secondsInYear);
            return `${years} year${years > 1 ? 's' : ''} ago`;
        }
    };
    

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredData = data.filter(item =>
        (filterSignalStatus === '' || item.signalStatus.toLowerCase() === filterSignalStatus) &&
        (filterBatteryStatus === '' || item.batteryStatus.toLowerCase().includes(filterBatteryStatus)) &&
        (item.serial_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
         item.signalStatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
         item.batteryStatus.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const getSignalStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'bagus':
                return 'text-green-500';
            case 'sedang':
                return 'text-yellow-500';
            case 'buruk':
                return 'text-red-500';
            default:
                return 'text-black';
        }
    };

    return (
        <div className="bg-[#F9F9F9] rounded-[30px] h-[600px] border border-[#BFB2B2] shadow-md shadow-[#606060] flex flex-col p-2 bordershadow-2xl overflow-x-scroll lg:overflow-hidden">
            <div className="flex justify-end flex-grow-0 p-5 sticky top-0 left-0 lg:mr-4">
                <Input
                    type="text"
                    className="w-56 py-0 px-5 rounded-full border"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="lg:p-2 lg:flex lg:justify-end text-sm grid grid-cols-3 gap-2 lg:mr-6">
                <select
                    value={filterSignalStatus}
                    onChange={(e) => setFilterSignalStatus(e.target.value)}
                    className="px-3 py-2 rounded-md border"
                >
                    <option value="">Signal Status</option>
                    <option value="bagus">Bagus</option>
                    <option value="sedang">Sedang</option>
                    <option value="buruk">Buruk</option>
                </select>

                <select
                    value={filterBatteryStatus}
                    onChange={(e) => setFilterBatteryStatus(e.target.value)}
                    className="px-3 py-2 rounded-md border"
                >
                    <option value="">Battery Status</option>
                    <option value="stabil">Stabil</option>
                    <option value="drop">Drop</option>
                </select>
            </div>
            <Table className='w-[900px] overflow-x-scroll rounded-[30px] lg:w-[97%] mx-auto bg-[#F8E9E9]'>
                <TableHeader>
                    <TableRow>
                        <TableHead className="p-2 text-center font-bold text-black">No</TableHead>
                        <TableHead className="p-2 text-center font-bold text-black">SN Device</TableHead>
                        <TableHead className="p-2 text-center font-bold text-black">Signal Status</TableHead>
                        <TableHead className="p-2 text-center font-bold text-black">Rate Data Flow</TableHead>
                        <TableHead className="p-2 text-center font-bold text-black">Status Baterai</TableHead>
                        <TableHead className="p-2 text-center font-bold text-black">Status Last Data</TableHead>
                        <TableHead className="p-2 text-center font-bold text-black">Detail</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredData.map((item, index) => (
                        <TableRow key={index}>
                            <TableHead className="text-xs text-center">{index + 1}</TableHead>
                            <TableHead className="text-xs text-center">{item.serial_number}</TableHead>
                            <TableHead className={`text-xs text-center uppercase ${getSignalStatusColor(item.signalStatus)}`}>{item.signalStatus}</TableHead>
                            <TableHead className="text-xs text-center">{item.rateDataFlow} m3/s</TableHead>
                            <TableHead className="text-xs text-center">{item.batteryStatus}</TableHead>
                            <TableHead className="text-xs text-center">{formatTimestamp(item.timestamp)}</TableHead>
                            <TableHead className="text-xs text-center">
                                <Button onClick={handleDetailClick} className="bg-green-500 hover:bg-green-700 w-15 h-6">Detail</Button>
                            </TableHead>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default DeviceStatus;
