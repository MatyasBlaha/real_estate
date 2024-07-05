const QUERY_EMAIL = {
    CHECK_EMAIL_EXISTS: `
    SELECT * FROM users WHERE email = ?
`,


};

export default QUERY_EMAIL;