import Head from 'next/head'
import Layout from '../components/layout'
import Divider from "@mui/material/Divider";
import { Typography, Button, Box, Link, Backdrop } from "@mui/material";
import { TextInput } from '../components/Textinput';
import { useState } from 'react';
import { useRouter } from 'next/router'
import { getQueryString } from "../ui_logic/get-query-string";
import { FormCircleBlue } from '../components/form-step-circles/FormCircleBlue';
import { FormCircleGrey } from '../components/form-step-circles/FormCircleGrey';
import { FormLineGrey } from '../components/form-step-circles/FormLineGrey';

const CreateForm = () => {
  const router = useRouter()

  // form data fields
  const [storeName, setStoreName] = useState('')
  const [authorisedPersonName, setAuthorisedPersonName] = useState('')
  const [spokespersonEmail, setSpokespersonEmail] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [carryBagsRepresentative, setRepresentative] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(true)

  // ui fields
  const [errorOpen, setErrorOpen] = useState(false)
  const [confirmEmail, setConfirmEmail] = useState('')

  // function to save details to form
  const nextForm = (event) => {
    event.preventDefault()

    if (spokespersonEmail !== confirmEmail) {
      // open error and exit function
      setErrorOpen(true)
      return
    }

    const data = {
      storeName,
      authorisedPersonName,
      spokespersonEmail: spokespersonEmail,
      contactNumber,
      carryBagsRepresentative,
      termsAccepted: termsAccepted ? 'true' : 'false'
    }

    // save form input into query string
    const queryString = getQueryString('time', data)

    // move to next part of form
    router.push(queryString)
  }

  return (
    <form onSubmit={nextForm}>
      <Box sx={{ justifyContent: "center", alignItems: "center" }}>
        <Typography variant='h5' sx={{ padding: "0.5em" }}>
          Store details
        </Typography>
        <Divider />
        <br />

        <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
          <FormCircleBlue text={"1"} />
          <FormLineGrey />
          <FormCircleGrey text={"2"} />
          <FormLineGrey />
          <FormCircleGrey text={"3"} />
        </Box>

        <div>
          <TextInput
            label="Store Name"
            value={storeName}
            onChange={setStoreName}
            required
          />
        </div>
        <div>
          <TextInput
            label="Authorised Person Name"
            value={authorisedPersonName}
            onChange={setAuthorisedPersonName}
            required
          />
        </div>
        <div>
          <TextInput
            label="Email"
            value={spokespersonEmail}
            onChange={(value) => setSpokespersonEmail(value.toLowerCase())}
            required
          />
        </div>
        <div>
          <TextInput
            label="Confirm Email"
            value={confirmEmail}
            onChange={(value) => setConfirmEmail(value.toLowerCase())}
            required
          />
        </div>
        <div>
          <TextInput
            label="Contact Number"
            value={contactNumber}
            onChange={setContactNumber}
            required
          />
        </div>
        <div>
          <TextInput
            label="CarryBags Representative Code"
            value={carryBagsRepresentative}
            onChange={setRepresentative}
            required
          />
        </div>
        <br />

        <Typography align='left' sx={{ color: "#837E7E" }} >
          By clicking Next, you agree that you have read and accepted our <Link sx={{ color: "#3E8EF1" }} href="/terms.html">
            Terms & Conditions
          </Link> and <Link sx={{ color: "#3E8EF1" }} s href="/privacy.html">
            Privacy Policy </Link>.
        </Typography>
        <br />
        <Button type='submit' variant="contained" sx={buttonStyleNoMargin}>Next</Button>
      </Box>
      <Backdrop
        sx={{ backgroundColor: 'white', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={errorOpen}
        onClick={() => setErrorOpen(false)}
      >
        <Box
          sx={{ backgroundColor: 'white', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Typography variant='h5'><p>Failed to confirm email! :(</p></Typography>
          <Typography><p>Unfortunately, the email address entered in the confirm field is different from the email address in the other field.</p></Typography>
          <Typography><p>Please close this message by clicking anywhere on the screen and make sure both fields match.</p></Typography>
          <Typography><p>Thank you.</p></Typography>
        </Box>
      </Backdrop>
    </form>
  )
}

export default function IndexForm() {
  const router = useRouter()
  return (

    <Layout>
      <Head>
        <title>Store Details</title>
      </Head>
      <CreateForm />
      <br />
      <Divider />
      <br />
      <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
        <Button
          variant="outlined"
          sx={{ ...buttonStyle, marginRight: '1em' }}
          onClick={() => router.push('/password-screen')}>
          View list
        </Button>

        <Button
          variant="outlined"
          sx={{ ...buttonStyle, marginLeft: '1em' }}
          onClick={() => router.push('/test-location')}>
          Test Location
        </Button>
      </Box>
    </Layout >
  )
}

export const buttonStyle = { width: '100%', marginBottom: '10px', borderRadius: 100, height: "3.5em" }
export const buttonStyleNoMargin = { width: '100%', borderRadius: 100, height: "3.5em" }