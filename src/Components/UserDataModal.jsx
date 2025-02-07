import React from 'react'
import { useSelector } from 'react-redux'

const UserDataModal = ({ id, setModal }) => {
    const users = useSelector((state) => state.app.users);
    const singleUser = users.find((user) => user.id === id);

    if (!singleUser) return null;

    return (
        <>
            <div className="modal pt-5 show d-block bg-dark bg-opacity-50" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{singleUser.name}</h5>
                            <button type="button" className="btn-close" onClick={() => setModal(false)} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Email: {singleUser.email}</p>
                            <p>Age: {singleUser.age}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserDataModal;
