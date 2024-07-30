import { authConstants } from './constants';
import axios from '../helpers/axios';

const userlogin = (user, userType) => {
    return async (dispatch) => {
        dispatch({
            type: authConstants.LOGIN_REQUEST
        });
        try {
            let res = {};
            console.log(user);
            if (userType === 'client') {
                res = await axios.post('/signin', {
                    ...user
                });
            }
            if (userType === 'dealer') {
                res = await axios.post('/dealer/signin', {
                    ...user
                });
            }
            if (res.status === 200) {
                const { token, user } = res.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: {
                        token, user
                    }
                });
            }
            // => This code is not working
            // if (res.status === 404) {
            //     console.log(res.data.error);
            //     dispatch({
            //         type: authConstants.LOGIN_FAILURE,
            //         payload: {
            //             msg: res.data.msg
            //         }
            //     })
            // }
        } catch (error) {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: {
                    msg: "Password is incorrect or You are not register"
                }
            })
        }
    }

}

const isUserLoggedIn = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            });
        } else {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: {
                    error: 'Failed to login'
                }
            })
        }
    }
}

const signout = () => {
    return async (dispatch) => {
        dispatch({
            type: authConstants.LOGIN_REQUEST
        });

        console.log("before making post request");
        const res = await axios.post('/dealer/sign-out');
     
        console.log("after making post request");
        if (res.status === 200) {
            localStorage.clear();
            dispatch({
                type: authConstants.LOGOUT_SUCCESS
            });
        } else {
            dispatch({
                type: authConstants.LOGOUT_FAILURE,
                payload: { error: res.data.error }
            });
        }
    }
}


//  const signout = () => {
//     return async (dispatch) => {
//         dispatch({
//             type: authConstants.LOGOUT_REQUEST
//         });

//         try {
//             console.log("before making post request");

//             const res = await fetch('localhost:2000/api/sign-out', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 credentials: 'include' // Include cookies in the request
//             });

//             console.log("after making post request");

//             if (res.status === 200) {
//                 localStorage.clear();
//                 dispatch({
//                     type: authConstants.LOGOUT_SUCCESS
//                 });
//             } else {
//                 const errorData = await res.json();
//                 dispatch({
//                     type: authConstants.LOGOUT_FAILURE,
//                     payload: { error: errorData.msg }
//                 });
//             }
//         } catch (error) {
//             console.error("Logout Error:", error); // Log the error for debugging
//             dispatch({
//                 type: authConstants.LOGOUT_FAILURE,
//                 payload: { error: error.message }
//             });
//         }
//     }
// }


export {
    userlogin,
    isUserLoggedIn,
    signout
}