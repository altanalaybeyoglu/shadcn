import { ClientForm } from "@/components/client-form"

export default function AddClientPage() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Add New Client</h1>
      <ClientForm />
    </main>
  )
}
