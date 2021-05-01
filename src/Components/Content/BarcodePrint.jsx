import React from 'react'
import Barcode from "react-hooks-barcode"
import { useSelector } from 'react-redux'
import { getConfigSelector } from '../../redux/stickerSelectors'

export const BarcodePrint = ({ number }) => {

    const config = useSelector(getConfigSelector)
    
    return (
        <div style={{ pageBreakBefore: "always", width: "170px", height: "90px", margin: 0, textAlign: "center" }}>
            <Barcode value={number} {...config} />
        </div>
    )
}