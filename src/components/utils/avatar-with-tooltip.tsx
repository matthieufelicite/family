import { User } from "@prisma/client";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface Props {

    user: User;
}

export default function AvatarWithTooltip({ user }: Props) {

    if (!user) return;

    return (

        <TooltipProvider>

            <Tooltip>

                <TooltipTrigger asChild>

                    <Avatar>

                        <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>

                    </Avatar>

                </TooltipTrigger>

                <TooltipContent>

                    <p>{user.name}</p>

                </TooltipContent>

            </Tooltip>

        </TooltipProvider>
    );
}