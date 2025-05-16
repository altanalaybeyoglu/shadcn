"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Download, Filter, Search } from "lucide-react"
import { clientData } from "@/data/client-data"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ClientDetail } from "@/components/client-detail"
import type { ClientData } from "@/data/client-data"

export function ClientDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sectorFilter, setSectorFilter] = useState<string | null>(null)
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null)

  // Filter data based on search term and sector filter
  const filteredData = clientData.filter((client) => {
    const matchesSearch =
      client.firmaAdi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.sektor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.kam.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSector = sectorFilter ? client.sektor === sectorFilter : true

    return matchesSearch && matchesSector
  })

  // Get unique sectors for filter dropdown
  const sectors = Array.from(new Set(clientData.map((client) => client.sektor)))

  // Handle client selection
  const handleClientSelect = (client: ClientData) => {
    setSelectedClient(client)
  }

  // Handle back button click
  const handleBack = () => {
    setSelectedClient(null)
  }

  // If a client is selected, show the client detail view
  if (selectedClient) {
    return <ClientDetail client={selectedClient} onBack={handleBack} />
  }

  // Otherwise show the client list view
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by company, sector, or KAM..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex gap-2 hover:bg-primary/10 hover:text-primary">
                <Filter className="h-4 w-4" />
                {sectorFilter ? `Sector: ${sectorFilter}` : "Filter by Sector"}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSectorFilter(null)}>All Sectors</DropdownMenuItem>
              {sectors.map((sector) => (
                <DropdownMenuItem key={sector} onClick={() => setSectorFilter(sector)}>
                  {sector}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" className="hover:bg-accent/10 hover:text-accent">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Card'lar için */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-primary/10">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">{clientData.length}</div>
            <div className="text-sm text-primary/80">Total Clients</div>
          </CardContent>
        </Card>
        <Card className="bg-secondary/10">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-secondary">{sectors.length}</div>
            <div className="text-sm text-secondary/80">Sectors</div>
          </CardContent>
        </Card>
        <Card className="bg-accent/10">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-accent">
              {Array.from(new Set(clientData.map((client) => client.kam))).length}
            </div>
            <div className="text-sm text-accent/80">KAM Managers</div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Firma Adı</TableHead>
                <TableHead>Sektör</TableHead>
                <TableHead>KAM</TableHead>
                <TableHead>Ekip</TableHead>
                <TableHead>Lokal Kontak</TableHead>
                <TableHead>Client ID</TableHead>
                <TableHead>VOIP Numaraları</TableHead>
                <TableHead>Profil Yönetimi</TableHead>
                <TableHead>Ödeme Şekilleri</TableHead>
                <TableHead>Durum</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((client, index) => (
                  <TableRow
                    key={index}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleClientSelect(client)}
                  >
                    <TableCell className="font-medium">{client.firmaAdi}</TableCell>
                    <TableCell>{client.sektor}</TableCell>
                    <TableCell>{client.kam}</TableCell>
                    <TableCell>{client.ekip}</TableCell>
                    <TableCell className="max-w-[200px] truncate" title={client.lokalKontak}>
                      {client.lokalKontak}
                    </TableCell>
                    <TableCell>{client.clientId}</TableCell>
                    <TableCell>{client.voipNumaralari}</TableCell>
                    <TableCell>
                      {client.profileManagement === "VAR" ? (
                        <Badge className="bg-chart-1/20 text-chart-1 hover:bg-chart-1/30">VAR</Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">YOK</Badge>
                      )}
                    </TableCell>
                    <TableCell>{client.odemeSekileriUcak}</TableCell>
                    <TableCell>
                      {client.onOff === "ONLINE/OFFLINE" ? (
                        <Badge className="bg-primary/20 text-primary hover:bg-primary/30">ONLINE/OFFLINE</Badge>
                      ) : client.onOff === "OFFLINE" ? (
                        <Badge variant="outline" className="text-muted-foreground">OFFLINE</Badge>
                      ) : (
                        <Badge className="bg-secondary/20 text-secondary hover:bg-secondary/30">{client.onOff}</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} className="h-24 text-center">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        Showing {filteredData.length} of {clientData.length} clients
      </div>
    </div>
  )
}
