/****************** 
 * **** NOTICE ****
 * THIS PAGE IS DEPRECATED
 * REPLACEMENT PAGE IS
 * '/time/index.js'
 * ** END NOTICE **
 *******************/

import Head from 'next/head'
import 'antd/dist/antd.css';
import { TimePicker } from 'antd';
import Layout from '../../../components/layout'
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography
} from "@mui/material";
import { useState } from 'react';
import { useRouter } from 'next/router'
import { getQueryString } from '../../../ui_logic/get-query-string';
import moment from 'moment';
import { buttonStyle } from '../..';
import { FormCircleBlue } from '../../../components/form-step-circles/FormCircleBlue';
import { FormLineGrey } from '../../../components/form-step-circles/FormLineGrey';
import { FormCircleGrey } from '../../../components/form-step-circles/FormCircleGrey';
import { FormLineBlue } from '../../../components/form-step-circles/FormLineBlue';

// Create default time to use
const defaultTime = [
    moment(Date.now()).hours(9).minutes(0).seconds(0), // 9 am
    moment(Date.now()).hours(17).minutes(0).seconds(0) // 5 pm
]

const CreateForm = () => {
    const router = useRouter()

    // Opening times
    const [monday, setMonday] = useState(defaultTime)
    const [tuesday, setTuesday] = useState(defaultTime)
    const [wednesday, setWednesday] = useState(defaultTime)
    const [thursday, setThursday] = useState(defaultTime)
    const [friday, setFriday] = useState(defaultTime)
    const [saturday, setSaturday] = useState(defaultTime)
    const [sunday, setSunday] = useState(defaultTime)

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
            monday: [...monday, mondayOpen],
            tuesday: [...tuesday, tuesdayOpen],
            wednesday: [...wednesday, wednesdayOpen],
            thursday: [...thursday, thursdayOpen],
            friday: [...friday, fridayOpen],
            saturday: [...saturday, saturdayOpen],
            sunday: [...sunday, sundayOpen],
        }

        // object to put day start/end in
        // and loop to do this
        let days = {}
        for (const [key, value] of Object.entries(inputDays)) {
            days[`${key}Start`] = `${moment(value[0]).format('HH:mm')}`
            days[`${key}End`] = `${moment(value[1]).format('HH:mm')}`
            days[`${key}Open`] = value[2].toString()
        }

        const data = {
            ...router.query,
            ...days
        }

        const queryString = getQueryString('/create/upload', data)

        router.push(queryString)
    }

    const timeProps = {
        format: 'HH:mm A',
        size: 'large',
        style: { width: '100%' },
        use12Hours: true
    }

    // Put previous day-data into array so we can use map to generate it all
    const dayArray = [
        {
            day: 'Monday',
            placeholderLabels: ['Monday start', 'Monday end'],
            value: monday,
            setValue: setMonday,
            isOpen: mondayOpen,
            setOpen: setMondayOpen
        },
        {
            day: 'Tuesday',
            placeholderLabels: ['Tuesday start', 'Tuesday end'],
            value: tuesday,
            setValue: setTuesday,
            isOpen: tuesdayOpen,
            setOpen: setTuesdayOpen
        },
        {
            day: 'Wednesday',
            placeholderLabels: ['Wednesday start', 'Wednesday end'],
            value: wednesday,
            setValue: setWednesday,
            isOpen: wednesdayOpen,
            setOpen: setWednesdayOpen
        },
        {
            day: 'Thursday',
            placeholderLabels: ['Thursday start', 'Thursday end'],
            value: thursday,
            setValue: setThursday,
            isOpen: thursdayOpen,
            setOpen: setThursdayOpen
        },
        {
            day: 'Friday',
            placeholderLabels: ['Friday start', 'Friday end'],
            value: friday,
            setValue: setFriday,
            isOpen: fridayOpen,
            setOpen: setFridayOpen
        },
        {
            day: 'Saturday',
            placeholderLabels: ['Saturday start', 'Saturday end'],
            value: saturday,
            setValue: setSaturday,
            isOpen: saturdayOpen,
            setOpen: setSaturdayOpen
        },
        {
            day: 'Sunday',
            placeholderLabels: ['Sunday start', 'Sunday end'],
            value: sunday,
            setValue: setSunday,
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

            <Table>
                <TableBody>
                    {dayArray.map(
                        (day) =>
                            <TableRow key={day.day}>
                                <TableCell align='center' sx={{ width: '20%' }}>
                                    <Typography>
                                        {day.day}
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ width: '60%' }}>
                                    <TimePicker.RangePicker
                                        {...timeProps}
                                        placeholder={day.placeholderLabels}
                                        value={day.value}
                                        onChange={day.setValue}
                                        disabled={!day.isOpen}
                                    />
                                </TableCell>
                                <TableCell sx={{ width: '20%' }}>
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
