'use client';

import { useState } from "react";
import { SignInFlow } from "../types";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";


export const AuthScreen = () => {
 const [state,setState] = useState<SignInFlow>('signIn')
return (
    <div className="h-screen w-full flex items-center justify-center bg-[#8b5485]">
        <div className="md:h-auto md:w-[420px]">
            {state === 'signIn' ? <SignIn setState={setState} /> : <SignUp setState={setState} /> }
        </div>
    </div>

)
}