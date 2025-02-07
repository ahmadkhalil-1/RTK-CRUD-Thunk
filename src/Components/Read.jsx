import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, readUser } from '../features/userDetails';
import UserDataModal from './UserDataModal';
import { Link } from 'react-router-dom';

const Read = () => {
    const { users, loading, searchData } = useSelector((state) => state.app);
    const [modal, setModal] = useState(false);
    const [id, setId] = useState(null);
    const [radio, setRadio] = useState("");
    const [pinnedUsers, setPinnedUsers] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(readUser());
    }, [dispatch]);

    const handleView = (userId) => {
        setId(userId);
        setModal(true);
    };

    const handleDelete = (id) => {
        dispatch(deleteUser(id));
    };

    const togglePin = (user) => {
        if (pinnedUsers.some(p => p.id === user.id)) {
            setPinnedUsers(pinnedUsers.filter(p => p.id !== user.id));
        } else {
            setPinnedUsers([user, ...pinnedUsers]);
        }
    };

    const filteredUsers = users
        .filter((user) =>
            searchData.length === 0
                ? user
                : user.name.toLowerCase().includes(searchData.toLowerCase())
        )
        .filter((user) => (radio ? user.gender === radio : user));

    const displayedUsers = [
        ...pinnedUsers,
        ...filteredUsers.filter((user) => !pinnedUsers.some(p => p.id === user.id))
    ];

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Users Detail</h1>

            {modal && <UserDataModal id={id} setModal={setModal} />}

            <div className="d-flex justify-content-center gap-3 mb-4">
                {["", "Male", "Female"].map((gender) => (
                    <div className="form-check" key={gender}>
                        <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value={gender}
                            onChange={() => setRadio(gender)}
                            checked={radio === gender}
                        />
                        <label className="form-check-label">{gender === "" ? "All" : gender}</label>
                    </div>
                ))}
            </div>

            {loading ? (
                <h1 className="text-center">Loading...</h1>
            ) : displayedUsers.length > 0 ? (
                <div className="row justify-content-center">
                    {displayedUsers.map((user) => (
                        <div key={user.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                            <div className={`card shadow-sm border-0 rounded ${pinnedUsers.some(p => p.id === user.id) ? 'border-warning' : ''}`}>
                                <div className="card-body text-center">
                                    <h5 className="card-title fw-bold">{user.name}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
                                    <p className="card-text">{user.gender}</p>
                                    <div className="d-flex justify-content-center gap-2">
                                        <button onClick={() => handleView(user.id)} className="btn btn-success btn-sm">
                                            View
                                        </button>
                                        <Link to={`/update/${user.id}`} className="btn btn-primary btn-sm">
                                            Update
                                        </Link>
                                        <button onClick={() => handleDelete(user.id)} className="btn btn-danger btn-sm">
                                            Delete
                                        </button>
                                        <button onClick={() => togglePin(user)} className={`btn btn-${pinnedUsers.some(p => p.id === user.id) ? 'warning' : 'secondary'} btn-sm`}>
                                            {pinnedUsers.some(p => p.id === user.id) ? 'Unpin' : 'Pin'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <h4 className="text-center">No user found</h4>
            )}
        </div>
    );
};

export default Read;
