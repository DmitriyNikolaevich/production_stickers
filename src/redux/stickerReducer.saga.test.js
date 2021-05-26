import { runSaga } from "@redux-saga/core"
import * as stickerReducer from "./stickerReducer"
import { numberAPI } from '../API/numberAPI'

describe('Testing stickerReducer SAGAs:', () => {

    let dispatched, answer, action

    let fakeStore = {
        dispatch: (action) => dispatched.push(action)
    }

    beforeEach(() => {
        dispatched = []
        action = {}
        answer = {}
    })
    describe('printStickersSAGA', () => {

        test('success', async () => {

            answer = {
                getNumber: {
                    status: 200,
                    values: 2
                }
            }

            action = {
                payload: {
                    calback: jest.fn(),
                    data: {
                        id: 1,
                        copy: 1
                    }
                }
            }

            numberAPI.getNumber = jest.fn(() => Promise.resolve(answer.getNumber))

            await runSaga(fakeStore, stickerReducer.printStickersSAGA, action).toPromise()

            expect(dispatched.length).toBe(1)
            expect(dispatched).toContainEqual(stickerReducer.actions.setStartNumber(answer.getNumber.values - action.payload.data.copy))
            expect(numberAPI.getNumber.mock.calls.length).toBe(1)
            numberAPI.getNumber.mock.results[0].value.then(response => expect(response).toBe(answer.getNumber))
        })

        test('reject', async () => {
            answer = {
                getNumber: {
                    status: 200,
                    values: 2
                }
            }

            action = {
                payload: {
                    calback: jest.fn(),
                    data: {
                        id: 1,
                        copy: 1
                    }
                }
            }

            numberAPI.getNumber = jest.fn(() => Promise.reject(answer.getNumber))

            await runSaga(fakeStore, stickerReducer.printStickersSAGA, action).toPromise()

            expect(dispatched.length).toBe(0)
            expect(dispatched).not.toContainEqual(stickerReducer.actions.setStartNumber(answer.getNumber.values - action.payload.data.copy))
        })
    })

    describe('printRepeatNumberSAGA', () => {

        test('success', async () => {

            action = {
                payload: {
                    printCalback: jest.fn(),
                    value: 3,
                    id: 5
                }
            }

            await runSaga(fakeStore, stickerReducer.printRepeatNumberSAGA, action).toPromise()

            expect(dispatched.length).toBe(4)
            expect(dispatched).toContainEqual(stickerReducer.actions.setStartNumber(action.payload.value))
            expect(dispatched).toContainEqual(stickerReducer.actions.setCopyCountAction(1))
            expect(dispatched).toContainEqual(stickerReducer.actions.setRepeatStickerValue(0))
            expect(dispatched).toContainEqual(stickerReducer.actions.getLocationCopyCountSagasAC(action.payload.id))
        })
    })

    describe('getLocationCopyCountSAGA', () => {

        test('success', async () => {

            answer = {
                getCopyCountForLocation: {
                    status: 200,
                    values: 3
                }
            }

            action = {
                payload: {

                }
            }

            numberAPI.getCopyCountForLocation = jest.fn(() => Promise.resolve(answer.getCopyCountForLocation))

            await runSaga(fakeStore, stickerReducer.getLocationCopyCountSAGA, action).toPromise()

            expect(dispatched.length).toBe(1)
            expect(dispatched).toContainEqual(stickerReducer.actions.setCopyCountAction(answer.getCopyCountForLocation.values))
            expect(numberAPI.getCopyCountForLocation.mock.calls.length).toBe(1)
            numberAPI.getCopyCountForLocation.mock.results[0].value.then( response => expect(response).toBe(answer.getCopyCountForLocation))
        })

        test('reject',async () => {

            answer = {
                getCopyCountForLocation: {
                    status: 200,
                    values: 3
                }
            }

            action = {
                payload: {

                }
            }

            numberAPI.getCopyCountForLocation = jest.fn(() => Promise.reject(answer.getCopyCountForLocation))

            await runSaga(fakeStore, stickerReducer.getLocationCopyCountSAGA, action).toPromise()

            expect(dispatched.length).toBe(0)
            expect(dispatched).not.toContainEqual(stickerReducer.actions.setCopyCountAction(answer.getCopyCountForLocation.values))
        })
    })

    describe('showLocationSAGA', () => {

        test('success', async () => {

            answer = {
                getLocation: {
                    values: {
                        name: "success",
                        location: "success"
                    }
                },
                getUserBatchAccess: {
                    values: 1
                }
            }

            action = {
                payload: {
                    id: 1
                }
            }

            numberAPI.getLocation = jest.fn(() => Promise.resolve(answer.getLocation))
            numberAPI.getUserBatchAccess = jest.fn(() => Promise.resolve(answer.getUserBatchAccess))

            await runSaga(fakeStore, stickerReducer.showLocationSAGA, action).toPromise()

            expect(dispatched.length).toBe(2)
            expect(dispatched).toContainEqual(stickerReducer.actions.setLocation(answer.getLocation.values.name + ': ' + answer.getLocation.values.location))
            expect(dispatched).toContainEqual(stickerReducer.actions.setUserBatchAccess(Boolean(answer.getUserBatchAccess.values)))
            expect(numberAPI.getLocation.mock.calls.length).toBe(1)
            numberAPI.getLocation.mock.results[0].value.then( response => expect(response).toBe(answer.getLocation))
            expect(numberAPI.getUserBatchAccess.mock.calls.length).toBe(1)
            numberAPI.getUserBatchAccess.mock.results[0].value.then( response => expect(response).toBe(answer.getUserBatchAccess))
        })

        test('getLocation reject', async () => {

            answer = {
                getLocation: {
                    values: {
                        name: "reject",
                        location: "reject"
                    }
                }
            }

            action = {
                payload: {
                    id: 1
                }
            }

            numberAPI.getLocation = jest.fn(() => Promise.reject(answer.getLocation))

            await runSaga(fakeStore, stickerReducer.showLocationSAGA, action).toPromise()

            expect(dispatched.length).toBe(0)
            expect(dispatched).not.toContainEqual(stickerReducer.actions.setLocation(answer.getLocation.values.name + ': ' + answer.getLocation.values.location))
            
        })

        test('getUserBatchAccess reject', async () => {

            answer = {
                getLocation: {
                    values: {
                        name: "reject",
                        location: "reject"
                    }
                },
                getUserBatchAccess: {
                    values: 1
                }
            }

            action = {
                payload: {
                    id: 1
                }
            }

            numberAPI.getLocation = jest.fn(() => Promise.resolve(answer.getLocation))
            numberAPI.getUserBatchAccess = jest.fn(() => Promise.reject(answer.getUserBatchAccess))

            await runSaga(fakeStore, stickerReducer.showLocationSAGA, action).toPromise()

            expect(dispatched.length).toBe(1)
            expect(dispatched).toContainEqual(stickerReducer.actions.setLocation(answer.getLocation.values.name + ': ' + answer.getLocation.values.location))
            expect(dispatched).not.toContainEqual(stickerReducer.actions.setUserBatchAccess(Boolean(answer.getUserBatchAccess.values)))
        })
    })

    describe('getLPUSAGA', () => {

        test('success', async () => {

            answer = {
                getLPU: {
                    values: [
                        'some value'
                    ]
                }
            }
            
            numberAPI.getLPU = jest.fn(() => Promise.resolve(answer.getLPU))

            await runSaga(fakeStore, stickerReducer.getLPUSAGA).toPromise()

            expect(dispatched.length).toBe(1)
            expect(dispatched).toContainEqual(stickerReducer.actions.setLPUList(answer.getLPU.values))
            expect(numberAPI.getLPU.mock.calls.length).toBe(1)
            numberAPI.getLPU.mock.results[0].value.then( response => expect(response).toBe(stickerReducer.actions.setLPUList(answer.getLPU.values)))
        })

        test('reject', async () => {

            answer = {
                getLPU: {
                    values: [
                        'some value'
                    ]
                }
            }
            
            numberAPI.getLPU = jest.fn(() => Promise.reject(answer.getLPU))

            await runSaga(fakeStore, stickerReducer.getLPUSAGA).toPromise()

            expect(dispatched.length).toBe(0)
            expect(dispatched).not.toContainEqual(stickerReducer.actions.setLPUList(answer.getLPU.values))
        })
    })

    describe('getAllLocationsSAGA', () => {

        test('success', async () => {

            answer = {
                getAllLocations: {
                    values: [
                        'location'
                    ]
                } 
            }

            numberAPI.getAllLocations = jest.fn(() => Promise.resolve(answer.getAllLocations))

            await runSaga(fakeStore, stickerReducer.getAllLocationsSAGA).toPromise()

            expect(dispatched.length).toBe(1)
            expect(dispatched).toContainEqual(stickerReducer.actions.setLocations(answer.getAllLocations.values))
            expect(numberAPI.getAllLocations.mock.calls.length).toBe(1)
            numberAPI.getAllLocations.mock.results[0].value.then( response => expect(response).toBe(answer.getAllLocations.values))
        })
        
        test('reject', async () => {

            answer = {
                getAllLocations: {
                    values: [
                        'location'
                    ]
                } 
            }

            numberAPI.getAllLocations = jest.fn(() => Promise.reject(answer.getAllLocations))

            await runSaga(fakeStore, stickerReducer.getAllLocationsSAGA).toPromise()

            expect(dispatched.length).toBe(0)
            expect(dispatched).not.toContainEqual(stickerReducer.actions.setLocations(answer.getAllLocations.values))
        })
    })

    describe('insertNewLocatoinSAGA', () => {

        test('success', async () => {

            answer = {
                postNewLocation: {
                    values: 1
                }
            }

            action = {
                payload: {
                    data: 'success'
                }
            }

            numberAPI.postNewLocation = jest.fn(() => Promise.resolve(answer.postNewLocation))

            await runSaga(fakeStore, stickerReducer.insertNewLocatoinSAGA, action).toPromise()

            expect(dispatched.length).toBe(1)
            expect(dispatched).toContainEqual(stickerReducer.actions.getAllLocationsSagsaAC())
            expect(numberAPI.postNewLocation.mock.calls.length).toBe(1)
            numberAPI.postNewLocation.mock.results[0].value.then( response => expect(response).toBe(answer.postNewLocation))
        })

        test('unsuccess', async () => {

            answer = {
                postNewLocation: {
                    values: 0
                }
            }

            action = {
                payload: {
                    data: 'unsuccess'
                }
            }

            numberAPI.postNewLocation = jest.fn(() => Promise.resolve(answer.postNewLocation))

            await runSaga(fakeStore, stickerReducer.insertNewLocatoinSAGA, action).toPromise()

            expect(dispatched.length).toBe(0)
            expect(dispatched).not.toContainEqual(stickerReducer.actions.getAllLocationsSagsaAC())
            expect(numberAPI.postNewLocation.mock.calls.length).toBe(1)
            numberAPI.postNewLocation.mock.results[0].value.then( response => expect(response).toBe(answer.postNewLocation))
        })

        test('reject', async () => {

            answer = {
                postNewLocation: {
                    values: 1
                }
            }

            action = {
                payload: {
                    data: 'reject'
                }
            }

            numberAPI.postNewLocation = jest.fn(() => Promise.reject(answer.postNewLocation))

            await runSaga(fakeStore, stickerReducer.insertNewLocatoinSAGA, action).toPromise()

            expect(dispatched.length).toBe(0)
            expect(dispatched).not.toContainEqual(stickerReducer.actions.getAllLocationsSagsaAC())
        })
    })

    describe('deleteLocationSAGA', () => {

        test('success', async () => {

            answer = {
                deleteLocation: {
                    values: 1
                }
            }

            action = {
                payload: {
                    id: 7
                }
            }

            numberAPI.deleteLocation = jest.fn(() => Promise.resolve(answer.deleteLocation))

            await runSaga(fakeStore, stickerReducer.deleteLocationSAGA, action).toPromise()

            expect(dispatched.length).toBe(1)
            expect(dispatched).toContainEqual(stickerReducer.actions.getAllLocationsSagsaAC())
            expect(numberAPI.deleteLocation.mock.calls.length).toBe(1)
            numberAPI.deleteLocation.mock.results[0].value.then( response => expect(response).toBe(answer.deleteLocation))
        })

        test('unsuccess', async () => {

            answer = {
                deleteLocation: {
                    value: 0
                }
            }

            action = {
                payload: {
                    id: 7
                }
            }

            numberAPI.deleteLocation = jest.fn(() => Promise.resolve(answer.deleteLocation))

            await runSaga(fakeStore, stickerReducer.deleteLocationSAGA, action).toPromise()

            expect(dispatched.length).toBe(0)
            expect(dispatched).not.toContainEqual(stickerReducer.actions.getAllLocationsSagsaAC())
            expect(numberAPI.deleteLocation.mock.calls.length).toBe(1)
            numberAPI.deleteLocation.mock.results[0].value.then( response => expect(response).toBe(answer.deleteLocation))
        })

        test('reject', async () => {

            answer = {
                deleteLocation: {
                    value: 1
                }
            }

            action = {
                payload: {
                    id: 7
                }
            }

            numberAPI.deleteLocation = jest.fn(() => Promise.reject(answer.deleteLocation))

            await runSaga(fakeStore, stickerReducer.deleteLocationSAGA, action).toPromise()

            expect(dispatched.length).toBe(0)
            expect(dispatched).not.toContainEqual(stickerReducer.actions.getAllLocationsSagsaAC())
        })
    })

    describe('getFilteredLocationsSAGA', () => {

        test('success', async () => {

            answer = {
                getFilteredLocations: {
                    values: [
                        {
                            value: 3,
                            label: 'success'
                        }
                    ]
                }
            }

            action = {
                payload: {
                    selectedLPU: 3
                }
            }

            numberAPI.getFilteredLocations = jest.fn(() => Promise.resolve(answer.getFilteredLocations))

            await runSaga(fakeStore, stickerReducer.getFilteredLocationsSAGA, action).toPromise()

            expect(dispatched.length).toBe(1)
            expect(dispatched).toContainEqual(stickerReducer.actions.setFilteredLocations(answer.getFilteredLocations.values))
            expect(numberAPI.getFilteredLocations.mock.calls.length).toBe(1)
            numberAPI.getFilteredLocations.mock.results[0].value.then( response => expect(response).toBe(answer.getFilteredLocations))
        })

        test('reject', async () => {

            answer = {
                getFilteredLocations: {
                    values: [
                        {
                            value: 3,
                            label: 'reject'
                        }
                    ]
                }
            }

            action = {
                payload: {
                    selectedLPU: 3
                }
            }

            numberAPI.getFilteredLocations = jest.fn(() => Promise.reject(answer.getFilteredLocations))

            await runSaga(fakeStore, stickerReducer.getFilteredLocationsSAGA, action).toPromise()

            expect(dispatched.length).toBe(0)
            expect(dispatched).not.toContainEqual(stickerReducer.actions.setFilteredLocations(answer.getFilteredLocations.values))
        })
    })

    describe('setLocationCopyCountSAGA', () => {

        test('success', async () => {

            answer = {
                getLocationCopyCount: {
                    status: 200,
                    values: 7
                }
            }

            action = {
                payload: {
                    copyCount: {
                        copyCount: 3,
                        location: 3
                    }
                }
            }

            numberAPI.getLocationCopyCount = jest.fn(() => Promise.resolve(answer.getLocationCopyCount))

            await runSaga(fakeStore, stickerReducer.setLocationCopyCountSAGA, action).toPromise()

            expect(dispatched.length).toBe(1)
            expect(dispatched).toContainEqual(stickerReducer.actions.setCopyCountAction(action.payload.copyCount.copyCount))
            expect(numberAPI.getLocationCopyCount.mock.calls.length).toBe(1)
            numberAPI.getLocationCopyCount.mock.results[0].value.then( response => expect(response).toBe(answer.getLocationCopyCount))
        })

        test('unsuccess', async () => {

            answer = {
                getLocationCopyCount: {
                    status: 100,
                    values: 7
                }
            }

            action = {
                payload: {
                    copyCount: {
                        copyCount: 3,
                        location: 3
                    }
                }
            }

            numberAPI.getLocationCopyCount = jest.fn(() => Promise.resolve(answer.getLocationCopyCount))

            await runSaga(fakeStore, stickerReducer.setLocationCopyCountSAGA, action).toPromise()

            expect(dispatched.length).toBe(0)
            expect(dispatched).not.toContainEqual(stickerReducer.actions.setCopyCountAction(action.payload.copyCount.copyCount))
            expect(numberAPI.getLocationCopyCount.mock.calls.length).toBe(1)
            numberAPI.getLocationCopyCount.mock.results[0].value.then( response => expect(response).toBe(answer.getLocationCopyCount))
        })

        test('reject', async () => {

            answer = {
                getLocationCopyCount: {
                    status: 200,
                    values: 7
                }
            }

            action = {
                payload: {
                    copyCount: {
                        copyCount: 3,
                        location: 3
                    }
                }
            }

            numberAPI.getLocationCopyCount = jest.fn(() => Promise.reject(answer.getLocationCopyCount))

            await runSaga(fakeStore, stickerReducer.setLocationCopyCountSAGA, action).toPromise()

            expect(dispatched.length).toBe(0)
            expect(dispatched).not.toContainEqual(stickerReducer.actions.setCopyCountAction(action.payload.copyCount.copyCount))
        })
    })
    
})