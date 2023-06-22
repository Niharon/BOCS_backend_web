import { Button, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import axiosInstance from '../../axiosInstance/axiosInstance';
import { useParams } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumb';
import toast from 'react-hot-toast';
import { updateUserApi } from '../../api/userApi';

const EditUser = () => {

    const { id } = useParams();
    const { register, handleSubmit, setValue } = useForm();
    const [user, setUser] = React.useState(null);


    const fetchUser = () => {
        axiosInstance(`/users/${id}`)
            .then((data) => {
                const userData = data?.data?.data;
                setUser(userData);
                setValue('name', userData.name);
                setValue('email', userData.email);
                setValue('phone', userData.phone);
                setValue('deviceId', userData.deviceId);
                setValue('device_changable', userData.device_changable);
                setValue('role', userData.role);
            })
            .catch((error) => {
                console.error('Error fetching user:', error);
            });
    };
    // Set initial form values

    useEffect(() => {
        fetchUser();
    }, [id]);



    const onSubmit = async (data) => {
        const updatedData = {};

        // Check if each field has been modified
        if (data.name !== user.name) {
            updatedData.name = data.name;
        }
        if (data.email !== user.email) {
            updatedData.email = data.email;
        }
        if (data.phone !== user.phone) {
            updatedData.phone = data.phone;
        }

        if (data.role !== user.role) {
            updatedData.role = data.role;
        }
        if (data.device_changable !== user.device_changable) {
            updatedData.device_changable = data.device_changable;
        }

        // Send the updated data in a PATCH request
        // fetch(`/admin/api/users/${user.id}`, {
        //     method: 'PATCH',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(updatedData),
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('User updated successfully:', data);
        //     })
        //     .catch((error) => {
        //         console.error('Error updating user:', error);
        //     });
        if (Object.keys(updatedData).length > 0) {
            const res = await updateUserApi({ id: user.id, data: updatedData })
            if(res.success){
                toast.success('User updated successfully')
            }
        }else{
            alert('No data changed')
        }
    };


    if (!user) {
        return <div>Loading...</div>;
    }

    // console.log(user);

    return (
        <div>
            <DefaultLayout>
                <Breadcrumb pageName="Edit User" />


                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
                    <div>
                        <label>Name</label>
                        <TextField

                            inputProps={{
                                ...register('name'),
                            }}
                            fullWidth
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <TextField
                            placeholder='Email@gmail.com'
                            inputProps={{
                                ...register('email'),
                            }}
                            fullWidth
                        />
                    </div>
                    <div>
                        <label>Device ID <span className="text-xs text-danger"> (You can't change this)</span></label>
                        <TextField

                            inputProps={{
                                ...register('deviceId'),
                                readOnly: true,
                            }}
                            color='warning'
                            fullWidth


                        />
                    </div>
                    <div>
                        <label>Phone NO</label>
                        <TextField
                            type='number'
                            placeholder='0123XXXXX'
                            inputProps={{
                                ...register('phone'),
                            }}
                            fullWidth

                        />
                    </div>

                    <div>
                        <label>Role</label>

                        <Select


                            inputProps={{
                                ...register('role'),
                            }}
                            fullWidth
                            defaultValue={user.role}
                        >
                            <MenuItem value={'user'}>User</MenuItem>
                            <MenuItem value={'admin'}>Admin</MenuItem>
                        </Select>

                    </div>
                    <div>
                        <label>Device Changable</label>

                        <Select


                            inputProps={{
                                ...register('device_changable'),
                            }}
                            fullWidth
                            defaultValue={user.device_changable}
                        >
                            <MenuItem value={false}>No</MenuItem>
                            <MenuItem value={true}>Yes</MenuItem>
                        </Select>

                    </div>

                    <div className="col-span-2">
                        <Button variant='contained' type="submit" className="btn">
                            Save
                        </Button>
                    </div>
                </form>
            </DefaultLayout>
        </div>
    )
}

export default EditUser