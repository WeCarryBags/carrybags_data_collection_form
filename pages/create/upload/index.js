import Head from 'next/head'
import imageCompression from 'browser-image-compression';
import Layout from '../../../components/layout'
import Dropzone from 'react-dropzone'
import { Alert, Backdrop, Box, Button, CircularProgress, Divider, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';
import { buttonStyle } from '../..';
import { FormCircleBlue } from '../../../components/form-step-circles/FormCircleBlue';
import { FormLineBlue } from '../../../components/form-step-circles/FormLineBlue';



const UploadInstructions = ({ title, text }) => (
    <>
        <Typography sx={{ paddingTop: '0.4em' }} align='left' fontWeight={550}>
            {title}
        </Typography>
        <Typography sx={{ paddingBottom: '0.8em' }} align='left'>
            {text}
        </Typography>
    </>
)

const compressionOptions = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
}

const compressIfImage = async (file) => {
    if (file) {
        if (file.type.includes('image')) {
            return await imageCompression(file, compressionOptions)
        }
    }

    return file
}

// Different react components for different error messages.

// If there is a network timeout
const TimeoutMessage = () => (
    <>
        <Typography variant='h5'><p>Network timeout! :(</p></Typography>
        <Typography><p>Unfortunately, we had trouble submitting your data because of poor network connection.</p></Typography>
        <Typography><p>Please close this message by clicking anywhere on the screen and try again.</p></Typography>
        <Typography><p>It may help if you can move to an area with better connection.</p></Typography>
        <Typography><p>Thank you.</p></Typography>
    </>
)

// Error message if files are too big
const MaxFileSizeExceededMessage = () => (
    <>
        <Typography variant='h5'><p>Maximum file size exceeded! :(</p></Typography>
        <Typography><p>Unfortunately, we are not able to submit the provided files because they are too large.</p></Typography>
        <Typography><p>We take care of this issue automatically for images, but we cannot do this for every file format.</p></Typography>
        <Typography><p>Please try uploading a smaller file or compress this one.</p></Typography>
        <Typography><p>Thank you.</p></Typography>
    </>
)

// If we don't know the error
const UnknownErrorMessage = ({ err }) => (
    <>
        <Typography variant='h5'><p>An error has occurred! :(</p></Typography>
        <Typography><p>If you are a developer, please see logs below.</p></Typography>
        <Typography><p>Otherwise, please tell us what happened and copy the below logs to support@wecarrybags.co.uk</p></Typography>
        <Typography><p>You can close this error box by clicking anywhere on the screen.</p></Typography>
        <Typography><p>Thank you.</p></Typography>
        <pre style={{
            "marginTop": 0,
            "marginBottom": "24px",
            "padding": "12px",
            "fontSize": "1em",
            "width": "60vw",
            "backgroundColor": "#c4c4c4",
            "borderRadius": "2px",
            "wordWrap": "breakWord",
            "overflow": "scroll"
        }}>
            Message: {err.message}
            <br />
            Stack trace: {err.stack}
        </pre>
    </>
)

// takes an error object and 
// returns appropriate react message
const errorSelector = (err) => {
    // return nothing if there is no error
    if (!err) {
        return
    }

    // if there is a network timeout, display that
    if (err.message.toLowerCase().includes('timeout')) {
        return <TimeoutMessage />
    }

    // if file size is too big
    if (err.message === 'Request failed with status code 413') {
        <MaxFileSizeExceededMessage />
    }

    // if error is not recognised, return unknown error
    return <UnknownErrorMessage err={err} />
}

const CreateForm = () => {
    const router = useRouter()

    // error and loading variables/state
    const [loading, setLoading] = useState(false)
    const [errorOpen, setErrorOpen] = useState(false)
    const [errorObject, setErrorObject] = useState(false)

    // error handling code here
    const errorHandler = (err) => {
        console.log(err)
        console.log(err.message)
        setErrorObject(err)
        setErrorOpen(true)
    }

    // button
    const [storeButtonColour, setStoreButtonColour] = useState('lightblue')
    const [idButtonColour, setIdButtonColour] = useState('white')

    // Files
    const [storePhoto, setStorePhoto] = useState(null)
    const [idProof, setIdProof] = useState(null)

    //for react dropzone to update file variables
    const onDropIdProof = async (acceptedFiles) => {
        setIdProof(acceptedFiles[0])
    }

    const onDropStorePhoto = async (acceptedFiles) => {
        setStorePhoto(acceptedFiles[0])
    }

    // react components for different files
    const photoUpload = () => (
        <>
            <UploadInstructions
                title={'Please upload your store photo'}
                text={'We will use this photo to show your store on our app.'}
            />
            <Dropzone
                onDrop={onDropStorePhoto}>
                {({ getRootProps, getInputProps }) => (
                    <Box
                        {...getRootProps()}
                        sx={{
                            "width": "100%",
                            "height": "30vh",
                            backgroundColor: "#F5F5F5",
                            border: 1,
                            borderRadius: 3,
                            borderStyle: "dashed",
                            borderColor: '#80837E7E',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: "center",
                            justifyContent: "center"
                        }}>

                        <input {...getInputProps()} />
                        {
                            <>
                                <Box
                                    component="img"
                                    sx={{
                                        width: "20%",
                                        heigt: "10%"
                                    }}
                                    src="/file-upload.svg"
                                />

                                <Typography sx={{ color: "#837E7E", paddingBottom: "0.1vh" }}>
                                    Drag & Drop your store photo file
                                </Typography>
                                <Typography sx={{ color: "#837E7E", paddingBottom: "0.1vh" }}>
                                    or
                                </Typography>
                                <Typography sx={{ color: "#3E8EF1" }}>
                                    Browse files
                                </Typography>
                            </>
                        }
                    </Box>
                )}
            </Dropzone>
        </>

    )

    const idUpload = () => (
        <>
            <UploadInstructions
                title={'Please upload your ID Proof'}
                text={'Please ensure your file includes all edges or else it may be rejected.'}
            />
            <Dropzone
                onDrop={onDropIdProof}>
                {({ getRootProps, getInputProps }) => (
                    <div
                        style={{
                            "width": "100%",
                            "height": "30vh",
                            backgroundColor: "#F5F5F5",
                            border: 1,
                            borderRadius: 3,
                            borderStyle: "dashed",
                            borderColor: '#80837E7E',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        {...getRootProps()}>
                        <input {...getInputProps()} />
                        {
                            <>
                                <Box
                                    component="img"
                                    sx={{
                                        width: "20%",
                                        heigt: "10%"
                                    }}
                                    src="/file-upload.svg"
                                />

                                <Typography sx={{ color: "#837E7E", paddingBottom: "0.1vh" }}>
                                    Drag & Drop your ID proof file
                                </Typography>
                                <Typography sx={{ color: "#837E7E", paddingBottom: "0.1vh" }}>
                                    or
                                </Typography>
                                <Typography sx={{ color: "#3E8EF1" }}>
                                    Browse files
                                </Typography>
                            </>
                        }
                    </div>
                )}
            </Dropzone>
        </>
    )

    const [currentUpload, setCurrentUpload] = useState(photoUpload)

    const onSubmit = async (event) => {
        event.preventDefault()
        setLoading(true);

        // compress files if images
        const compressedPhoto = await compressIfImage(storePhoto)
        const compressedProof = await compressIfImage(idProof)

        // add all fields in json object
        const data = {
            ...router.query,
            idProof: compressedProof,
            storePhoto: compressedPhoto,
        }

        // add all data to form
        const formData = new FormData()
        for (const [key, value] of Object.entries(data)) {
            formData.set(key, value)
        }

        //send data to API
        try {
            // Send request to save form data with 60 second timeout.
            await axios.post('https://calm-forest-72399.herokuapp.com/api/partners/submit-data-collection-form',
                formData,
                { timeout: 60000 })
            router.push('/create/submitted')
        } catch (err) {
            console.log(err)
            console.log(err.message)
            setLoading(false)
            errorHandler(err)
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <Typography variant='h5' fontWeight={600}>
                Upload files (optional)
            </Typography>
            <br />
            <Divider />
            <br />
            <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", marginBottom: '1em' }}>
                <FormCircleBlue text={'1'} />
                <FormLineBlue />
                <FormCircleBlue text={'2'} />
                <FormLineBlue />
                <FormCircleBlue text={'3'} />
            </Box>
            {currentUpload}
            <br />
            <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                <Button
                    variant="outlined"
                    sx={{
                        borderRadius: 100,
                        width: "90%",
                        backgroundColor: storeButtonColour,
                        marginRight: "0.5em",
                        height: '3.5em'
                    }}
                    onClick={() => {
                        setStoreButtonColour('lightblue')
                        setIdButtonColour('white')
                        setCurrentUpload(photoUpload)
                    }}>
                    Store photo
                </Button>
                <Button
                    variant="outlined"
                    sx={{
                        borderRadius: 100,
                        width: "90%",
                        backgroundColor: idButtonColour,
                        marginLeft: "0.5em",
                        height: '3.5em'
                    }}
                    onClick={() => {
                        setStoreButtonColour('white')
                        setIdButtonColour('lightblue')
                        setCurrentUpload(idUpload)
                    }}>
                    ID Proof
                </Button>
            </Box>
            <br />
            {idProof && <>
                <Alert
                    severity="success"
                    onClose={() => setIdProof(null)}
                >
                    {idProof.name}
                </Alert>
                <br />
            </>}
            {storePhoto && <>
                <Alert
                    severity="success"
                    onClose={() => setStorePhoto(null)}
                >
                    {storePhoto.name}
                </Alert>
                <br />
            </>}
            <Button type='submit' variant="contained" sx={buttonStyle}>Submit</Button>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
                onClick={() => setLoading(false)}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Backdrop
                sx={{ backgroundColor: 'white', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={errorOpen}
                onClick={() => setErrorOpen(false)}
            >
                <Box
                    sx={{ backgroundColor: 'white', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                >
                    {errorSelector(errorObject)}
                </Box>
            </Backdrop>
        </form>
    )
}

export default function FirstPost() {
    return (
        <Layout>
            <Head>
                <title>Upload files</title>
            </Head>
            <CreateForm />
        </Layout>
    )
}
