'use client';

import { useActionState } from 'react';
import { authenticate } from '@/app/lib/action';
import { useSearchParams } from 'next/navigation';
 
export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
 
  return (
    <form action = { formAction }>
        <div>

          <div>
            <label htmlFor = "email">Email</label>
            <input required id = "email" type = "email" name = "email" placeholder = "Enter your email address"/>
          </div>

          <div>
            <label htmlFor = "email">Password</label>
            <input required id = "password" type = "password" name = "password" placeholder = "Enter your password" minLength = { 6 }/>
          </div>

        </div>

        <input type = "hidden" name = "redirectTo" value = { callbackUrl } />

        <button className = "Button" aria-disabled = { isPending }>Log in</button>

        <div aria-live = "polite" aria-atomic = "true">
          { errorMessage && (
              <p className = "error">{ errorMessage }</p>
          )}
        </div>
    </form>
  );
}