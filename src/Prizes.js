import React from 'react';


export class Prizes extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {

        var refers = this.props.refers;

        if (refers === 0)
        {
            return (
                <ul>
                    <li>Free Prize for Creating Account</li>
                </ul>
            );
        }
        else if (refers > 0 && refers < 2)
        {
            return (
                <ul>
                    <li>Free Prize for Creating Account</li>
                    <li>The Takeoff Hat</li>
                </ul>
            );
        }
        else if (refers > 1 && refers < 5)
        {
            return (
                <ul>
                    <li>Free Prize for Creating Account</li>
                    <li>The Takeoff Hat</li>
                    <li>The Takeoff T-Shirt</li>
                </ul>
            );
        }
        else
        {
            return (
                <ul>
                    <li>Free Prize for Creating Account</li>
                    <li>The Takeoff Hat</li>
                    <li>The Takeoff T-Shirt</li>
                    <li>The Takeoff Car</li>
                </ul>
            );
        }
    }
}

export default Prizes;
