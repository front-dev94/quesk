export const userInfoFormatter = (response, credentials = {}) => {
    if (!response.error && response) {
        const {user, token} = response;
        if(user && token){
            return {
                accessToken: token,
                username: user.username,
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            };
        }
    }
    return response;
};