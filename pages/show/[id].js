import React, { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";


// importing stuff for MUI-styled tables
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button, Divider, Link, Table, TableBody, Typography} from "@mui/material";
import Layout from "../../components/layout";
import Head from "next/head";
import { useRouter } from "next/router";

const PDFViewer = dynamic(() => import("../../components/PdfViewer"), {
    ssr: false
})

const ShowStoreTable = () => {
    const router = useRouter()
    const { id } = router.query
    const [data, setData] = useState({})
    const [verificationStatus, setVerificationStatus] = useState('Loading...')

    useEffect(() => {
        // useRouter() does not work in useEffect
        const id = window.location.href.split('/').pop()
        axios
            .get(`/api/stores/read-one/${id}`)
            .then(response => {
                let data = response.data
                data.date = data.date.substring(0, 10)
                console.log(data)
                console.log(data.idProof)
                setData(data)
                setVerificationStatus(data.verificationStatus)
            })
    }, [])

    const updateVerificationStatus = async (newStatus) => {
        setVerificationStatus('Updating...')
        try {
            await axios.put(`/api/stores/update-verification/${id}`,
                { 'verificationStatus': newStatus })
            setVerificationStatus(newStatus)
        } catch (err) {
            console.log(err)
            setVerificationStatus('Error updating')
        }
    }

    // Function to generate preview
    const generatePreview = () => {
        if (data.idProof === undefined || data.idProof === null) {
            //exit function if not uploaded
            return
        }
        if (data.idProof.includes('.pdf')) {
            return (
                <>
                    <h2>Preview of ID proof</h2>
                    <PDFViewer src={data.idProof} />
                </>
            )
        } else if (data.idProof.includes('https')) {
            return (
                <>
                    <h2>Preview of ID proof</h2>
                    <img
                        alt={"ID proof uploaded for this store"}
                        style={{ maxWidth: 500, }} src={data.idProof} />
                </>
            )
        }
    }

    // load data
    return (
        <>
            <Typography variant='h5'>View store</Typography>
            {
                data.storePhoto === ''
                ? <Typography>No photo provided</Typography>
                : <img alt={`A photo of ${data.storeName}`}
                        style={{
                    margin: '0.5rem',
                    maxHeight: '10rem'
                }} src={data.storePhoto}/>
            }
            <br />
            <Divider />
            <br />
            <TableContainer align="center" component={Paper}>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">
                            <strong>
                                Store name:
                            </strong>
                        </TableCell>
                        <TableCell>
                            {data.storeName}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableRow>
                    <TableCell>
                        <strong>Contact number: </strong>
                    </TableCell>
                    <TableCell>{data.contactNumber}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <strong>Date: </strong>
                    </TableCell>
                    <TableCell>
                        {data.date}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <strong>Authorised Person Name: </strong>
                    </TableCell>
                    <TableCell>{data.authorisedPersonName}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <strong>Authorised Person Email: </strong>
                    </TableCell>
                    <TableCell>{data.spokespersonEmail}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <strong>Address: </strong>
                    </TableCell>
                    <TableCell>
                        {data.address}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <strong>CarryBags Representative: </strong>
                    </TableCell>
                    <TableCell>
                        {data.carryBagsRepresentative}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <strong>Proof of ID: </strong>
                    </TableCell>
                    <TableCell>
                        {data.idProof === null
                            ? 'No proof provided'
                            : <Link href={data.idProof}>Click to view</Link>}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <strong>Terms accepted: </strong>
                    </TableCell>
                    <TableCell>
                        {data.termsAccepted ? 'Accepted' : 'Not accepted'}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <strong>Verified: </strong>
                    </TableCell>
                    <TableCell>
                        {verificationStatus}
                    </TableCell>
                </TableRow>
            </TableContainer>
            <br/>
            <Typography variant='h6'>Store hours</Typography>
            <br/>
            <Table>
                <TableBody>
                        {data.days && data.days.map(
                            (day) =>
                            day[3] === 'true'
                            ?
                            <TableRow key={day}>
                                <TableCell>
                                    {day[0]}
                                </TableCell>
                                <TableCell>
                                    {day[1]}
                                </TableCell>
                                <TableCell>
                                    {day[2]}
                                </TableCell>
                            </TableRow>
                            :
                            <TableRow key={day}>
                                <TableCell>
                                    {day[0]}
                                </TableCell>
                                <TableCell>
                                    Closed
                                </TableCell>
                            </TableRow>
                        )}
                </TableBody>
            </Table>
            <Button
                variant="outlined"
                onClick={() => updateVerificationStatus('accepted')} >
                SET TO ACCEPTED
            </Button>
            <Button
                variant="outlined"
                onClick={() => updateVerificationStatus('pending')} >
                SET TO PENDING
            </Button>
            <Button
                variant="outlined"
                onClick={() => updateVerificationStatus('rejected')}>
                SET TO REJECTED
            </Button>
            {
                generatePreview()
            }
        </>
    )
}

export default function ShowStore() {
    const router = useRouter()
    return (
        <Layout>
            <Head>
                <title>Store view</title>
            </Head>
            <ShowStoreTable />
            <br />
            <Button
                sx={{ width: "100%" }}
                variant="outlined"
                onClick={() => router.push('/list')}>
                List
            </Button>
        </Layout>
    )
}
