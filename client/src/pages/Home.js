import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
const Home = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await axios.get("http://localhost:5000/v1/user");
        if (response.status === 200) {
            setData(response.data);
        };
    }

    const onDeleteUser = async (id) => {
        if (window.confirm("Are you sure that you wanted to that user?")) {
            const response = await axios.delete(`http://localhost:5000/v1/user/${id}`);
            if (response.status === 200) {
                toast.success("Delete user successfully!");
                getUsers();
            }
        }
    }

    return (
        <div class="flex justify-center items-center mt-32">
            <div class="bg-white p-8 rounded shadow-lg">
                <table class="w-full table-auto text-lg">
                    <thead>
                        <tr className='bg-[#28b0bf] text-[#fff]'>
                            <th class="text-center px-6 py-3">No.</th>
                            <th class="text-center px-6 py-3">Name</th>
                            <th class="text-center px-6 py-3">Year</th>
                            <th class="text-center px-6 py-3">Email</th>
                            <th class="text-center px-6 py-3">Role</th>
                            <th class="text-center px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((item, index) => {
                            return (
                                <tr key={index} class={index % 2 === 0 ? 'bg-blue-200' : 'bg-blue-100'}>
                                    <td class="text-center px-6 py-4">{index + 1}</td>
                                    <td class="text-center px-6 py-4">{item.name}</td>
                                    <td class="text-center px-6 py-4">{item.year}</td>
                                    <td class="text-center px-6 py-4">{item.email}</td>
                                    <td class="text-center px-6 py-4">{item.role}</td>
                                    <td class="text-center px-6 py-4">
                                        <Link to={`/update/${item._id}`}>
                                            <button className='btn btn-edit'>Edit</button>
                                        </Link>
                                        <button className='btn btn-delete' onClick={() => onDeleteUser(item._id)}>Delete</button>
                                        <Link to={`/view/${item._id}`}>
                                            <button className='btn btn-view'>View</button>
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default Home;