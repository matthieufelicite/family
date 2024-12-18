'use client'

import Avatar from './avatar'
import FamilyChoice from './family/family-choice'

export default function Header() {

    return (

        <header className="bg-white border-b">

            <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">

                <div className="flex lg:flex-1">

                    <FamilyChoice />
                </div>

                <Avatar />
            </nav>
        </header>
    )
}
