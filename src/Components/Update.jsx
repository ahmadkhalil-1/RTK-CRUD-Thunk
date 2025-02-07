import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateUser } from '../features/userDetails';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Update = () => {
    const { users, loading } = useSelector((state) => state.app);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [updateUserData, setUpdateUserData] = useState(null);

    useEffect(() => {
        if (id) {
            const singleUser = users.find((user) => user.id === id);
            if (singleUser) {
                setUpdateUserData(singleUser);
            }
        }
    }, [id, users]);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        gender: Yup.string().required('Gender is required'),
    });

    if (loading) return <h1 className="text-center">Loading...</h1>;
    if (!updateUserData) return <h4 className="text-center">User not found</h4>;

    return (
        <div className="container">
            <Formik
                initialValues={{
                    name: updateUserData.name || '',
                    email: updateUserData.email || '',
                    gender: updateUserData.gender || '',
                }}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    dispatch(updateUser({ id, ...values }));
                    navigate('/');
                }}
            >
                {({ errors, touched }) => (
                    <Form className="w-50 mx-auto">
                        <h1 className="text-center mt-5">Update User</h1>

                        {/* Name Field */}
                        <div className="mb-3">
                            <label className="form-label">Name:</label>
                            <Field type="text" name="name" className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`} placeholder="Enter name" />
                            <ErrorMessage name="name" component="div" className="invalid-feedback" />
                        </div>

                        {/* Email Field */}
                        <div className="mb-3">
                            <label className="form-label">Email:</label>
                            <Field type="email" name="email" className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`} placeholder="Enter email" />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>

                        {/* Gender Field */}
                        <div className="mb-3">
                            <label className="form-label d-block">Gender:</label>
                            <div className="form-check form-check-inline">
                                <Field type="radio" name="gender" value="Male" className="form-check-input" id="male" />
                                <label className="form-check-label" htmlFor="male">Male</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <Field type="radio" name="gender" value="Female" className="form-check-input" id="female" />
                                <label className="form-check-label" htmlFor="female">Female</label>
                            </div>
                            <ErrorMessage name="gender" component="div" className="text-danger" />
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="btn btn-primary">Update</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Update;
