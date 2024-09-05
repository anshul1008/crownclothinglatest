import {useState} from 'react';
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils.js"
import FormInput from "../form-input/form-input.component";
import './sign-up-form.style.scss';

const defaultFormFields = {
    displayName : "",
    email : "",
    password : "",
    confirmPassword : ""
};

const SignUpForm = () =>{
    const [formFields, setFormField] = useState(defaultFormFields);
    const {displayName,  email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormField(defaultFormFields);
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();

        if(password != confirmPassword){
            alert("password do not match");
            return;
        }

        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            
            await createUserDocumentFromAuth(user,{ displayName});
            resetFormFields();
        }catch(error){
            console.log("user creation encounter an error".error);
        }

    }

    const handleChange = (event) =>{
        const {name, value} = event.target;
        setFormField({...formFields, [name]:value})
    }
    return (
        <div className="sign-up-container">
            <h2>Don't have an account</h2>
            <span> Sign UP Form</span>

            <form onSubmit={handleSubmit}>

            <FormInput label="display Name" type="text" required onChange={handleChange} name="displayName" value={displayName}/>

            <FormInput label="email" type="email" required onChange={handleChange} name="email" value={email}/>

            <FormInput label="password" type="password" required onChange={handleChange} name="password" value={password}/>

            <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>

            <button type="submit">Sign Up</button>

            </form>
            
        </div>
    );
}

export default SignUpForm;