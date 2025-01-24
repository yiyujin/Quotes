import LoginForm from "../ui/page/LoginForm";
import { Suspense } from "react";

export default function LoginPage() {
    return(
        <div className = "page">
            <h3>Ready to quote? Please log in or sign up.</h3>

            <br/>
            <br/>
            <hr/>

            <br/>
            <h3>Log in</h3>
            <br/>

            <Suspense>
                <LoginForm />
            </Suspense>


            <br/>
            <br/>
            <hr/>

            <br/>
            <h3>Sign Up</h3>
            <br/>

            <div>
                <label htmlFor = "email">Email</label>
                <input required id = "email" type = "email" name = "email" placeholder = "Enter your email address"/>
            </div>

            <div>
                <label htmlFor = "email">Password</label>
                <input required id = "password" type = "password" name = "password" placeholder = "Enter your password" minLength = { 6 }/>
            </div>

            <div>
                <label htmlFor = "email">Confirm Password</label>
                <input required id = "password" type = "password" name = "password" placeholder = "Enter your password" minLength = { 6 }/>
            </div>

            <div>
                <label htmlFor = "email">First Name</label>
                <input required id = "email" type = "email" name = "email" placeholder = "Enter your name"/>
            </div>

            <div>
                <label htmlFor = "email">Last Name</label>
                <input required id = "email" type = "email" name = "email" placeholder = "Enter your name"/>
            </div>


            <div style = { { display : "flex" } } >
                <label>Terms</label>
                <input type = "checkbox"/>
            </div>

            <button className = "Button">Sign Up</button>
        
        </div>
    )
}