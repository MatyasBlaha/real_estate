

const Login = () => {

    return(
        <div>
            <h1>Login Form</h1>
            <form>
                <label>
                    Email:
                    <input type="email" name="email" required />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" required />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Login;