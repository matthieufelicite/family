import handleSignOut from "@/actions/authentication/signout";
import { Avatar as AvatarContainer, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/auth";
import { LogOut } from "lucide-react";

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

                <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>

                    <LogOut />

                    <span>Log out</span>

                </DropdownMenuItem>

            </DropdownMenuContent>

        </DropdownMenu >
    );
}