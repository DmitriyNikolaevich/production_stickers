import React, { FC } from 'react'
//@ts-ignore
import Barcode from "react-hooks-barcode"
import { useSelector } from 'react-redux'
import { getConfigSelector } from '../../redux/stickerSelectors'

export const BarcodePrint: FC<PropsTypes> = ({ number }) => {

    const config = useSelector(getConfigSelector)
    
    return (
        <div style={{ pageBreakAfter: "always", width: "170px", height: "90px", margin: 0, textAlign: "center" }}>
            <Barcode value={number} {...config} />
        </div>
    )
}


type PropsTypes = {
    number: number
}