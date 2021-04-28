import React from 'react'
import { BarcodePrint } from './BarcodePrint'

export const BarcodeContainer = ({ res, startNumber, config, iterations }) => {

    const iteration = () => {
        for(let i = 0; i < iterations; i++) {
            res.map((val, i) => <BarcodePrint value={startNumber + i} config={config} />)
        }
    }

    debugger
    return (
        <div>
            {iteration()}
        </div>
    )
}