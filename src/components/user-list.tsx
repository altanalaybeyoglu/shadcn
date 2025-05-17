"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface User {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  position: string;
  department: string;
}

const demoUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    company: "Şirket A",
    email: "john@example.com",
    phone: "555-0123",
    position: "Müdür",
    department: "Satış",
  },
  // Daha fazla demo kullanıcı ekleyebilirsiniz
]

export function UserList() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ad Soyad</TableHead>
            <TableHead>Firma</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>İşlemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {demoUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.company}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Button variant="outline" onClick={() => setSelectedUser(user)}>
                  Detay
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedUser && (
            <Card>
              <CardHeader>
                <CardTitle>{selectedUser.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>Firma:</strong> {selectedUser.company}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Telefon:</strong> {selectedUser.phone}</p>
                <p><strong>Pozisyon:</strong> {selectedUser.position}</p>
                <p><strong>Departman:</strong> {selectedUser.department}</p>
                <Button className="mt-4">Düzenle</Button>
              </CardContent>
            </Card>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}