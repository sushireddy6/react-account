import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import { config } from './Config';

class AccountDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountHolderName: '',
            accountNumber: '',
            bankIFSC: '',
            bankName: '',
            bankAddress: '',
            city: ''
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps);
    }
    handleClick(event, role) {
        console.log('self props', this.props.appContext)
        if (this.state.accountHolderName.length <= 0 && this.state.accountNumber.length <= 0 && this.state.bankIFSC.length && this.state.bankName.length && this.state.bankAddress.length) {
            alert("Mandatory fields are missing");
            return;
        }
        var payload = {
            "accountHolderName": this.state.accountHolderName,
            "accountNumber": this.state.accountNumber,
            "bankIFSC": this.state.bankIFSC,
            "bankName": this.state.bankName,
            "bankAddress": this.state.bankAddress,
            "city": this.state.city
        }
        axios.post(config.apiBaseUrl + 'account', payload)
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    console.log("Account details registered!!");
                    alert("Account details registered!!");
                } else {
                    console.log("some error ocurred", response.status);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Account Details"
                        />
                        <TextField
                            hintText="Enter your Account Holder Name"
                            required
                            floatingLabelText="Account Holder Name"
                            onChange={(event, newValue) => this.setState({ accountHolderName: newValue })}
                        />
                        <br />
                        <TextField
                            hintText="Enter your Account Number"
                            floatingLabelText="Account Number"
                            onChange={(event, newValue) => this.setState({ accountNumber: newValue })}
                        />
                        <br />
                        <TextField
                            hintText="Enter Your Bank IFSC"
                            floatingLabelText="Bank IFSC"
                            onChange={(event, newValue) => this.setState({ bankIFSC: newValue })}
                        />
                        <br />
                        <TextField
                            hintText="Enter Your Bank Name"
                            floatingLabelText="Bank Name"
                            onChange={(event, newValue) => this.setState({ bankName: newValue })}
                        />
                        <br />
                        <TextField
                            hintText="Enter Your Bank Address"
                            floatingLabelText="Bank Address"
                            onChange={(event, newValue) => this.setState({ bankAddress: newValue })}
                        />
                        <br />
                        <TextField
                            hintText="Enter Your City"
                            floatingLabelText="City"
                            onChange={(event, newValue) => this.setState({ city: newValue })}
                        />
                        <br />
                        <RaisedButton label="Submit" primary={true} style={style}
                            onClick={(event) => this.handleClick(event, this.props.role)} />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}
const style = {
    margin: 15,
};
export default AccountDetails;