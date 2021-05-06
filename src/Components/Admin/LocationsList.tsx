import React, { FC } from 'react'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { actions, getLocationCopyCount, LocationsListType } from '../../redux/stickerReducer'
import { getLocations } from '../../redux/stickerSelectors'
import { Key } from 'antd/lib/table/interface'

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

export const LocationsList: FC<PropsType> = (props) => {

    const locations = useSelector(getLocations)

    const dispatch = useDispatch()

    const rowSelection = {
        onChange: (selectedRowKeys: Array<Key>, selectedRows: Array<LocationsListType>) => {
            dispatch(actions.setSelectedLocation(selectedRows[0].id))
            dispatch(getLocationCopyCount(selectedRows[0].id))
        }
    }

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
                dataSource={locations}
            />
        </div>
    )
}


type PropsType = {

}