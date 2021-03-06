import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addSmurf, setError } from "../actions"

const initialValues = {
    // id:"",
    name: "",
    position: "",
    nickname: "",
    description: ""
}
const AddForm = (props) => {
    const [state, setState] = useState(initialValues);

    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
            // id: Date.now(),
        });
    }
    //3. Within the handleSubmit function, replace the static assignment to errorMessage with a call to the setError action. Test that an error is displayed when this validation code fails.
    //4. Within the handleSubmit function, call your addSmurf action with the smurf name, position, nickname and summury passed as arguments. Test that a smurf is correctly added to when the form is submitted.
    const handleSubmit = e => {
        e.preventDefault();
        if (state.name === "" || state.position === "" || state.nickname === "") {
            props.setError("Name, position and nickname fields are required.");
        } else {
            props.setError("");
            setState(initialValues);
            return (
                props.addSmurf({
                    // id:state.id,
                    // name: state.name,
                    // position: state.position,
                    // nickname: state.nickname,
                    // description: state.description,
                    ...state
                }));
        }
    }
    //2. Replace all instances of the errorMessage static variable with your error message state value. 
    //  const errorMessage = ""; //see new replacement code nest to the note to self below. 
    return (<section>
        <h2>Add Smurf</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name:</label><br />
                <input onChange={handleChange} value={state.name} name="name" id="name" />
            </div>
            <div className="form-group">
                <label htmlFor="position">Position:</label><br />
                <input onChange={handleChange} value={state.position} name="position" id="position" />
            </div>
            <div className="form-group">
                <label htmlFor="nickname">Nickname:</label><br />
                <input onChange={handleChange} value={state.nickname} name="nickname" id="nickname" />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description:</label><br />
                <textarea onChange={handleChange} value={state.description} name="description" id="description" />
            </div>
            {
                props.errorMessage && <div data-testid="errorAlert" className="alert alert-danger" role="alert">Error: {props.errorMessage}</div>
            }
            {/* note to self. Need more work here - had to create a function component in App.js Could not get this error to work with the Class Component. Super disappointed */}
            <button>Submit Smurf</button>
        </form>
    </section>);
}
//Simply could not get this block to work with the Class Compoenent. I'm leaving it here to try to work out later. 
// const mapStateToProps = state => {
//     return {
//         error: state.error
//     }
// }
const mapStateToProps = (state) => {
    return {
        // id: state.id,
        // name: state.name,
        // position: state.position,
        // nickname: state.nickname,
        // description: state.description,
        // errorMessage: state.errorMessage
        ...state
    }
}
//1. Connect the errorMessage, setError and addSmurf actions to the AddForm component.
//   export default AddForm; this code replaced with the line below
export default connect(mapStateToProps, { addSmurf, setError })(AddForm);



//Task List:
//1. Connect the errorMessage, setError and addSmurf actions to the AddForm component.
//2. Replace all instances of the errorMessage static variable with your error message state value. 
//3. Within the handleSubmit function, replace the static assignment to errorMessage with a call to the setError action. Test that an error is displayed when this validation code fails.
//4. Within the handleSubmit function, call your addSmurf action with the smurf name, position, nickname and summury passed as arguments. Test that a smurf is correctly added to when the form is submitted.