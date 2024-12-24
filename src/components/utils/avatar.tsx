import handleSignOut from "@/actions/authentication/signout";
import { Avatar as AvatarContainer, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/auth";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";

export default async function Avatar() {

    const session = await auth();

    return (

        <DropdownMenu>

            <DropdownMenuTrigger asChild>

                <AvatarContainer className="h-8 w-8 cursor-pointer">

                    <AvatarImage src="https://github.com/shadcn.png" />

                    <AvatarFallback>CN</AvatarFallback>

                </AvatarContainer>

            </DropdownMenuTrigger>

            <DropdownMenuContent>

                <DropdownMenuLabel>{session?.user.email}</DropdownMenuLabel>

                <DropdownMenuSeparator />

                {session ? (
                    <Link href="/settings">
                        <DropdownMenuItem className="cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                        </DropdownMenuItem>
                    </Link>
                ) : (
                    <DropdownMenuItem disabled>
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                    </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                </DropdownMenuItem>

            </DropdownMenuContent>

        </DropdownMenu>
    );
}