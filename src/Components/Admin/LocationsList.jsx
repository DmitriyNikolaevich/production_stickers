import React from 'react'
import { Table } from 'antd'

const columns = [
    {
        title: 'Идентификатор',
        dataIndex: 'id'
    },
    {
        title: 'ЛПУ',
        dataIndex: 'organization',
    },
    {
        title: 'Локация',
        dataIndex: 'location',
    }
]

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    },
    getCheckboxProps: (record) => ({
        name: record.name
    }),
}

export const LocationsList = ({ locations }) => {

    return (
        <div style={{ marginTop: '20px' }}>
            {console.log(locations)}
            <Table
                rowSelection={{
                    type: 'radio',
                    ...rowSelection,
                }}
                columns={columns}
                pagination={{
                    position: ['bottomRight'],
                    defaultPageSize: 10
                }}
                dataSource={locations}
            />
        </div>
    )
}