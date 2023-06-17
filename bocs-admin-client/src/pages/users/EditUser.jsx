import { Button, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import axiosInstance from '../../axiosInstance/axiosInstance';
import { useParams } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumb';
import SelectInput from '@mui/material/Select/SelectInput';

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



    const onSubmit = (data) => {
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
        if (data.birthday !== user.birthday) {
            updatedData.birthday = data.birthday;
        }
        if (data.role !== user.role) {
            updatedData.role = data.role;
        }

        // Send the updated data in a PATCH request
        // fetch(`/users/${user.id}`, {
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

        console.log(updatedData)
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
                        <label>Device ID <span className="text-xs text-danger"> (Be carefull about changing DeviceID)</span></label>
                        <TextField

                            inputProps={{
                                ...register('deviceId'),
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