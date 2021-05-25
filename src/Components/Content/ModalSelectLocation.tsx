import { Button, Cascader, Space, Modal } from 'antd'
import { CascaderValueType } from 'antd/lib/cascader'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { actions } from '../../redux/stickerReducer'
import { getLPUList, getNewLocation, getFilteredLocationsSelector, getUserIDSelector } from '../../redux/stickerSelectors'

export const ModalSelectLocation: FC<PropsType> = (props) => {

    const dispatch = useDispatch()
    const history = useHistory()

    const optionsLPU = useSelector(getLPUList)
    const selectedLPU = useSelector(getNewLocation).lpu
    const filteredLocations = useSelector(getFilteredLocationsSelector)
    const userID = useSelector(getUserIDSelector)

    const [isModalVisible, setIsModalVisible] = useState(true)
    const [disabledButtonMode, setDisabledButtonMode] = useState(true)

    const modalInfo = () => {
        Modal.info({
            title: 'Айтишник, не забудь добавить закладку для пользователей после выбора локации!',
            content: (
              <div>
                <p>CTRL + D</p>
              </div>
            ),
            onOk() {},
          })
    }

    const onOK = () => {
        dispatch(actions.showLocationSagasAC(userID))
        dispatch(actions.getLocationCopyCountSagasAC(userID))
        history.push(`/${userID}`)
        setIsModalVisible(false)
        modalInfo()
    }

    const onChangeCascader = (value: CascaderValueType) => {
        dispatch(actions.setNewLocationLPU(optionsLPU[Number(value[0]) - 1].value))
    }

    const onChangeCascaderLocations = (value: CascaderValueType) => {
        dispatch(actions.setUserID(Number(value[0])))
        setDisabledButtonMode(false)
    }

    const onCancel = () => {
        if (selectedLPU === 0) {
            alert('Выберете ЛПУ')
        } else if (filteredLocations === undefined) {
            alert('Выберете локацию')
        } else (
            alert('Подтвердите выбор локации')
        )
    }

    useEffect(() => {
        dispatch(actions.getLPUSagsaAC())
    },[optionsLPU, dispatch])

    useEffect(() => {
        if (selectedLPU !== 0) {
            dispatch(actions.getFilteredLocationsSagsaAC(selectedLPU)) 
        }
    }, [selectedLPU, dispatch])

    return (
        <>
            <Modal
          visible={isModalVisible}
          title="Для продолжения выберите локацию"
          onOk={onOK}
          onCancel={onCancel}
          width={655}
          footer={[
            <Button disabled={disabledButtonMode} key="submit" type="primary" onClick={onOK}>
              Подтвердить
            </Button>
          ]}
        >
            <Space>
                <Cascader options={optionsLPU} onChange={onChangeCascader} placeholder="Выберете ЛПУ" style={{width: '300px'}} />
                <Cascader options={filteredLocations} onChange={onChangeCascaderLocations} placeholder="Выберете ЛПУ" style={{width: '300px'}} />
            </Space>
        </Modal>
        </>
    )
}


type PropsType = {

}