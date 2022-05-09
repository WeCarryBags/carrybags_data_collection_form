import Head from 'next/head'
import { useRouter } from 'next/router'
import { Divider, Typography } from '@mui/material'
import Layout from '../../../components/layout'

const CreateForm = () => {
    
    return (
        <>
            <Typography variant='h5'>Form submitted</Typography>
            <br />
            <Divider />
            <br />
            <Typography>
                Form submitted successfully. Redirecting in a few seconds...
            </Typography>
        </>
    )
}

export default function IndexForm() {
    const router = useRouter()

    // redirect in about 2.5 seconds
    setTimeout(() => router.push('/'), 2500)

    return (
        <Layout>
            <Head>
                <title>Store Details</title>
            </Head>
            <CreateForm />
        </Layout>
    )
}
