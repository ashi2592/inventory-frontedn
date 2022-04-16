import { ALERT_NOTIFY, ALERT_NOTIFY_SUCCESS, SET_ERROR, } from '../actions/index';
const initialState = {
    loading: false,
    alterMessageText: '',
    error: ''
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_ERROR:

            return { ...state, loading: false, error: payload.message }
        case ALERT_NOTIFY_SUCCESS:
            return {
                ...state,
                alterMessageText: payload
            }

        default:
            return state
    }
}