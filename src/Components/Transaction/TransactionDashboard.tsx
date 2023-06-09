import React, { useState } from 'react'
import { Tabs, Tab, Box, Typography } from '@mui/material'
import TransactionList from './TransactionList'
import { Expense, useExpenses } from '../../Providers/GraphValuesProvider/ExpensesProvider'
import { Value, useValues } from '../../Providers/GraphValuesProvider/ValuesProvider'
import { Limit, useLimits } from '../../Providers/GraphValuesProvider/LimitsProvider'
import ValueEntry from './ValueEntry'
import ExpenseEntry from './ExpenseEntry'
import LimitEntry from './LimitEntry'

const TransactionDashboard = () => {
    const [tabIndex, setTabIndex] = useState(0)

    const handleTabChange = (event: React.SyntheticEvent<Element, Event>, newValue: number) => {
        setTabIndex(newValue)
    }

    return (
        <Box sx={{ width: '100%', mt: 3 }}>
            <Typography variant="h4">Data</Typography>
            <Tabs value={tabIndex} onChange={handleTabChange} aria-label="tabs" variant='fullWidth'>
                <Tab label="Expenses" />
                <Tab label="Values" />
                <Tab label="Limits" />
            </Tabs>
            <Box sx={{ p: 1, width: '100%' }}>
                {tabIndex === 0 && <TransactionList<Expense> useValues={useExpenses} ChildComponent={ExpenseEntry} />}
                {tabIndex === 1 && <TransactionList<Value> useValues={useValues} ChildComponent={ValueEntry} />}
                {tabIndex === 2 && <TransactionList<Limit> useValues={useLimits} ChildComponent={LimitEntry} />}
            </Box>
        </Box>
    )
}

export default TransactionDashboard