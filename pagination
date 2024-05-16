import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const DeviceStatus = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 20;
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await axios.get('http://36.92.168.180:6380/vito-anjay/dashboard/', {
                headers: {
                    'Accept': 'application/json',
                    "ngrok-skip-browser-warning": "true",
                },
                withCredentials: false,
            });
            const allData = response.data.data;
            setTotalPages(Math.ceil(allData.length / itemsPerPage));
            setData(allData);
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

        if (timeDifference < 60) {
            return 'Last Updated: now';
        } else if (timeDifference < 3600) {
            const minutes = Math.floor(timeDifference / 60);
            return `${minutes} minutes ago`;
        } else if (timeDifference < 86400) {
            const hours = Math.floor(timeDifference / 3600);
            return `${hours} hours ago`;
        } else {
            const days = Math.floor(timeDifference / 86400);
            return `${days} days ago`;
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page on new search
    };

    const filteredData = data.filter(item => 
        item.serial_number.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
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

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const generatePaginationItems = () => {
        const paginationItems = [];
        if (totalPages <= 6) {
            for (let i = 1; i <= totalPages; i++) {
                paginationItems.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(i);
                            }}
                            isCurrent={i === currentPage}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        } else {
            paginationItems.push(
                <PaginationItem key={1}>
                    <PaginationLink
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(1);
                        }}
                        isCurrent={1 === currentPage}
                    >
                        1
                    </PaginationLink>
                </PaginationItem>
            );
            if (currentPage > 3) {
                paginationItems.push(
                    <PaginationEllipsis key="start-ellipsis" />
                );
            }
            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);
            for (let i = startPage; i <= endPage; i++) {
                paginationItems.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(i);
                            }}
                            isCurrent={i === currentPage}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
            if (currentPage < totalPages - 2) {
                paginationItems.push(
                    <PaginationEllipsis key="end-ellipsis" />
                );
            }
            paginationItems.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(totalPages);
                        }}
                        isCurrent={totalPages === currentPage}
                    >
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }
        return paginationItems;
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
                <Select>
                    <SelectTrigger className="w-24 lg:w-[180px]">
                        <SelectValue placeholder="Signal Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Signal Status</SelectItem>
                        <SelectItem value="bagus">BAGUS</SelectItem>
                        <SelectItem value="sedang">SEDANG</SelectItem>
                        <SelectItem value="buruk">BURUK</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-24 lg:w-[180px]">
                        <SelectValue placeholder="Battery Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Battery Status</SelectItem>
                        <SelectItem value="stabil">Stabil</SelectItem>
                        <SelectItem value="drop">Drop</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-24 lg:w-[180px]">
                        <SelectValue placeholder="Last Data Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Last Data Status</SelectItem>
                        <SelectItem value="update">Update</SelectItem>
                        <SelectItem value="aWeekAgo">A Week Ago</SelectItem>
                        <SelectItem value="aMonthAgo">A Month Ago</SelectItem>
                    </SelectContent>
                </Select>
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
                    {paginatedData.map((item, index) => (
                        <TableRow key={index}>
                            <TableHead className="text-xs text-center">{(currentPage - 1) * itemsPerPage + index + 1}</TableHead>
                            <TableHead className="text-xs text-center">{item.serial_number}</TableHead>
                            <TableHead className={`text-xs text-center uppercase ${getSignalStatusColor(item.signalStatus)}`}>{item.signalStatus}</TableHead>
                            <TableHead className="text-xs text-center">{item.rateDataFlow}</TableHead>
                            <TableHead className="text-xs text-center">{item.batteryStatus}</TableHead>
                            <TableHead className="text-xs text-center">{formatTimestamp(item.timestamp)}</TableHead>
                            <TableHead className="text-xs text-center">
                                <Button onClick={handleDetailClick} className="bg-green-500 hover:bg-green-700 w-15 h-6">Detail</Button>
                            </TableHead>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (currentPage > 1) {
                                    handlePageChange(currentPage - 1);
                                }
                            }}
                        />
                    </PaginationItem>
                    {generatePaginationItems()}
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (currentPage < totalPages) {
                                    handlePageChange(currentPage + 1);
                                }
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}

export default DeviceStatus;
