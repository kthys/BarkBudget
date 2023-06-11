import React, { useEffect } from 'react'
import { useGraph } from "../../Providers/GraphProvider"
import { useExpenses } from '../../Providers/GraphValuesProvider/ExpensesProvider'
import { useValues } from '../../Providers/GraphValuesProvider/ValuesProvider'
import { useScenario } from "../../Providers/ScenarioProvider"


const DataPinnedScenario = (): JSX.Element => {
    const { scenario } = useScenario()
    const { pinScenario, unpinScenario } = useGraph()

    const graphExpenses = useExpenses().graphValues
    const graphValues = useValues().graphValues


    useEffect(() => {
        if (!graphValues || !graphExpenses || !pinScenario || !unpinScenario) return
        pinScenario.current(scenario, [...graphValues, ...graphExpenses])

        const unpin = unpinScenario.current
        return () => {
            unpin(scenario)
        }

    }, [scenario, graphExpenses, graphValues, pinScenario, unpinScenario])

    return <></>
}

export default DataPinnedScenario


