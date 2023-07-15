import React, { useEffect } from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import Breadcrumb from '../../components/Breadcrumb'
import { Button, Input, TextField } from '@mui/material'
import { appSettingsApi, updateVersionApi } from '../../api/appSettingsApi'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

const AppSettings = () => {

    const [appVersion, setAppVersion] = React.useState("");

    const appSettingsQuery = useQuery({
        queryKey: ['appSettings'],
        queryFn: appSettingsApi,
        onSuccess: (data) => {
            // console.log(data)
            setAppVersion(data)
        }
    })

    const updateVersionMutation = useMutation({
        mutationKey: ['updateVersion'],
        mutationFn: updateVersionApi,
        onSuccess: (data) => {
            // console.log(data)
            setAppVersion(data);
            appSettingsQuery.refetch();
            toast.success('App Version Updated')
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const updateVersion = () => {
        updateVersionMutation.mutate(appVersion)
    }
    if(appSettingsQuery.isLoading){
        return <div>Loading...</div>
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName={'App Settings'} />

            <div className="px-10 py-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                    App Version
                </h2>
                <div className="flex flex-col gap-4 pr-12 my-8">
                    <div className='flex gap-5'>
                        <TextField
                            label="Android Version"
                            className="w-full md:w-1/2 mr-5"
                            placeholder="App Version"
                            value={appVersion.android_version || ""}
                            onChange={(e) => setAppVersion({ ...appVersion, android_version: e.target.value })}
                        />
                        <TextField
                            label="IOS Version"
                            className="w-full md:w-1/2 mr-5"
                            placeholder="App Version"
                            value={appVersion.ios_version || ""}
                            onChange={(e) => setAppVersion({ ...appVersion, ios_version: e.target.value })}
                        />

                    </div>
                    <Button onClick={updateVersion} className="mt-4 ml-5" variant="contained">Update </Button>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default AppSettings