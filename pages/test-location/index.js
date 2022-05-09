import Head from 'next/head'
import Layout from '../../components/layout'
import { Divider, Typography, Button } from "@mui/material";
import { useState } from 'react';

const CreateForm = () => {
    const [heading, setHeading] = useState('Test if location works')
    const [message, setMessage] = useState('Click the below button to see if we can retrieve your latitude and longitude...')

    const onSubmit = (event) => {
        event.preventDefault()
        setHeading('Loading...')
        setMessage('Trying to get your location')
        async function success(pos) {
            const crd = pos.coords

            setHeading('Successfully got location')
            setMessage(`Latitude: ${crd.latitude}, longitude: ${crd.longitude}`)
        }

        function error(err) {
            console.error(err.message)
            setHeading('Error getting your location')
            setMessage(`Failed to get location because: ${err.message}`)
        }

        // options for retrieving long/lat
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }

        navigator.geolocation.getCurrentPosition(success, error, options);
    }

    return (
        <form onSubmit={onSubmit}>
            <Typography variant='h5'>{heading}</Typography>
            <br />
            <Divider />
            <br />
            <Typography align='left'>
                {message}
            </Typography>
            <br/>
            <Button
                variant='contained'
                type='submit'>
                Start test
            </Button>
        </form>
    )
}

export default function FirstPost() {
    return (
        <Layout>
            <Head>
                <title>Test location</title>
            </Head>
            <CreateForm />
        </Layout>
    )
}
