"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { UserForm } from "@/components/user-form"
import { UserList } from "@/components/user-list"

const UsersPage = () => {
    const [isFormOpen, setIsFormOpen] = useState(false)

    return (
        <div className="container mx-auto py-8">
            <div className="mb-8 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Kullanıcı Yönetimi</h1>
                <Button onClick={() => setIsFormOpen(true)}>Yeni Kullanıcı Ekle</Button>
            </div>

            <UserForm open={isFormOpen} onOpenChange={setIsFormOpen} />
            <UserList />
        </div>
    )
}

export default UsersPage