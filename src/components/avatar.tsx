import { handleSignOut } from "@/actions/authentication/signout";
import { Avatar as AvatarContainer, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

export default function Avatar() {

    return (

        <DropdownMenu>

            <DropdownMenuTrigger asChild>

                <AvatarContainer className="h-8 w-8 cursor-pointer">

                    <AvatarImage src="https://github.com/shadcn.png" />

                    <AvatarFallback>CN</AvatarFallback>

                </AvatarContainer>

            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-52">

                <DropdownMenuLabel>My Account</DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>

                    <LogOut />

                    <span>Log out</span>

                </DropdownMenuItem>

            </DropdownMenuContent>

        </DropdownMenu>
    );
}