export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const SIGN_IN = 'SIGN_IN';
export const LOGIN_USER = 'LOGIN_USER';



export const increment = (number) => {
    return {
        type: 'INCREMENT',
        payload: number
    };
};
export const decrement = (number) => {
    return {
        type: 'DECREMENT',
        payload: number
    };
};
export const loginToggle = () => {
    return {
        type: 'SIGN_IN'
    };
};
export const addPost = (info) => {
    return {
        type: 'LOGIN_USER',
        payload: info
    }
}