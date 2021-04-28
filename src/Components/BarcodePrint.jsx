import React from 'react'
import Barcode from "react-hooks-barcode"

export const BarcodePrint = ({ value, config }) => {
    debugger
    return (
        <div style={{ pageBreakBefore: "always", width: "170px", height: "90px", margin: 0, textAlign: "center" }}>
            <Barcode value={value} {...config} />
        </div>
    )
}