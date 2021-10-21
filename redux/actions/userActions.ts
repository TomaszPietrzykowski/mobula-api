import * as constants from "../constants/userConstants"


export const logIn = () => async (dispatch) => {
    dispatch({
        type: constants.USER_LOGIN_SUCCESS,
        payload: { id: 123, name: "John", email: "ex@example.com"}
    })
}
