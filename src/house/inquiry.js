import React, { Component } from 'react';

class Inquiry extends Component {
    state = {  
        name: "",
        email: "",
        remarks: ""
    }
    onNameChange = (e) => {
        e.preventDefualt();
        this.setState({name: e.target.value})
    }
    onEmailChange = (e) => {
        e.preventDefualt();
        this.setState({email: e.target.value})
    }
    onRemarksChange = (e) => {
        e.preventDefualt();
        this.setState({remarks: e.target.value})
    }
    onSubmit = (e) =>{
        e.preventDefualt();
        const house = this.props.house;
        const contactInfo = this.state;
    }
    render() { 
        return (  
            <form className="mt-2">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeHolder="Name"
                        id="name"
                        value={this.state.name}
                        onChange={this.onNameChange} />
                </div>
                <button
                    className="btn btn-primary"
                    disabled={this.state.name.length ===0 ||
                    this.state.email.length ===0}
                    onClick={this.onSubmit}> 
                    Submit 
                </button>
            </form>

        );
    }
}
 
export default Inquiry;