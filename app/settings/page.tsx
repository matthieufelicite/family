"use client"

import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { auth } from '@/lib/auth';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Login from '@/components/pages/login-page';
import updateUser from '@/actions/users/update-user';
import { useSession } from 'next-auth/react';
import deleteUser from '@/actions/users/delete-user';

export default function Page() {

    const { data: session } = useSession();

    async function handleUpdateUser(event: React.FormEvent<HTMLFormElement>) {

        if (!session) return;

        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        await updateUser({ formData, userId: session.user.id });
    }

    async function handleDeleteUser(event: React.FormEvent<HTMLFormElement>) {

        if (!session) return;

        event.preventDefault();

        await deleteUser({ id: session.user.id });
    }

    if (!session?.user) {

        return <Login />;
    }

    return (

        <main>

            <header className='p-6'>

                <Link href='/' className={buttonVariants({ variant: 'outline', size: 'icon' })}>

                    <ArrowLeft />

                </Link>

            </header>

            <Separator />

            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">

                <div>

                    <h2 className="text-base/7 font-semibold">Profil</h2>

                    <p className="mt-1 text-sm/6 text-gray-400">Use a permanent address where you can receive mail.</p>

                </div>

                <form onSubmit={handleUpdateUser} className="md:col-span-2">

                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">

                        <div className="col-span-full">

                            <Label htmlFor='name'>Nom d'utilisateur</Label>

                            <div className="mt-2">

                                <Input id='name' name='name' type='text' autoComplete='name' defaultValue={session.user.name} />

                            </div>

                        </div>

                        <div className="col-span-full">

                            <Label htmlFor='email'>Adresse email</Label>

                            <div className="mt-2">

                                <Input id='email' name='email' type='email' autoComplete='email' defaultValue={session.user.email} />

                            </div>

                        </div>
                    </div>

                    <div className="mt-8 flex">

                        <Button type='submit'>Sauvegarder</Button>

                    </div>

                </form>

            </div>

            <Separator />

            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">

                <div>

                    <h2 className="text-base/7 font-semibold">Supprimer mon compte</h2>

                    <p className="mt-1 text-sm/6 text-gray-400">Cette action est irréversible. Toutes les informations liées à votre compte seront supprimées de manière permanente.</p>

                </div>

                <form onSubmit={handleDeleteUser} className="flex items-start md:col-span-2">

                    <Button type="submit" className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-red-400">Oui, supprimer mon compte</Button>

                </form>

            </div>

        </main>
    );
}
