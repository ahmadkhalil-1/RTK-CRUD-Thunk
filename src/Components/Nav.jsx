import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { searchUser } from '../features/userDetails';

const Nav = () => {
    const users = useSelector((state) => state.app.users);
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(searchUser(search));
    }, [search])

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark nav-dark text-light">
                <div className="container-fluid">
                    <Link to='/' className="navbar-brand text-light">RTK Thunk</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to='/' className="nav-link text-light" aria-current="page" href="#">All Users {`(${users.length})`}</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/create' className="nav-link text-light" href="#">Create Users</Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Search" aria-label="Search" />
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Nav
