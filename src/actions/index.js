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
export const addPost = (post) => {
    return {
        type: 'ADD_POST',
        payload: post
    }
}