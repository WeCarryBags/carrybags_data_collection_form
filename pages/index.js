import Head from 'next/head'
import Layout from '../components/layout'
import Divider from "@mui/material/Divider";
import { Typography, Button, Box, Link, Backdrop, TextField } from "@mui/material";
import { TextInput } from '../components/Textinput';
import { useState } from 'react';
import { useRouter } from 'next/router'
import { getQueryString } from "../ui_logic/get-query-string";
import { FormCircleBlue } from '../components/form-step-circles/FormCircleBlue';
import { FormCircleGrey } from '../components/form-step-circles/FormCircleGrey';
import { FormLineGrey } from '../components/form-step-circles/FormLineGrey';
import { getDeviceLocation } from '../ui_logic/detect-location';
import axios from 'axios';

const failedEmailConfirmationMessage = <>
  <Typography variant='h5'>Failed to confirm email. :(</Typography>
  <br />
  <Typography>Unfortunately, the email address entered in the confirm field is different from the email address in the other field.</Typography>
  <br />
  <Typography>Please close this message by clicking anywhere on the screen and make sure both fields match.</Typography>
  <br />
  <Typography>Thank you.</Typography>
</>

const failedGettingLocationMessage = <>
  <Typography variant='h5'>Failed to get device location. :(</Typography>
  <br />
  <Typography>Unfortunately, we are not able to access your device's location.</Typography>
  <br />
  <Typography>We use geolocation access to get the location of the store.</Typography>
  <br />
  <Typography>Please consult your device settings and try again after enabling it.</Typography>
  <br />
  <Typography>Thank you.</Typography>
</>

const noLocationGivenMessage = <>
  <Typography variant='h5'>Must enter location.</Typography>
  <br />
  <Typography>We need an address and postal code to get the location of the store.</Typography>
  <br />
  <Typography>Please fill in the relevant fields and try again.</Typography>
  <br />
  <Typography>Thank you.</Typography>
</>

const geocodingErrorMessage = <>
  <Typography variant='h5'>Failed to locate address. :(</Typography>
  <br />
  <Typography>We failed to find an address at the specified location.</Typography>
  <br />
  <Typography>This may be a network error or a problem on our side.</Typography>
  <br />
  <Typography>Please try again or contact us at support@wecarrybags.co.uk if the error persists.</Typography>
  <br />
  <Typography>Thank you.</Typography>
</>

const CreateForm = () => {
  const router = useRouter()

  // form data fields
  const [storeName, setStoreName] = useState('')
  const [authorisedPersonName, setAuthorisedPersonName] = useState('')
  const [spokespersonEmail, setSpokespersonEmail] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [carryBagsRepresentative, setRepresentative] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(true)

  // location fields
  const [address, setAddress] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [latitude, setLatitude] = useState(false)
  const [longitude, setLongitude] = useState(false)

  // function to try detecting location
  // and setting appropriate variable state
  const onGetLocationButtonClicked = async () => {
    try {
      const deviceLocation = await getDeviceLocation()
      setLatitude(deviceLocation.latitude)
      setLongitude(deviceLocation.longitude)
      setAddress('Using device location')
      setPostalCode('Using device location')
    } catch (err) {
      setErrorOpen(true)
      setErrorMessage(failedGettingLocationMessage)
      // we just assume that the error is to do
      // with getting location, but the console log
      // displays specific error details
      // which may be different.
      console.log(err)
    }
  }

  // functions to clear longitude and latitude 
  // when user types in address or post code field
  const setAddressCallback = (newAddress) => {
    if (address === 'Using device location') {
      setAddress('')
      setPostalCode('')
      return
    }
    setAddress(newAddress)
    // trim spaces, so we only clear when new letter is typed
    const oldAddressCompare = address.replace(/\s/g, '',)
    const newAddressCompare = newAddress.replace(/\s/g, '',)
    if (oldAddressCompare !== newAddressCompare) {
      setLongitude(false)
      setLatitude(false)
    }
  }

  const setPostalCodeCallback = (newPostalCode) => {
    if (postalCode === 'Using device location') {
      setAddress('')
      setPostalCode('')
      return
    }
    setPostalCode(newPostalCode)
    // trim spaces, so we only clear when new letter is typed
    const oldPostalCodeCompare = postalCode.replace(/\s/g, '',)
    const newPostalCodeCompare = newPostalCode.replace(/\s/g, '',)
    if (oldPostalCodeCompare !== newPostalCodeCompare) {
      setLongitude(false)
      setLatitude(false)
    }
  }

  // ui fields
  const [errorOpen, setErrorOpen] = useState(false)
  const [confirmEmail, setConfirmEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)

  // function to save details to form
  const nextForm = async (event) => {
    event.preventDefault()

    if (spokespersonEmail !== confirmEmail) {
      // open error and exit function
      setErrorOpen(true)
      setErrorMessage(failedEmailConfirmationMessage)
      return
    }

    let data = {
      storeName,
      authorisedPersonName,
      spokespersonEmail: spokespersonEmail,
      contactNumber,
      termsAccepted: termsAccepted ? 'true' : 'false'
    }

    // add representative code
    // only if no query param fromHomepage
    if (!router.query.fromHomepage) {
      data.carryBagsRepresentative = carryBagsRepresentative
    }

    // if we don't have longitude or latitude from device
    if (!latitude || !longitude) {
      // if user has filled in address or post code
      if (address || postalCode) {
        let givenLocationData = [address, postalCode]
        givenLocationData = givenLocationData.filter(l => l !== '')
        const locationString = givenLocationData.join(' ')
        try {
          const response = await axios.post('http://localhost:8080/api/location/geocode-address',
            {
              address: locationString
            })
          data.latitude = response.data.latitude
          data.longitude = response.data.longitude
        } catch (err) {
          console.log(err)
          setErrorOpen(true)
          setErrorMessage(geocodingErrorMessage)
        }
      } else {
        setErrorOpen(true)
        setErrorMessage(noLocationGivenMessage)
        return
      }
    } else {
      data.latitude = latitude
      data.longitude = longitude
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

        <Divider sx={{ pt: '0.75em' }}>
          <Typography sx={{ color: "#837E7E", fontSize: '0.75em' }} >
            Store and store representative name
          </Typography>
        </Divider>
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
            label="Name of store representative"
            value={authorisedPersonName}
            onChange={setAuthorisedPersonName}
            required
          />
        </div>
        <Divider sx={{ pt: '0.75em' }}>
          <Typography sx={{ color: "#837E7E", fontSize: '0.75em' }} >
            Store representative contact information
          </Typography>
        </Divider>
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
        <Divider sx={{ pt: '0.75em' }}>
          <Typography sx={{ color: "#837E7E", fontSize: '0.75em' }} >
            Store location
          </Typography>
        </Divider>
        <div>
          <TextInput
            fullWidth
            label='Address shorthand'
            value={address}
            onChange={setAddressCallback}
          />
          <TextInput
            fullWidth
            label='Post code'
            value={postalCode}
            onChange={setPostalCodeCallback}
          />
          <Button
            fullWidth
            sx={{ mt: '0.75em' }}
            onClick={() => onGetLocationButtonClicked()}
          >
            Get Device Location
          </Button>
        </div>
        {
          // render a representative code
          !router.query.fromHomepage &&
          <>
            <Divider sx={{ pt: '0.75em' }}>
              <Typography sx={{ color: "#837E7E", fontSize: '0.75em' }} >
                CarryBags Representative Code
              </Typography>
            </Divider>
            <div>
              <TextInput
                label="CarryBags Representative Code"
                value={carryBagsRepresentative}
                onChange={setRepresentative}
                required
              />
            </div>
          </>
        }
        <br />
        <Divider sx={{ pb: '0.75em' }}>
          <Typography sx={{ color: "#837E7E", fontSize: '0.75em' }} >
            Terms and Conditions
          </Typography>
        </Divider>
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
          {errorMessage}
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
    </Layout >
  )
}

export const buttonStyle = { width: '100%', marginBottom: '10px', borderRadius: 100, height: "3.5em" }
export const buttonStyleNoMargin = { width: '100%', borderRadius: 100, height: "3.5em" }