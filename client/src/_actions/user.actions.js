import { userConstants, alertConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import { setAuthHeader } from '../_helpers/auth-header';

// We wrapped all Actions creators for easier accessing them in other files
export const userActions = {
    login,
    logout,
    signup
};

// There are 3 Actions Creators for User Actions
function login(email, password) {
    return dispatch => {
        // send request
        dispatch(request({ email }));

        userService.login(email, password)
            .then(
                user => { 
                    dispatch(success(user));
                    dispatch(alertActions.success("Welcome"));
                    setAuthHeader();
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    // Sub Actions Creators that are nested
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function signup(email, password, name) {
    return dispatch => {
        dispatch(request({ email }));

        userService.signup(email, password, name)
            .then(
                user => { 
                    dispatch(success(user));
                    dispatch(alertActions.success("Welcome"));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    // Sub Actions Creators that are nested
    function request(user) { return { type: userConstants.SIGNUP_REQUEST, user } }
    function success(user) { return { type: userConstants.SIGNUP_SUCCESS, user } }
    function failure(error) { return { type: userConstants.SIGNUP_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}