import JsBarcode from 'jsbarcode'
import React from 'react'

export const ModalForPrint = ({ result, startNumber, config }) => {
    debugger
    return (
        <div>
            {result.map(index => <JsBarcode value={startNumber} {...config} />)}
        </div>
    )
}