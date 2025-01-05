import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";
import {FcGoogle} from 'react-icons/fc';
import {FaGithub} from 'react-icons/fa'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SignInFlow } from "../types";
import { useState } from "react";
interface SignInProps {
    setState: (state:SignInFlow) => void;

}

export const SignIn = ({setState}:SignInProps) => {

    const { signIn } = useAuthActions();


    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const onProvider = (value: 'github' | 'google')=>{
        signIn(value)
    };

    return (
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle>
                    SignIn to continue
                </CardTitle>
                <CardDescription>
                Use your email or another service to continue
            </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5 px-0 pb-0">
                <form className="space-y-2.5">
                    <div className="flex flex-col gap-4" >
                        <input className="p-2"
                        disabled={false}
                        required
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        type="email"
                        placeholder="Email"
                        />
                        <input className="p-2"
                        type="password"
                        placeholder="Password"
                        disabled={false}
                        required
                        value={password}
                       onChange={(e)=>setPassword(e.target.value)}
                       
                        />
                        <Button type='submit' className="w-full" size='lg' disabled={false}>Continue</Button>
                            </div>
                            </form>
                            <Separator/>
                                <div className="flex flex-col gap-y-2.5">
                                    <Button
                                    disabled={false}
                                    onClick={()=>{}}
                                    variant='outline'
                                    size='lg'
                                    className="w-full relative"
                                    >
                                        <FcGoogle className="size-6 absolute left-3" />
                                        Continue with Google

                                    </Button>
                                    <Button
                                    disabled={false}
                                    onClick={()=>onProvider('github')}
                                    variant='outline'
                                    size='lg'
                                    className="w-full relative"
                                    >
                                        <FaGithub className="size-6 absolute left-3" />
                                        Continue with Github

                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                Dont&apos;t have an account? <span onClick={()=>setState('signUp')} className="text-sky-700 hover:underline cursor-pointer">Sign-up</span>

                                </p>
            </CardContent>
        </Card>
    );
}
