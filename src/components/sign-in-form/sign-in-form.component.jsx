import {useState, useContext} from 'react';
import {createAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signINAuthUserWithEmailAndPassword} from "../../utils/firebase/firebase.utils.js"
import FormInput from "../form-input/form-input.component.js";
import './sign-in-form.style.scss';
import Button from "../button/button.component.jsx";
import { UserContext } from '../../context/user.context.jsx';

const defaultFormFields = {
    email : "",
    password : ""
};

const SignInForm = () =>{
    const [formFields, setFormField] = useState(defaultFormFields);
    const {email, password, confirmPassword } = formFields;

    const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormField(defaultFormFields);
    }

    const signInWithGoogle= async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
      };

    const handleSubmit = async (event) =>{
        event.preventDefault();

        

        try{
            const {user} = await signINAuthUserWithEmailAndPassword(email, password);
            setCurrentUser(user);
            resetFormFields();
        }catch(error){
            switch (error.code) {
                case 'auth/wrong-password':
                  alert('incorrect password for email');
                  break;
                case 'auth/user-not-found':
                  alert('no user associated with this email');
                  break;
                default:
                  console.log(error);
              }
        }

    };

    const handleChange = (event) =>{
        const {name, value} = event.target;
        setFormField({...formFields, [name]:value})
    }
    return (
        <div className="sign-in-container">
            <h2>Already have an account</h2>
            <span> Sign In Form</span>

            <form onSubmit={handleSubmit}>

            <FormInput label="email" type="email" required onChange={handleChange} name="email" value={email}/>

            <FormInput label="password" type="password" required onChange={handleChange} name="password" value={password}/>

            <div className="button-container">
            <Button buttonType="sign-in" type="submit">Sign In</Button>
            <Button buttonType="google" onClick={signInWithGoogle}>Sign In With Google</Button>
            </div>
            </form>
            
        </div>
    );
}

export default SignInForm;