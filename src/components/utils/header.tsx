import Avatar from '@/components/utils/avatar';
import ThemeToggle from '@/components/utils/theme-toggle';
import ReadFamilies from '../family/read-families';

export default function Header() {

    return (

        <header className="border-b">

            <nav className="flex items-center justify-between p-6">

                <div className="flex">

                    <ReadFamilies />

                </div>

                <div className="flex gap-6">

                    <ThemeToggle />

                    <Avatar />

                </div>

            </nav>

        </header>
    );
}
