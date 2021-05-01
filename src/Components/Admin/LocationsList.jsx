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

const data = [
    {
        key: '1',
        id: 1,
        organization: 'Северская ЦРБ',
        location: 'Отдел ИТ'
    },
    {
        key: '2',
        id: 2,
        organization: 'Северская ЦРБ',
        location: 'Лаборатория'
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

export const LocationsList = (props) => {

    return (
        <div style={{ marginTop: '20px' }}>
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
                dataSource={data}
            />
        </div>
    )
}