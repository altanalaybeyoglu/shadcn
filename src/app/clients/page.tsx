import { ClientDashboard } from "@/components/client-dashboard"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function Home() {
    return (
        <main className="container mx-auto py-10 px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold">Corporate Client Management</h1>
                <Link href="clients/add-client">
                    <Button className="flex items-center gap-2">
                        <PlusCircle className="h-4 w-4" />
                        Add New Clienttttt
                    </Button>
                </Link>
            </div>
            <ClientDashboard />
        </main>
    )
}
