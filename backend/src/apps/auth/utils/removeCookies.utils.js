

const removeCookies = async (res) => {
    res.clearCookie('session');
    res.clearCookie('username');
    res.clearCookie('userId');
    res.clearCookie('profileId');
}

export default removeCookies;