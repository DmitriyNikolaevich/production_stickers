import { Button, Cascader, Input, InputNumber, Space } from 'antd'
import React, { useState } from 'react'

export const ControllLocationForm = (props) => {

    const [LPU, setLPU] = useState('')

    const onChangeCascader = (value) => {
        setLPU(value)
    }

    const options = [
        {
            value: 'SevCRB',
            label: 'Северская ЦРБ'
        },
        {
            value: 'FAPsVOPs',
            label: 'ФАПы и ВОПы',
            children: [
                {
                    value: 'OctoberFAP',
                    label: 'Октябрьский ФАП'
                },
                {
                    value: 'UbinFAP',
                    label: 'Убинский ФАП'
                },
                {
                    value: 'AnanFAP',
                    label: 'Ананьевский ФАП'
                }
            ]
        }
    ]

    
    return (
        <div>
            <Space>
            <InputNumber min={1} max={999999} defaultValue={0} />
            <Cascader options={options} onChange={onChangeCascader} placeholder="Выберете ЛПУ" style={{width: '300px'}} />
            <Input placeholder="Введите локацию" style={{ width: '300px' }} />
            <Button type="primary">Добавить локацию</Button>
            <Button type="primary">Удалить локацию</Button>
            </Space>
        </div>
    )
}