import React, { Component } from "react";
import "../custom.css";
import { Redirect } from "react-router-dom";
import { Users } from "./models/User";
import axios from "axios";
import { Message } from "primereact/message";
import { InputText } from "primereact/inputtext";
import { backendUrlLogin } from "../BackendURL";

class Register extends Component {

    state = {
        successMessage: "",
        register: false,
        errorMessage: null,
        registerForm: {
            name: "",
            emailId: "",
            contactNo: "",
            password: ""
        },
        name: "",
        nameErrorMessage: "",
        emailId: "",
        emailIdErrorMessage: "",
        contactNo: "",
        contactErrorMessage: "",
        password: "",
        passwordErrorMessage: "",
        validName: false,
        validEmailId: false,
        validPassWord: false,
        validContactNumber: false
    };

    register = event => {
        event.preventDefault();
        var name=document.getElementById("name").value;
        var emailId=document.getElementById("emailId").value;
        var contactNumber = document.getElementById("contactNumber").value;
        var password = document.getElementById("password").value;
        var user = new Users();
        user.name=name;
        user.emailId = emailId;
        user.contactNumber = contactNumber;
        user.password = password;
        axios
          .post(backendUrlLogin, user)
          .then(response => {
            this.setState({
              register: false,
              successMessage: "user registered"
            });
            sessionStorage.setItem("userId", response.data.userId);
            sessionStorage.setItem("userName", response.data.userName);
            window.location.reload();
          })
          .catch(err => {
            this.setState({
              successMessage: null,
              errorMessage: err
            });
          });
      };

    validate = event => {
        var fieldName = event.target.name;
        var value = event.target.value;
        var errorMessage = "";
        switch (fieldName) {
            case "name":
                errorMessage = "field required";
                if (value) {
                    var regex = new RegExp(/^[A-Za-z][A-Za-z\s]+$/);
                    console.log(regex.test(value));
                    regex.test(value)
                        ? (errorMessage = "")
                        : (errorMessage += " Should contain only letters with spaces");
                    if (errorMessage != "field required") {
                        this.setState({ nameErrorMessage: errorMessage });
                    } else {
                        this.setState({
                            nameErrorMessage: "",
                            validName: true
                        });
                    }

                }
                this.setState({
                    name: value
                });
                break;
            case "emailId":
                var errorMessage = "";
                if (value) {
                    var regex = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);
                    console.log(regex.test(value));
                    if(regex.test(value)){
                        errorMessage="";
                       console.log("Correct email")
                    }
                    else{
                        errorMessage+="Should contain @G"
                    }
                    console.log(errorMessage.length)
                    if (errorMessage.length==0) { 
                        this.setState({ emailIdErrorMessage: errorMessage, validEmailId:true });
                    
                       
                    } else {
                        console.log("In here")
                        this.setState({
                            emailIdErrorMessage: errorMessage,
                            validEmailId: true
                        });
                    }

                }
                this.setState({
                    emailId: value
                });
                break;
            case "contactNo":
                errorMessage = "field required";
                if (value) {
                    var regex = new RegExp(/^[6-9][0-9]{9}$/);
                    console.log(regex.test(value));
                    regex.test(value)
                        ? (errorMessage = "")
                        : (errorMessage += " Should be a valid indian number");
                    if (errorMessage != "field required") {
                        this.setState({ contactErrorMessage: errorMessage });
                    } else {
                        this.setState({
                            contactErrorMessage: "",
                            validContactNumber: true
                        });
                    }

                }
                this.setState({
                    contactNo: value
                });
                break;
            case "password":
                errorMessage = "field required";
                if (value) {
                    var regexCAp = new RegExp(/^.*[A-Z].*$/);
                    var regexLow = new RegExp(/^.*[a-z].*$/);
                    var regexNum = new RegExp(/^.*[0-9].*$/);
                    regexCAp.test(value)
                        ? (errorMessage = "")
                        : (errorMessage =
                            errorMessage + " Should contain atleast 1 upper case letter");
                    regexLow.test(value)
                        ? (errorMessage = "")
                        : (errorMessage =
                            errorMessage + " Should contain atleast 1 lower case letter ");
                    regexNum.test(value)
                        ? (errorMessage = "")
                        : (errorMessage =
                            errorMessage + " Should contain atleast 1 number");
                    if (errorMessage != "field required") {
                        this.setState({ passwordErrorMessage: errorMessage });
                    } else {
                        this.setState({
                            passwordErrorMessage: "",
                            validPassWord: true
                        });
                    }


                } this.setState({
                    password: value
                });
                break;
        }
    };
    render() {
        return (
            <div>
                <div className="row my-5">
                    <section className="col"></section>
                    <section className="col">
                        <form className="form form-horizontal">
                            <div className="form-group">
                                <span className="p-float-label">
                                    <InputText
                                        id="name"
                                        required
                                        type="text"
                                        name="name"
                                        onChange={this.validate}
                                        className="form-control"
                                        value={this.state.name}
                                    />
                                    {
                                        <label htmlFor="name" className="font-weight-bold">
                                            Name
                    </label>
                                    }
                                </span>
                                {this.state.nameErrorMessage ? (
                                    <Message
                                        severity="error"
                                        text={this.state.nameErrorMessage}
                                    />
                                ) : null}
                            </div>
                            <br />
                            <div className="form-group">
                                <span className="p-float-label">
                                    <InputText
                                        id="emailId"
                                        required
                                        type="emailId"
                                        name="emailId"
                                        onChange={this.validate}
                                        className="form-control"
                                        value={this.state.emailId}
                                    />
                                    {
                                        <label htmlFor="emailId" className="font-weight-bold">
                                            Email Id
                    </label>
                                    }
                                </span>
                                {this.state.emailIdMessage ? (
                                    <Message
                                        severity="error"
                                        text={this.state.emailIdMessage}
                                    />
                                ) : null}
                            </div>
                            <br />
                            <div className="form-group">
                                <span className="p-float-label">
                                   <InputText
                                        id="contactNumber"
                                        required
                                        type="text"
                                        min="6000000000"
                                        max="9999999999"
                                        name="contactNo"
                                        onChange={this.validate}
                                        className="form-control"
                                        value={this.state.contactNo}
                                    />
                                    {
                                        <label htmlFor="contactNo" className="font-weight-bold">
                                            Contact Number
                    </label>
                                    }
                                </span>
                                {this.state.contactErrorMessage ? (
                                    <Message
                                        severity="error"
                                        text={this.state.contactErrorMessage}
                                    />
                                ) : null}
                            </div>
                            <br />
                            <div className="form-group">
                                <span className="p-float-label">
                                    
                                    <InputText
                                        id="password"
                                        value={this.state.registerForm.password}
                                        required
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        onChange={this.validate}
                                        value={this.state.password}
                                    />
                                    {
                                        <label htmlFor="password" className="font-weight-bold">
                                            Password
                    </label>
                                    }
                                </span>
                                {this.state.passwordErrorMessage ? (
                                    <Message
                                        severity="error"
                                        text={this.state.passwordErrorMessage}
                                    />
                                ) : null}
                            </div>
                            <br />
                            <div className="form-group">
                                <div className="row">
                                </div>
                                <button
                                    type="submit"
                                    className="my-4 col btn btn-primary form-control"
                                    onClick={this.register}
                                >
                                    Register
                </button>
                            </div>
                        </form>
                    </section>
                    <section className="col"></section>
                </div>
            </div>
        );
    }
}

export default Register;

