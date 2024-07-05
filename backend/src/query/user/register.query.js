const QUERY_REGISTER = {
    CREATE_USER: `
    INSERT INTO users (username, email, password) VALUES (?,?,?)
`,

    ADD_USER_AVATAR: `
    INSERT INTO user_avatar (user_id, avatar_url)
    VALUES (?,?)
`,

    ADD_USER_ROLE: `
    INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)
`,

    ADD_VERIFICATION_TOKEN: `
    INSERT INTO verification_tokens (user_id, verification_token) VALUES (?,?)  
`,

}

export default QUERY_REGISTER;