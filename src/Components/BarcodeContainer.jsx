import React from 'react'
import { BarcodePrint } from './BarcodePrint'

export const BarcodeContainer = ({ copy, startNumber, config, iterations }) => {

    const iteration = () => {
        let arr = []
        for(let i = 0; i < iterations; i++) {
            for (let j = 0; j < copy; j++) {
                arr.push(<BarcodePrint value={startNumber + i} config={config} />)
            }
        }
        return arr
    }
    
    return (
        <div>
            {iteration()}
        </div>
    )
}