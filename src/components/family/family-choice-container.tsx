import { readAllFamiliesFromUser } from "@/actions/families/read-all-families-from-user";
import FamilyChoice from "@/components/family/family-choice";
import { auth } from "@/lib/auth";
import { Family } from "@prisma/client";

export default async function FamilyChoiceContainer() {

    const session = await auth();

    if (!session?.user.id) return null;

    const families: Family[] = await readAllFamiliesFromUser({ id: session?.user.id });

    return (

        <FamilyChoice families={families} />
    );
}