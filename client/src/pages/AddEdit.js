import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
    name: '',
    year: '',
    email: '',
    role: '',
};

const AddEdit = () => {
    const [state, setState] = useState(initialState);

    const { name, year, email, role } = state;

    // =================================================================================
    const { id } = useParams();
    const getSingleUser = async (id) => {
        const response = await axios.get(`http://localhost:5000/v1/user/${id}`);
        if (response.status === 200) {
            setState(response.data);
        }
    }
    useEffect(() => {
        if (id) {
            getSingleUser(id);
        }
    }, [id]);
    // =================================================================================

    const navigate = useNavigate();

    const addContact = async (data) => {
        const response = await axios.post("http://localhost:5000/v1/user", data);
        if (response.status === 200) {
            toast.success("User added successfully");
        }
    }

    const updateContact = async (data, userID) => {
        const response = await axios.put(`http://localhost:5000/v1/user/${userID}`, data);
        if (response.status === 200) {
            toast.success("User updated successfully");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name && !email && !year && !role) {
            toast.error("Please provide value into each input field");
        } else {
            if (!id) {
                addContact(state);
            } else {
                updateContact(state, id);
            }
            navigate('/');
        }
    }

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    return (
        <div class="flex justify-center items-center mt-44">
            <div class="bg-white p-8 rounded shadow-lg">
                <form class="max-w-3xl w-96 mx-auto" onSubmit={handleSubmit}>
                    <label class="block mb-2" for="name">Name</label>
                    <input class="block w-full px-4 py-2 mb-4 rounded border-gray-300 focus:outline-none focus:border-blue-500" type="text" id="name" name="name" placeholder="Enter name..." onChange={handleInputChange} value={name} />

                    <label class="block mb-2" for="year">Year</label>
                    <input class="block w-full px-4 py-2 mb-4 rounded border-gray-300 focus:outline-none focus:border-blue-500" type="text" id="year" name="year" placeholder="Enter year..." onChange={handleInputChange} value={year} />

                    <label class="block mb-2" for="email">Email</label>
                    <input class="block w-full px-4 py-2 mb-4 rounded border-gray-300 focus:outline-none focus:border-blue-500" type="text" id="email" name="email" placeholder="Enter email..." onChange={handleInputChange} value={email} />

                    <label class="block mb-2" for="role">Role</label>
                    <input class="block w-full px-4 py-2 mb-4 rounded border-gray-300 focus:outline-none focus:border-blue-500" type="text" id="role" name="role" placeholder="Enter role..." onChange={handleInputChange} value={role} />

                    <button class="block w-full px-4 py-2 mt-12 text-white bg-blue-500 rounded hover:bg-blue-600" type="submit">{id ? "Update new Info" : "Create new User"}</button>
                </form>
            </div>
        </div>
    );
};

export default AddEdit;