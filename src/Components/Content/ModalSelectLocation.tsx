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

    const cascaderStyle: React.CSSProperties = {            //стиль для Cascader
        width: '300px'
    }

    const modalInfo = () => {           //модалка напоминание о закладке
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

    const onOK = () => {                //кнопка подтверждения
        dispatch(actions.getLocationSagasAC(userID))
        dispatch(actions.getLocationCopyCountSagasAC(userID))
        history.push(`/${userID}`)
        setIsModalVisible(false)
        modalInfo()
    }

    const onChangeCascader = (value: CascaderValueType) => {            //изменение каскадера с ЛПУ
        dispatch(actions.setNewLocationLPU(optionsLPU[Number(value[0]) - 1].value))
    }

    const onChangeCascaderLocations = (value: CascaderValueType) => {           //изменение каскадера с локациями
        dispatch(actions.setUserID(Number(value[0])))
        setDisabledButtonMode(false)
    }

    const onCancel = () => {            //закрытие модального окна
        if (selectedLPU === 0) {
            alert('Выберете ЛПУ')
        } else if (filteredLocations === undefined) {
            alert('Выберете локацию')
        } else (
            alert('Подтвердите выбор локации')
        )
    }

    useEffect(() => {           //подгрузка первого каскадера
        dispatch(actions.getLPUSagsaAC())
    },[optionsLPU, dispatch])

    useEffect(() => {           //подгрузка второго каскадера
        if (selectedLPU !== 0) {
            dispatch(actions.getFilteredLocationsSagsaAC(selectedLPU)) 
        }
    }, [selectedLPU, dispatch])

    return (
        <>
            <Modal
          visible={isModalVisible}
          title="Для продолжения выберите локацию"
          onCancel={onCancel}
          width={655}
          footer={[
            <Button disabled={disabledButtonMode} key="submit" type="primary" onClick={onOK}>
              Подтвердить
            </Button>
          ]}
        >
            <Space>
                    <Cascader options={optionsLPU} onChange={onChangeCascader} placeholder="Выберете ЛПУ" style={cascaderStyle} allowClear={false} />
                    <Cascader options={filteredLocations} onChange={onChangeCascaderLocations} placeholder="Выберете ЛПУ" style={cascaderStyle} allowClear={false} />
            </Space>
        </Modal>
        </>
    )
}


type PropsType = {

}