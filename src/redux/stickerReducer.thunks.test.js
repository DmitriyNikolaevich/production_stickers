import { instance } from "../API"
import { getLPUThunk } from './stickerReducer'
import store from "./redux"

jest.mock("../API")

describe('stickerReducer thunks testing:', () => {

  test('should fetch users', async () => {
    const getLPUThunkMock = getLPUThunk()
    const dispatch = jest.fn()
    const values = [{value: 1, label: 'Miami'}]
    const resp = {data: values}
    instance.get.mockResolvedValue(resp)
  
    await getLPUThunkMock(dispatch)
  
    expect(dispatch).toHaveBeenCalledTimes(1)
  })

})

