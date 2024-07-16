

const removeCookies = async (res) => {
    res.clearCookie('session');
    res.clearCookie('username');
}

export default removeCookies;