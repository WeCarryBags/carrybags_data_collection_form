import Head from 'next/head'
import { useRouter } from 'next/router'
import { Typography } from '@mui/material'
import Layout from '../../components/layout'

const Error = () => {
    const router = useRouter()

    return (<>
        <Typography variant='h5'><p>An error has occurred! :(</p></Typography>
        <Typography><p>If you are a developer, please see logs below.</p></Typography>
        <Typography><p>Otherwise, please tell us what happened and copy the below logs to support@wecarrybags.co.uk</p></Typography>
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
            Message: {router.query.msg}
            <br />
            Stack trace: {router.query.stack}
        </pre>
    </>)
}

export default function IndexForm() {
    return (
        <Layout>
            <Head>
                <title>Store Details</title>
            </Head>
            <Error />
        </Layout>
    )
}
