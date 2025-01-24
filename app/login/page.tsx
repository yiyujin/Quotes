'use client';

import LoginForm from "../ui/page/LoginForm";
import { Suspense } from "react";
import { createUser } from "../lib/actions";

export default function LoginPage() {

    const handleSubmit = async ( e : any ) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const name = formData.get('name')?.toString().trim();
        const lastname = formData.get('lastname')?.toString().trim();
        const email = formData.get('email')?.toString().trim();
        const password = formData.get('password')?.toString().trim();

        await createUser( formData );
    }

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

            <form aciton = { createUser } onSubmit = { handleSubmit }>
                <div>
                    <label htmlFor = "email">Email</label>
                    <input required id = "email" name = "email" placeholder = "Enter your email address"/>
                </div>

                <div>
                    <label>Password</label>
                    <input required id = "password" name = "password" placeholder = "Enter your password"/>
                </div>

                <div>
                    <label>Confirm Password</label>
                    <input placeholder = "Enter your password"/>
                </div>

                <div>
                    <label>First Name</label>
                    <input required id = "name" name = "name" placeholder = "Enter your first name"/>
                </div>

                <div>
                    <label>Last Name</label>
                    <input required id = "lastname" name = "lastname" placeholder = "Enter your last name"/>
                </div>


                <div style = { { display : "flex" } } >
                    <label>Terms</label>
                    <input type = "checkbox"/>
                </div>

                <button className = "Button">Sign Up</button>
            </form>
        
        </div>
    )
}