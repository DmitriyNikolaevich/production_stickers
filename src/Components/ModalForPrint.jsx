import React from 'react'
import Barcode from "react-hooks-barcode"

export const ModalForPrint = ({ config, value, count }) => {
    let arr = []
    

    for (let i = 0; i < count; i++) {
        arr.push(<Barcode value={value + i} {...config} />)        
    }
    return (
        <div>
            {arr}
        </div>
    )
}