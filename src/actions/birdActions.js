import { BIRD_FACTS, BIRD_IMAGE } from './types';

export const createBirdFact = () => dispatch => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://some-random-api.ml/facts/bird"; // site that doesn’t send Access-Control-*
    fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
    .then(response => response.text())
    .then(res => {
        let fact = JSON.parse(res)
        dispatch({
            type: BIRD_FACTS,
            payload: fact.fact
        })
    })
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    }
    export const createBirdImage = () => dispatch => {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = "https://some-random-api.ml/img/birb"; // site that doesn’t send Access-Control-*
        fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
        .then(response => response.text())
        .then(res => {
            let picture = JSON.parse(res)
            dispatch({
                type: BIRD_IMAGE,
                payload: picture.link
            })
        })
        .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
        }