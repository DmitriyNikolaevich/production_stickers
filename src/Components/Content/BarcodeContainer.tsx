import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { getCopyCountSelector, getCopySelector, getStartNumberSelector } from '../../redux/stickerSelectors'
import { BarcodePrint } from './BarcodePrint'

export const BarcodeContainer: FC<PropsType> = (props) => {

    const copy = useSelector(getCopySelector)
    const CopyCount = useSelector(getCopyCountSelector)
    const startNumber = useSelector(getStartNumberSelector)

    const iteration = () => {
        let arr = []
        for(let i = 1; i <= copy; i++) {
            for (let j = 1; j <= CopyCount; j++) {
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


type PropsType = {
    
}