"use client"

import { Family } from "@prisma/client";
import { createContext, useContext, useState, ReactNode } from "react";


interface FamilyContextType {

    family: Family | null;
    setFamily: (family: Family | null) => void;
}

const FamilyContext = createContext<FamilyContextType | undefined>(undefined);

export function FamilyProvider({ children }: { children: ReactNode }) {

    const [family, setFamily] = useState<Family | null>(null);

    return (

        <FamilyContext.Provider value={{ family, setFamily }}>

            {children}

        </FamilyContext.Provider>
    );
};

export function useFamily() {

    const context = useContext(FamilyContext);

    if (!context) {

        throw new Error("useFamily must be used within a FamilyProvider");
    }

    return context;
};