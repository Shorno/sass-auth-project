import {Button} from "@/components/ui/button";
import {LoginButton} from "@/components/auth/login-button";

export default function Home() {

    return (
        <main className="flex h-full flex-col items-center justify-center bg-gradient-to-b from-sky-400 to-blue-800 ">
            <div className={"space-y-6 text-center"}>
                <h1 className={"text-6xl font-semibold text-white drop-shadow-md"}>Auth 🔐</h1>
                <p className={"text-white text-lg"}>Simple Authentication Service</p>
                <div>
                    <LoginButton>
                        <Button variant={"secondary"} size={"lg"}>Sign in</Button>
                    </LoginButton>
                </div>
            </div>

        </main>
    );
}
