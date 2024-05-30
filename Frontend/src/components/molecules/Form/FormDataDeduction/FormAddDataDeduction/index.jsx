
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../../../../layout';
import Swal from 'sweetalert2';
import { Breadcrumb, ButtonOne, ButtonTwo } from '../../../../../components';
import { createDataDeduction, getMe } from '../../../../../config/redux/action';

const FormAddDataDeduction = () => {
    const [formData, setFormData] = useState({
        deduction: '',
        amount_deduction: '',
    });

    const {
        deduction,
        amount_deduction,
    } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);

    const submitDataDeduction = (e) => {
        e.preventDefault();
        const newFormData = new FormData();
        newFormData.append('deduction', deduction);
        newFormData.append('amount_deduction', amount_deduction);

        dispatch(createDataDeduction(newFormData, navigate))
            .then((response) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.msg) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed',
                        text: error.response.data.msg,
                        confirmButtonText: 'Ok',
                    });
                } else if (error.message) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed',
                        text: error.message,
                        confirmButtonText: 'Ok',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed',
                        text: 'An error occurred',
                        confirmButtonText: 'Ok',
                    });
                }
            });

    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    // useEffect(() => {
    //     if (isError) {
    //         navigate('/login');
    //     }
    //     if (user && user.accessLevel !== 'admin') {
    //         navigate('/dashboard');
    //     }
    // }, [isError, user, navigate]);

    return (
        <Layout>
            <Breadcrumb pageName='Deduction Data Form' />

            <div className='sm:grid-cols-2'>
                <div className='flex flex-col gap-9'>
                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Deduction Data Form
                            </h3>
                        </div>
                        <form onSubmit={submitDataDeduction}>
                            <div className='p-6.5'>
                                <div className='mb-4.5 '>
                                    <div className='w-full mb-4'>
                                        <label className='mb-4 block text-black dark:text-white'>
                                            Deduction <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='text'
                                            id='deduction'
                                            name='deduction'
                                            value={deduction}
                                            onChange={handleChange}
                                            required={true}
                                            placeholder='Enter deduction'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>

                                    <div className='w-full mb-4'>
                                        <label className='mb-4 block text-black dark:text-white'>
                                            Amount Deduction <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='number'
                                            id='amount_deduction'
                                            name='amount_deduction'
                                            value={amount_deduction}
                                            onChange={handleChange}
                                            required
                                            placeholder='Enter amount deduction'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                </div>

                                <div className='flex flex-col md:flex-row w-full gap-3 text-center'>
                                    <div>
                                        <ButtonOne  >
                                            <span>Save</span>
                                        </ButtonOne>
                                    </div>
                                    <Link to="/deduction-data" >
                                        <ButtonTwo  >
                                            <span>Back</span>
                                        </ButtonTwo>
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default FormAddDataDeduction;