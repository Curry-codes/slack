import { Button } from "@/components/ui/button";
import {FcGoogle} from 'react-icons/fc';
import {FaGithub} from 'react-icons/fa'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SignInFlow } from "../types";
import { useState } from "react";

interface SignUpProps {
    setState: (state:SignInFlow) => void;

}

export const SignUp = ({setState}:SignUpProps) => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    return (
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle>
                    Sign up to continue
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
                          <input className="p-2"
                        type="password"
                        placeholder="Confirm password"
                        disabled={false}
                        required
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        
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
                                    onClick={()=>{}}
                                    variant='outline'
                                    size='lg'
                                    className="w-full relative"
                                    >
                                        <FaGithub className="size-6 absolute left-3" />
                                        Continue with Github

                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                Already have an account? <span onClick={()=>setState('signIn')} className="text-sky-700 hover:underline cursor-pointer">Sign-in</span>

                                </p>
            </CardContent>
        </Card>
    );
}
