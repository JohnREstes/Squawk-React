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
        type: 'SIGN-IN'
    };
};
export const addPost = (info) => {
    return {
        type: 'LOGIN_USER',
        payload: info
    }
}