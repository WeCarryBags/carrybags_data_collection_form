import Head from 'next/head'
import Layout from '../../components/layout'
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    Table,
    TextField,
    TableBody,
    TableCell,
    TableRow,
    Typography
} from "@mui/material";
import { useState } from 'react';
import { useRouter } from 'next/router'
import { getQueryString } from '../../ui_logic/get-query-string';
import moment from 'moment';

import { FormCircleBlue } from '../../components/form-step-circles/FormCircleBlue';
import { FormLineGrey } from '../../components/form-step-circles/FormLineGrey';
import { FormCircleGrey } from '../../components/form-step-circles/FormCircleGrey';
import { FormLineBlue } from '../../components/form-step-circles/FormLineBlue';
import enLocale from 'date-fns/locale/en-GB';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileTimePicker from '@mui/lab/MobileTimePicker';
import { setHours } from 'date-fns'
import { setMinutes } from 'date-fns'
import { buttonStyle } from '..';

// get a date object at the provided hour, 
// with the minutes being 0
const getTimeAtHour = (hours) =>
    setMinutes(
        setHours(
            Date.now(),
            hours
        ),
        0
    )

// Create default times to use
const defaultStart = getTimeAtHour(9) // 9 am
const defaultEnd = getTimeAtHour(17) // 5 pm

// Format time for database
const getHoursAndMinutesString = (date) => {
    return date.toString().substring(16, 21)
}


const CreateForm = () => {
    const router = useRouter()

    // store opening times
    const [mondayStart, setMondayStart] = useState(defaultStart)
    const [tuesdayStart, setTuesdayStart] = useState(defaultStart)
    const [wednesdayStart, setWednesdayStart] = useState(defaultStart)
    const [thursdayStart, setThursdayStart] = useState(defaultStart)
    const [fridayStart, setFridayStart] = useState(defaultStart)
    const [saturdayStart, setSaturdayStart] = useState(defaultStart)
    const [sundayStart, setSundayStart] = useState(defaultStart)

    // store closing times
    const [mondayEnd, setMondayEnd] = useState(defaultEnd)
    const [tuesdayEnd, setTuesdayEnd] = useState(defaultEnd)
    const [wednesdayEnd, setWednesdayEnd] = useState(defaultEnd)
    const [thursdayEnd, setThursdayEnd] = useState(defaultEnd)
    const [fridayEnd, setFridayEnd] = useState(defaultEnd)
    const [saturdayEnd, setSaturdayEnd] = useState(defaultEnd)
    const [sundayEnd, setSundayEnd] = useState(defaultEnd)

    // Is shop open on this day?
    const [mondayOpen, setMondayOpen] = useState(true)
    const [tuesdayOpen, setTuesdayOpen] = useState(true)
    const [wednesdayOpen, setWednesdayOpen] = useState(true)
    const [thursdayOpen, setThursdayOpen] = useState(true)
    const [fridayOpen, setFridayOpen] = useState(true)
    const [saturdayOpen, setSaturdayOpen] = useState(true)
    const [sundayOpen, setSundayOpen] = useState(true)

    const nextStep = (event) => {
        event.preventDefault()

        // parse times to string first
        const inputDays = {
            monday: [
                getHoursAndMinutesString(mondayStart),
                getHoursAndMinutesString(mondayEnd),
                mondayOpen
            ],
            tuesday: [
                getHoursAndMinutesString(tuesdayStart),
                getHoursAndMinutesString(tuesdayEnd),
                tuesdayOpen
            ],
            wednesday: [
                getHoursAndMinutesString(wednesdayStart),
                getHoursAndMinutesString(wednesdayEnd),
                wednesdayOpen
            ],
            thursday: [
                getHoursAndMinutesString(thursdayStart),
                getHoursAndMinutesString(thursdayEnd),
                thursdayOpen
            ],
            friday: [
                getHoursAndMinutesString(fridayStart),
                getHoursAndMinutesString(fridayEnd),
                fridayOpen
            ],
            saturday: [
                getHoursAndMinutesString(saturdayStart),
                getHoursAndMinutesString(saturdayEnd),
                saturdayOpen
            ],
            sunday: [
                getHoursAndMinutesString(sundayStart),
                getHoursAndMinutesString(sundayEnd),
                sundayOpen
            ],
        }

        // object to put day start/end in
        // and loop to do this
        let days = {}
        for (const [key, value] of Object.entries(inputDays)) {
            days[`${key}Start`] = value[0]
            days[`${key}End`] = value[1]
            days[`${key}Open`] = value[2].toString()
        }

        const data = {
            ...router.query,
            ...days
        }

        const queryString = getQueryString('/create/upload', data)

        router.push(queryString)
    }

    // Put previous day-data into array so we can use map to generate it all
    const dayArray = [
        {
            day: 'Monday',
            startValue: mondayStart,
            endValue: mondayEnd,
            setStart: setMondayStart,
            setEnd: setMondayEnd,
            isOpen: mondayOpen,
            setOpen: setMondayOpen
        },
        {
            day: 'Tuesday',
            startValue: tuesdayStart,
            endValue: tuesdayEnd,
            setStart: setTuesdayStart,
            setEnd: setTuesdayEnd,
            isOpen: tuesdayOpen,
            setOpen: setTuesdayOpen
        },
        {
            day: 'Wednesday',
            startValue: wednesdayStart,
            endValue: wednesdayEnd,
            setStart: setWednesdayStart,
            setEnd: setWednesdayEnd,
            isOpen: wednesdayOpen,
            setOpen: setWednesdayOpen
        },
        {
            day: 'Thursday',
            startValue: thursdayStart,
            endValue: thursdayEnd,
            setStart: setThursdayStart,
            setEnd: setThursdayEnd,
            isOpen: thursdayOpen,
            setOpen: setThursdayOpen
        },
        {
            day: 'Friday',
            startValue: fridayStart,
            endValue: fridayEnd,
            setStart: setFridayStart,
            setEnd: setFridayEnd,
            isOpen: fridayOpen,
            setOpen: setFridayOpen
        },
        {
            day: 'Saturday',
            startValue: saturdayStart,
            endValue: saturdayEnd,
            setStart: setSaturdayStart,
            setEnd: setSaturdayEnd,
            isOpen: saturdayOpen,
            setOpen: setSaturdayOpen
        },
        {
            day: 'Sunday',
            startValue: sundayStart,
            endValue: sundayEnd,
            setStart: setSundayStart,
            setEnd: setSundayEnd,
            isOpen: sundayOpen,
            setOpen: setSundayOpen
        }
    ]

    return (
        <form
            onSubmit={nextStep}
            style={{ minWidth: 500 }}
        >
            <Typography variant='h5' fontWeight={600}>
                Opening hours
            </Typography>
            <br />
            <Divider />
            <br />

            <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                <FormCircleBlue text={"1"} />
                <FormLineBlue />
                <FormCircleBlue text={"2"} />
                <FormLineGrey />
                <FormCircleGrey text={"3"} />
            </Box>

            <LocalizationProvider dateAdapter={AdapterDateFns} locale={enLocale}>
                <Table>
                    <TableBody>
                        {dayArray.map(
                            (day) =>
                                <TableRow key={day.day}>
                                    <TableCell align='center'>
                                        <Typography>
                                            {day.day}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <MobileTimePicker
                                            disabled={!day.isOpen}
                                            value={day.startValue}
                                            onChange={(newValue) => day.setStart(newValue)}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <MobileTimePicker
                                            disabled={!day.isOpen}
                                            value={day.endValue}
                                            onChange={(newValue) => day.setEnd(newValue)}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <FormControlLabel
                                            label="Closed"
                                            control={
                                                <Checkbox
                                                    value={day.isOpen}
                                                    onChange={() => day.setOpen(!day.isOpen)}
                                                />}
                                        />
                                    </TableCell>
                                </TableRow>
                        )}
                    </TableBody>
                </Table>
            </LocalizationProvider>
            <br />
            <Button type='submit' variant="contained" sx={buttonStyle}>Next</Button>
        </form >
    )
}

export default function StoreDetails() {
    return (
        <Layout>
            <Head>
                <title>Store Details</title>
            </Head>
            <CreateForm />
        </Layout>
    )
}
