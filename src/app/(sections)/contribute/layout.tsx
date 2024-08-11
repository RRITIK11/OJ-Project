import { AddProblemFormProvider } from "@/context/AddProblemForm";

export default function Layout({ children }: any) {
    return (
        <AddProblemFormProvider>
            {children}
        </AddProblemFormProvider>
    )

}