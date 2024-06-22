const QUERY = {
    CREATE_USER: `
    INSERT INTO users (username, email, password) VALUES (?,?,?)
`,

    ADD_USER_AVATAR: `
    INSERT INTO user_avatar (user_id, avatar_url)
    VALUES (?,?)
`,

    ADD_USER_ROLE: `
    INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)
`

}

export default QUERY;