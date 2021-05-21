import stickerReducer, { actions, initializeStateType } from './stickerReducer'

let state: initializeStateType

beforeEach(() => {
    state = {
        startNumber: 1,
        repeatedValue: 0,
        copy: 1,
        copyCount: 0,
        config: {
            background: "white",
            marginTop: "20px",
            marginBottom: "20px",
            width: 2,
            height: 30
        },
        user: {
            id: 0,
            batchAccess: false
        },
        location: '',
        LPUList: [],
        locationsList: [],
        newLocation: {
            lpu: 0,
            location: ''
        },
        selectedLocation: 0,
        filteredLocations: []
    }
})

describe('Testing sticker reduser action creaters:', () => {
    
    test ('setStartNumber', () => {
    
        const newState = stickerReducer(state, actions.setStartNumber(2))
    
        expect(newState.startNumber).toBe(2)
    }),
    
    test('setCopyAction', () => {

        const newState = stickerReducer(state, actions.setCopyAction(5))

        expect(newState.copy).toBe(5)
    }),

    test('setCopyCountAction', () => {

        const newState = stickerReducer(state, actions.setCopyCountAction(5))

        expect(newState.copyCount).toBe(5)

    }),
    
    test('setRepeatStickerValue', () => {

        const newState = stickerReducer(state, actions.setRepeatStickerValue(5))

        expect(newState.repeatedValue).toBe(5)

    }),
    
    test('setUserID', () => {

        const newState = stickerReducer(state, actions.setUserID(5))

        expect(newState.user.id).toBe(5)

    }),
    
    test('setUserBatchAccess', () => {

        const newState = stickerReducer(state, actions.setUserBatchAccess(true))

        expect(newState.user.batchAccess).toBeTruthy()

    }),
    
    test('setLocation', () => {

        const newState = stickerReducer(state, actions.setLocation('Miami'))

        expect(newState.location).toBe('Miami')

    }),
    
    test('setLPUList', () => {

        const newState = stickerReducer(state, actions.setLPUList([{ value: 1, label: 'Miami'}, { value: 2, label: 'Los Angeles'}]))

        expect(newState.LPUList[0].value).toBe(1)
        expect(newState.LPUList[0].label).toBe('Miami')
        expect(newState.LPUList[1].value).toBe(2)
        expect(newState.LPUList[1].label).not.toBe('Miami')

    }),
    
    test('setLocations', () => {

        const newState = stickerReducer(state, actions.setLocations([{id: 1, lpu: 1, location: 'Miami'}, { id: 2, lpu: 1, location: 'Los Angeles'}]))

        expect(newState.locationsList[0].id).toBe(1)
        expect(newState.locationsList[0].lpu).toBe(1)
        expect(newState.locationsList[0].location).toBe('Miami')
        expect(newState.locationsList[1].id).toBe(2)
        expect(newState.locationsList[1].lpu).not.toBe(2)
        expect(newState.locationsList[1].location).toBe('Los Angeles')

    }),
    
    test('setNewLocationLPU', () => {

        const newState = stickerReducer(state, actions.setNewLocationLPU(1))

        expect(newState.newLocation.lpu).toBe(1)

    }),
    
    test('setNewLocationLocation', () => {

        const newState = stickerReducer(state, actions.setNewLocationLocation('Miami'))

        expect(newState.newLocation.location).toBe('Miami')

    }),
    
    test('setSelectedLocation', () => {

        const newState = stickerReducer(state, actions.setSelectedLocation(5))

        expect(newState.selectedLocation).toBe(5)

    }),
    
    test('setFilteredLocations', () => {

        const newState = stickerReducer(state, actions.setFilteredLocations([{ value: 1, label: 'Miami' }]))

        expect(newState.filteredLocations[0].value).not.toBe(5)
        expect(newState.filteredLocations[0].label).toBe('Miami')

    })
})

