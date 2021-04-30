import React from 'react'
import { useSelector } from 'react-redux'
import { getCopyCountSelector, getCopySelector, getStartNumberSelector } from '../redux/stickerSelectors'
import { BarcodePrint } from './BarcodePrint'

export const BarcodeContainer = (props) => {

    const copy = useSelector(getCopySelector)
    const iterations = useSelector(getCopyCountSelector)
    const startNumber = useSelector(getStartNumberSelector)

    const iteration = () => {
        let arr = []
        for(let i = 0; i < iterations; i++) {
            for (let j = 0; j < copy; j++) {
                arr.push(startNumber + i)
            }
        }
        return arr
    }

    const result = iteration()
    
    return (
        <div>
            {result.map((item, index) => <BarcodePrint key={index} number={item} />)}
        </div>
    )
}