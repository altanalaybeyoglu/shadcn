import { ClientDashboard } from "@/components/client-dashboard2"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function Home() {
    return (
        <main className="container mx-auto py-10 px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold">Corporate Client Management2</h1>

            </div>
            <ClientDashboard />
        </main>
    )
}
