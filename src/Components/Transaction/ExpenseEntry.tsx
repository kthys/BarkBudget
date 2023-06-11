import DeleteIcon from '@mui/icons-material/Delete'
import { Box, IconButton } from "@mui/material"
import React from "react"
import { modeNames } from "../../Modes/const"
import { Expense } from "../../Providers/GraphValuesProvider/ExpensesProvider"
import { GenericEntry } from "../../Providers/GraphValuesProvider/GenericValues"
import { compareDate } from "../../helpers"
import AmountField from "../Fields/AmountField"
import CustomDatePicker from "../Fields/CustomDatePicker"
import ModeSelector from "./ModeSelector"

const ExpenseEntry: GenericEntry<Expense> = ({ value, handleDelete, handleSave }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
            <CustomDatePicker
                date={value.startDate}
                setDate={(newDate) => {
                    if (!compareDate(newDate, value.startDate)) {
                        handleSave({ ...value, startDate: newDate })
                    }
                }} />

            {[modeNames.DAILY, modeNames.MONTHLY].includes(value.mode) &&
                <CustomDatePicker
                    date={value.endDate}
                    setDate={(newDate) => {
                        if (!compareDate(newDate, value.endDate)) {
                            handleSave({ ...value, endDate: newDate })
                        }
                    }} />
            }


            <AmountField
                amount={value.amount}
                setAmount={(newAmount) => {
                    if (newAmount !== value.amount) {
                        handleSave({ ...value, amount: newAmount })
                    }
                }} />

            <ModeSelector
                mode={value.mode}
                setMode={(newMode) => {
                    if (newMode !== value.mode) {
                        handleSave({ ...value, mode: newMode })
                    }
                }} />

            <IconButton onClick={handleDelete} style={{ "marginLeft": "auto" }}>
                <DeleteIcon />
            </IconButton>
        </Box>
    )
}

export default ExpenseEntry

