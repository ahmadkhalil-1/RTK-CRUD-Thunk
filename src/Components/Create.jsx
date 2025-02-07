import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../features/userDetails';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Create = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        gender: Yup.string().required('Gender is required'),
    });

    return (
        <div className='container'>
            <Formik
                initialValues={{ name: '', email: '', gender: '' }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    dispatch(createUser(values));
                    navigate('/');
                }}
            >
                {({ errors, touched }) => (
                    <Form className='w-50 mx-auto'>
                        <h1 className='text-center mt-5'>Create User</h1>
                        <div className="mb-3">
                            <label className="form-label">Name:</label>
                            <Field type="text" name="name" className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`} placeholder="Enter name" />
                            <ErrorMessage name="name" component="div" className="invalid-feedback" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email:</label>
                            <Field type="email" name="email" className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`} placeholder="Enter email" />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
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

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Create;
