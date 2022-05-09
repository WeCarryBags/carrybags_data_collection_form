import Head from 'next/head'
import { Button, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import Layout from '../../components/layout'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'

const StoreTable = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios
            .get('/api/stores/read-all')
            .then(response => {
                console.log(response.data)
                setData(response.data)
            })
    }, [])

    return (<>
        <Typography variant='h5'>View stores</Typography>
        <br />
        <Divider />
        <br />
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <strong>
                                Store name
                            </strong>
                        </TableCell>
                        <TableCell align="left">
                            <strong>
                                Proof of ID
                            </strong>
                        </TableCell>
                        <TableCell align="left">
                            <strong>
                                Terms accepted
                            </strong>
                        </TableCell>
                        <TableCell align="left">
                            <strong>
                                View Details
                            </strong>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(element =>
                        <TableRow key={element._id}>
                            <TableCell>
                                {element.storeName}
                            </TableCell>
                            <TableCell>
                                {element.idProof !== '' ? 'Provided' : 'Not Provided'}
                            </TableCell>
                            <TableCell>
                                {element.termsAccepted ? 'Accepted' : 'Not accepted'}
                            </TableCell>
                            <Link href={`/show/${element._id}`}>
                                <TableCell>
                                    <Button 
                                    variant='text'
                                    sx={{width: '100%', height: '100%'}}
                                    >VIEW</Button>
                                </TableCell>
                            </Link>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    </>)
}

export default function StoreList() {
    const router = useRouter()
    return (
        <Layout>
            <Head>
                <title>View Stores</title>
            </Head>
            <StoreTable />
            <br />
            <Button
                sx={{ width: "100%" }}
                variant="outlined"
                onClick={() => router.push('/')}>
                Home
            </Button>
        </Layout>
    )
}
