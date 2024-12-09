import Link from "next/link"
import { Button } from "./ui/button"
import { signOut } from "@/lib/auth"

export default function Header() {

    return (

        <header className="border-b">

            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">

                <div className="flex lg:flex-1">

                    <Link className="font-semibold" href="/">family.</Link>
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <form action={async () => {

                        "use server"

                        await signOut({

                            redirectTo: '/'
                        });
                    }}>
                        <Button variant='ghost'>Se déconnecter</Button>
                    </form>
                </div>
            </nav>
        </header>
    )
}
