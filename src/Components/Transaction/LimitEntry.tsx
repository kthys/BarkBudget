import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Button, Card, CardActionArea, CardContent, Dialog, DialogActions, DialogContent, IconButton, Typography } from "@mui/material"
import React, { createRef, useEffect, useState } from "react"
import { useDeviceDetails } from '../../Providers/DeviceDetailsProvider'
import { GenericEntry } from "../../Providers/GraphValuesProvider/GenericValues"
import { Limit } from "../../Providers/GraphValuesProvider/LimitsProvider"
import { compareDate, getFormattedDate } from "../../helpers"
import AmountField from "../Fields/AmountField"
import CustomDatePicker from "../Fields/CustomDatePicker"
import DeleteButton from './DeleteButton'
import DummyEntry from './DummyEntry'

const LimitEntry: GenericEntry<Limit> = ({ value, handleDelete, handleSave }) => {
    const { isBodyFullSize } = useDeviceDetails()

    const [open, setOpen] = useState(!!value.new)
    const [highlighted, setHighlighted] = useState(false)

    const [valueCopy, setValueCopy] = useState<Limit | null>(null)

    const elementRef = createRef<HTMLDivElement>()

    useEffect(() => {
        if (!!value.new || !!value.edited) {
            window.scrollTo({ behavior: "smooth", top: elementRef.current?.offsetTop })

            setHighlighted(true)

            if (isBodyFullSize) {
                value.new = false
                value.edited = false

                setTimeout(() => {
                    setHighlighted(false)
                }, 1000)
            }
        }
    }, [value.new, value.edited, value, elementRef, isBodyFullSize])

    const handleClickOpen = () => {
        setValueCopy(new Limit(value))
        setOpen(true)
    }

    const handleClose = () => {
        if (!isBodyFullSize) {
            value.new = false
            value.edited = false

            setTimeout(() => {
                setHighlighted(false)
            }, 1000)
        }

        setOpen(false)
    }

    const handleCancel = () => {
        if (value.new) {
            handleClose()
            handleDelete()
        } else {
            handleClose()
            if (valueCopy) handleSave(valueCopy)
        }
    }

    const dummy = DummyEntry({ id: value.id })
    if (dummy) return dummy

    return (
        <>
            {!isBodyFullSize ?
                <>
                    <Card elevation={3} ref={elementRef} sx={{ mt: 3, border: 1, borderColor: highlighted ? 'secondary.main' : 'transparent', transition: 'border-color 0.3s linear' }}>
                        <CardActionArea onClick={handleClickOpen}>
                            <CardContent sx={{ p: 2 }}>
                                <Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                                        <Typography>
                                            {getFormattedDate(value.startDate)} - {getFormattedDate(value.endDate)}
                                        </Typography>
                                        <Typography>
                                            {value.amount}
                                        </Typography>
                                    </Box>
                                </Box>

                            </CardContent>
                        </CardActionArea>
                    </Card>

                    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth disableScrollLock>
                        <DialogContent>
                            <Box sx={{ pt: 3, flexWrap: 'nowrap', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }} gap={3}>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap' }} gap={3}>
                                    <CustomDatePicker
                                        label={'Start Date'}
                                        date={value.startDate}
                                        setDate={(newDate) => {
                                            if (!compareDate(newDate, value.startDate)) {
                                                handleSave({ ...value, startDate: newDate })
                                            }
                                        }} />

                                    <CustomDatePicker
                                        label='End Date'
                                        date={value.endDate}
                                        setDate={(newDate) => {
                                            if (!compareDate(newDate, value.endDate)) {
                                                handleSave({ ...value, endDate: newDate })
                                            }
                                        }} />
                                </Box>

                                <AmountField
                                    label='Amount'
                                    amount={value.amount}
                                    setAmount={(newAmount) => {
                                        if (newAmount !== value.amount) {
                                            handleSave({ ...value, amount: newAmount })
                                        }
                                    }} />
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <DeleteButton sx={{ m: 1, mr: 'auto' }} action={() => { handleClose(); handleDelete() }} />
                            <Button onClick={handleCancel} variant="outlined" autoFocus>Cancel</Button>
                            <Button onClick={handleClose} variant="contained" color="primary">Confirm</Button>
                        </DialogActions>
                    </Dialog>
                </>

                :
                <Card elevation={3} ref={elementRef} sx={{ mt: 3, border: 1, borderColor: highlighted ? 'secondary.main' : 'transparent', transition: 'border-color 0.3s linear' }}>
                    <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>

                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                            <CustomDatePicker
                                date={value.startDate}
                                setDate={(newDate) => {
                                    if (!compareDate(newDate, value.startDate)) {
                                        handleSave({ ...value, startDate: newDate })
                                    }
                                }} />

                            <CustomDatePicker
                                date={value.endDate}
                                setDate={(newDate) => {
                                    if (!compareDate(newDate, value.endDate)) {
                                        handleSave({ ...value, endDate: newDate })
                                    }
                                }} />

                            <AmountField
                                amount={value.amount}
                                setAmount={(newAmount) => {
                                    if (newAmount !== value.amount) {
                                        handleSave({ ...value, amount: newAmount })
                                    }
                                }} />

                            <IconButton onClick={handleDelete} style={{ "marginLeft": "auto" }}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </CardContent>
                </Card>
            }
        </>
    )
}

export default LimitEntry

