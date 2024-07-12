"use client"
import CardWrapper from "@/components/auth/card-wrapper";
import {useForm} from "react-hook-form";
import {LoginSchema, RegisterSchema} from "@/schemas";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import FormError from "@/components/ui/form-error";
import FormSuccess from "@/components/ui/form-success";
import {useState, useTransition} from "react";
import {register} from "@/actions/register";

export default function RegisterForm() {
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition();


    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
        }
    })


    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            register(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                })
        })
    }


    return (
        <>
            <CardWrapper
                headerLabel={"Crete an account"}
                backButtonLabel={"Already have an account?"}
                backButtonHref={"/auth/login"}
                showSocial
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                          className={"space-y-6"}
                    >
                        <div className={"space-y-4"}>


                            <FormField
                                control={form.control}
                                name={"name"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input disabled={isPending} {...field} type={"text"}
                                                   placeholder={"Name"}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={"email"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input disabled={isPending} {...field} type={"email"}
                                                   placeholder={"Email"}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={"password"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input disabled={isPending} {...field} type={"password"}
                                                   placeholder={"Password"}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormError message={error}/>
                        <FormSuccess message={success}/>
                        <Button disabled={isPending} type={"submit"} className={"w-full"}>Crete an account</Button>
                    </form>
                </Form>
            </CardWrapper>
        </>
    )
}
