"use client";

import { BsSlack } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { RxGithubLogo } from "react-icons/rx";
import Typography from "@/components/ui/typography";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { date, set, z } from "zod";
import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { MdOutlineAutoAwesome } from "react-icons/md";
import { Provider } from "@supabase/supabase-js";
import { createBrowserClient } from '@supabase/ssr'
import { registerWithEmail } from "@/actions/registerwitheamil";
import { useRouter } from "next/navigation";

const supabaseBrowserClient = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AuthPage() {


  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const router = useRouter(); 
  
  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { session } } = await supabaseBrowserClient.auth.getSession();
      
      console.log(session);
      if (session) {
        router.push('/'); 
        return null
      }
    };
  
    getCurrentUser();
  }, [router]); 
  

  const formSchema = z.object({
    email: z
      .string()
      .email()
      .min(2, { message: "Email must be at least 2 characters" }),
   
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
 
    },
  });


  const onSubmit = async (val: z.infer<typeof formSchema>) => {
    console.log(val);
    setIsAuthenticating(true)
   const res = await registerWithEmail({email: val.email})
   const {data, error} = JSON.parse(res)
   if(error) {
    console.warn('Sign in error',error)
   }
   if(data) {
    console.log('Sign in success',data)
   }
    setIsAuthenticating(false)

  };

 async function socialAuth(provider: Provider) {
  setIsAuthenticating(true);
  try {
    await supabaseBrowserClient.auth.signInWithOAuth({
      provider,
      options: {
        skipBrowserRedirect: false,
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
      }
    })
  } catch (error) {
    console.error(error);
  } finally {
    setIsAuthenticating(false)
  }
}

if(isMounted) return null;

  return (
    <div className="min-h-screen p-5 grid text-center place-content-center bg-white">
      <div className="max-w-[450]">
        <div className="flex justify-center items-center gap-3 mb-4 ">
          <BsSlack size={30} />
          <Typography variant="h2" text="Carisam Slack" />
        </div>
        <Typography
          variant="h2"
          text="Sign in to your account"
          className="mb-3"
        />

        <Typography
          variant="p"
          text="Enter your email and password"
          className="mb-7 opacity-90"
        />

        <div className="flex flex-col space-y-4">
          <Button disabled={isAuthenticating} 
            variant="outline" 
            className="py-6 border-2 flex space-x-3" 
            onClick={()=>socialAuth('google')}
          >

            <FcGoogle size={30} />
            <Typography
              className="text-xl"
              text="Continue with Google"
              variant="p"
            />
          </Button>
          <Button disabled={isAuthenticating} 
          variant="outline"
           className="py-6 border-2 flex space-x-3" 
          onClick={()=>socialAuth('github')}
          >
            <RxGithubLogo size={30} />
            <Typography
              className="text-xl"
              text="Continue with Github"
              variant="p"
            />
          </Button>
        </div>

        <div>
          <div className="flex items-center my-6">
            <div className="mr-[10px] flex-1 border-t bg-netural-300" />
            <Typography
              text="OR"
              variant="p"
              className="text-xs font-medium text-netural-400"
            />
            <div className="ml-[10px] flex-1 border-t bg-netural-300" />
          </div>

          {/*Form*/}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <fieldset disabled={isAuthenticating}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="xyz@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  variant="secondary"
                  className="bg-primary-dark hover:bg-primary-dark/90 w-full my-5 text-white"
                  type="submit"
                >
                  <Typography text="Sign in with email" variant="p" />
                </Button>

                <div className="px-5 py-4 bg-gray-100 rounded-sm">
                  <div className="text-gray-500 flex items-center space-x-3">
                    <MdOutlineAutoAwesome />
                    <Typography
                      text="We will email you a magic link for a passwordless sign in"
                      variant="p"
                    />
                   
                  </div>
                </div>
              </fieldset>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
