import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';

const View = () => {
    const [user, setUser] = useState(null);
    const { id } = useParams();
    const getSingleUser = async (id) => {
        const response = await axios.get(`http://localhost:5000/v1/user/${id}`);
        if (response.status === 200) {
            setUser(response.data);
        }
    }
    useEffect(() => {
        if (id) {
            getSingleUser(id);
        }
    }, [id]);



    return (
        <div className='cart__info'>
            <div className="card">
                <div className="card__header">
                    <p>User Contact Detail</p>
                </div>
                <div className="container">
                    <strong>ID: </strong>
                    <strong>{user && user._id}</strong> <br /> <br />
                    <strong>Name: </strong>
                    <strong>{user && user.name}</strong> <br /> <br />
                    <strong>Year: </strong>
                    <strong>{user && user.year}</strong> <br /> <br />
                    <strong>Email: </strong>
                    <strong>{user && user.email}</strong> <br /> <br />
                    <strong>Role: </strong>
                    <strong>{user && user.role}</strong> <br /> <br />
                    <Link to={"/"}>
                        <button className='btn btn-edit'>Go Back</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default View;