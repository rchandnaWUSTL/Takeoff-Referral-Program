import React from 'react';
import fire from './fire';
import Prizes from './Prizes';
import Root from './Root';


class Hero extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ref_value: 0,
            ref_code: "",
            handleLogout: props.handleLogout,
            user: props.user
        };
        this.setVariables = this.setVariables.bind(this);
    }

    setVariables(num, code) {
        console.log(num);
        this.setState({
            ref_value: num,
            ref_code: code
        });
    }

    componentDidMount() {
        var ref = fire.database().ref("user");
        console.log(this.state.user.email);
        var refNums = 999;
        var refCode = "error";
        // var stateData = [];
        ref.orderByChild("email").equalTo(this.state.user.email).on("child_added", (snapshot) => {
            refNums = snapshot.val().referrals;
            refCode = snapshot.val().code;
            console.log(refCode);
            this.setVariables(refNums, refCode);
        });

    };

    render() {
        if (this.state.user.email === "root@root.root")
        {
            console.log("in render of hero for root");
            return (<div>
                <h1>Logged in as Root</h1>
                <button className="btn btn-danger" onClick={this.state.handleLogout}>Logout</button>
                <Root />
            </div>)
        }
        else
        {

        return (
            <div className="container-fluid">
                <div className="hero">
                    {console.log("in return for Hero")}
                    <nav className="nav row">
                        <div className="col-3 justify-content-center">
                            <h2 className="d-flex justify-content-left">Welcome {this.state.user.email}</h2>
                        </div>
                        <div className="col-7"></div>
                        <div className="col-2 pt-4">
                            <button className="btn btn-danger" onClick={this.state.handleLogout}>Logout</button>
                        </div>
                    </nav>
                    <hr />

                    <div className="text-center">
                        <h1 className="d-inline">Your Referral Code: </h1>
                        <h1 className="d-inline refCode">{this.state.ref_code}</h1>
                    </div>
                    <br />
                        <div className="prizes">
                            <h3>You have referred {this.state.ref_value} people. Your Prizes:</h3>
                            <Prizes refers={this.state.ref_value} />
                        </div>

                </div>
            </div>
        );
                }
    };

}

export default Hero;

