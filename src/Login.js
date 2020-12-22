import React from 'react';

const Login = (props) => {

    const { email, setEmail, password, setPassword, handleLogin, handleSignup, hasAccount, setHasAccount, emailError, passwordError, referEmail, setReferEmail, code, setCode, handleReferral } = props;
    return (

        <section className="login container landing justify-content-center text-center">
            <h1>Welcome to The Takeoff Referrals Site!</h1>
            <nav className="col-12">
                <br />
                <a target="_blank" href="http://thetakeoff.substack.com">View The Takeoff Substack Here</a>
            </nav>
            <br></br>
            <div className="row">
                <div className="column col-12 col-md-5 border border-primary">
                    <h1>Login or Register:</h1>
                    <label>Username:</label>
                    <input type="text" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <p className="errorMsg">{emailError}</p>
                    <label>Password:</label>
                    <input
                        type="password"
                        autoFocus
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <p className="errorMsg">{passwordError}</p>
                    <div className="btnContainer">
                        {hasAccount ? (
                            <>
                                <button className="btn btn-success" onClick={handleSignup}>Sign up</button>
                                <p>Have an account?<span className="btn btn-link" onClick={() => setHasAccount(!hasAccount)} >Sign in</span></p>
                            </>
                        ) : (
                                <>
                                    <button className="btn btn-success" onClick={handleLogin}>Login</button>
                                    <p>Don't have an account?<span className="btn btn-link" onClick={() => setHasAccount(!hasAccount)}>Sign up</span></p>
                                </>
                            )}
                    </div>
                </div>
                <div className="col-0 col-md-2"></div>
                <div className="column col-12 col-md-5 border border-primary">
                    <h1>Subscribe to The Takeoff</h1>

                    <label>Email:</label>
                    <input type="email" id="email_refer_form" autoFocus required value={referEmail} onChange={(e) => setReferEmail(e.target.value)} />
                    <br></br>
                    <label>Code:</label>
                    <input type="text" id="code_refer_form" autoFocus required value={code} onChange={(e) => setCode(e.target.value)} />

                    <div className="btnContainer">

                        <button className="btn btn-warning" onClick={handleReferral}>Subscribe!</button>
                        {/* <input id="submit" name="submit" type="submit" value="Submit" onClick={handleReferral}/> */}

                    </div>
                </div>
            </div>
            <br />
            <img className="img-fluid" height="336" width="1010" src="takeoffRect.jpeg" alt="Takeoff Logo" />
        </section>

    )

};

export default Login;