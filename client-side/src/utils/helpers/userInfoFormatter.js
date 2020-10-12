export const userInfoFormatter = (response, credentials = {}) => {
    if (!response.error && response) {
        const {user, token} = response;
        if(user && token){
            return {
                accessToken: token,
                username: user.username,
                email: user.email
            };
        }
    }
    return response;
};