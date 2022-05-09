import { Button, Divider, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { TextInput } from "../../components/Textinput";

const PasswordForm = () => {
    const router = useRouter()
    const [password, setPassword] = useState('')

    const verifyPassword = (event) => {
        event.preventDefault()

        if (password === 'OpenCarrybagsForm') {
            localStorage.setItem('admin', 'true')
            router.push('/list')
        } else {
            alert('Incorrect password. Please try again.')
        }
    }

    return (
        <form onSubmit={verifyPassword}>
            <Typography variant='h5'>Enter password to view</Typography>
            <br />
            <Divider />
            <br />
            <div>
                <TextInput
                    label="Password"
                    value={password}
                    onChange={setPassword}
                    type="password"
                    required
                />
            </div>
            <br/>
            <Button
            type="submit"
            variant="contained"
            sx={{width: '100%'}}>
                SUBMIT
                </Button>
        </form>
    )
}

export default function PasswordScreen() {
    const router = useRouter()
    useEffect(() => {
        const isAdmin = window.localStorage.getItem('admin')

        if (isAdmin) {
            router.push('/list')
        }
    })
    return (
        <Layout>
            <Head>
                <title>Enter password to view</title>
            </Head>
            <PasswordForm />
        </Layout>
    )
}