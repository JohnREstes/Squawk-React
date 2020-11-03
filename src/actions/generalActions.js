import axios from 'axios'

export const deleteOldBlacklistedTokens = () => dispatch => {
    const config = {
        method: 'delete',
        url: 'http://localhost:5000/api/blacklisted-tokens/old-tokens'
        }
    axios(config);
}