"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  ChevronDown,
  Search,
  ArrowLeft,
  Building,
  Users,
  CreditCard,
  Globe,
  Plane,
  Hotel,
  Car,
  FileText,
  Bell,
} from "lucide-react"
import { clientData } from "@/data/client-data"
import type { ClientData } from "@/data/client-data"
import { Badge } from "@/components/ui/badge"

export function ClientDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null)

  // Filter clients based on search term
  const filteredClients = useMemo(() => {
    return clientData.filter(
      (client) =>
        client.firmaAdi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.sektor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.kam.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [searchTerm])

  // Handle client selection
  const handleClientSelect = (client: ClientData) => {
    setSelectedClient(client)
    setSearchTerm("") // Clear search after selection
  }

  // Clear selected client
  const handleClearSelection = () => {
    setSelectedClient(null)
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Search and Selection Area */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Client Information Dashboard</h1>
              {selectedClient && (
                <Button variant="ghost" onClick={handleClearSelection} className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Selection
                </Button>
              )}
            </div>

            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clients by name, sector, or KAM..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {!selectedClient && searchTerm && (
              <DropdownMenu open={filteredClients.length > 0} onOpenChange={() => { }}>
                <DropdownMenuContent className="w-full" align="start">
                  {filteredClients.map((client) => (
                    <DropdownMenuItem
                      key={client.clientId}
                      onClick={() => handleClientSelect(client)}
                      className="flex justify-between cursor-pointer"
                    >
                      <span className="font-medium">{client.firmaAdi}</span>
                      <span className="text-muted-foreground">{client.sektor}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {!selectedClient && !searchTerm && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    Select a client
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
                  {clientData.map((client) => (
                    <DropdownMenuItem key={client.clientId} onClick={() => handleClientSelect(client)}>
                      {client.firmaAdi} - {client.sektor}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Client Information Cards */}
      {selectedClient && (
        <div className="space-y-6">
          {/* Header Card with Basic Info */}
          <Card className="border-l-4 border-l-primary">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold">{selectedClient.firmaAdi}</h2>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge>{selectedClient.sektor}</Badge>
                    <Badge variant={selectedClient.onOff === "ONLINE/OFFLINE" ? "default" : "outline"}>
                      {selectedClient.onOff}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm text-muted-foreground">Client ID</span>
                  <span className="font-medium">{selectedClient.clientId}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Contact Information */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">KAM</h3>
                  <p>{selectedClient.kam}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Team</h3>
                  <p>{selectedClient.ekip}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Local Contact</h3>
                  <p className="break-words">{selectedClient.lokalKontak}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">CGM</h3>
                  <p className="break-words">{selectedClient.cgm}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">VOIP Numbers</h3>
                  <p>{selectedClient.voipNumaralari}</p>
                </div>
              </CardContent>
            </Card>

            {/* Identification Codes */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  Identification Codes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">PCC</h3>
                  <p>{selectedClient.pcc}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Cari Kod</h3>
                  <p>{selectedClient.cariKod}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">TK Corp Kod</h3>
                  <p>{selectedClient.tkCorpKod}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Firma Corporate ID</h3>
                  <p>{selectedClient.firmaCorporateId}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">TK Yükleme Kontrol</h3>
                  <p>{selectedClient.tkYuklemeKontrol}</p>
                </div>
              </CardContent>
            </Card>

            {/* Profile Management */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Profile Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Profile Management</h3>
                  <Badge className={selectedClient.profileManagement === "VAR" ? "bg-green-100 text-green-800" : ""}>
                    {selectedClient.profileManagement}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">CAP Profile</h3>
                  <p>{selectedClient.capProfile}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">COLA or Inequity</h3>
                  <p>{selectedClient.colaOrInequity}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Profil Yapı</h3>
                  <p>{selectedClient.profilYapi}</p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Flight Payment</h3>
                  <p>{selectedClient.odemeSekileriUcak}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Hotel Payment</h3>
                  <p>{selectedClient.odemeSekileriOtel}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Car Rental Payment</h3>
                  <p>{selectedClient.odemeSekileriArac}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Visa/Other Payment</h3>
                  <p>{selectedClient.odemeSekileriVizeDiger}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Card Commission</h3>
                  <p>{selectedClient.kartKomisyonuVarMi}</p>
                </div>
              </CardContent>
            </Card>

            {/* Online Services */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Online Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                  <Badge className={selectedClient.onOff === "ONLINE/OFFLINE" ? "bg-primary/20 text-primary" : ""}>
                    {selectedClient.onOff}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Online Product</h3>
                  <p>{selectedClient.onlineUrun}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">AMEX GBT Mobile App</h3>
                  <p>{selectedClient.amexGbtMobApp}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Proactive Traveler Care</h3>
                  <p>{selectedClient.proactiveTravelerCare}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">EBT Self Usage</h3>
                  <p>{selectedClient.ebtSelfKullanimiOlanFirmalar}</p>
                </div>
              </CardContent>
            </Card>

            {/* Travel Services */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Plane className="h-5 w-5 text-primary" />
                  Travel Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Domestic Flight</h3>
                    <Badge variant={selectedClient.ebtIchatUcakBileti === "AÇIK" ? "default" : "outline"}>
                      {selectedClient.ebtIchatUcakBileti}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">International Flight</h3>
                    <Badge variant={selectedClient.ebtDishatUcakBileti === "AÇIK" ? "default" : "outline"}>
                      {selectedClient.ebtDishatUcakBileti}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Domestic Hotel</h3>
                    <Badge variant={selectedClient.ebtYurticiOtel === "AÇIK" ? "default" : "outline"}>
                      {selectedClient.ebtYurticiOtel}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">International Hotel</h3>
                    <Badge variant={selectedClient.ebtYurtdisiOtel === "AÇIK" ? "default" : "outline"}>
                      {selectedClient.ebtYurtdisiOtel}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Domestic Car Rental</h3>
                    <Badge variant={selectedClient.ebtYurticiAracKiralama === "AÇIK" ? "default" : "outline"}>
                      {selectedClient.ebtYurticiAracKiralama}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">International Car Rental</h3>
                    <Badge variant={selectedClient.ebtYurtdisiAracKiralama === "AÇIK" ? "default" : "outline"}>
                      {selectedClient.ebtYurtdisiAracKiralama}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hotel Information */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Hotel className="h-5 w-5 text-primary" />
                  Hotel Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Hotel Code</h3>
                  <p>{selectedClient.otelKodu}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Hotel Code Loading</h3>
                  <p>{selectedClient.otelKoduYukleme}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Domestic Hotel Cap Rate</h3>
                  <p className="break-words">{selectedClient.yurticiOtelCapRate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Local Hotel List</h3>
                  <p>{selectedClient.lokalOtelListesi}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Global Hotel List</h3>
                  <p>{selectedClient.globalOtelListesi}</p>
                </div>
              </CardContent>
            </Card>

            {/* Car Rental & Transfer */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-primary" />
                  Car Rental & Transfer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Transfer Price List</h3>
                  <p className="break-words">{selectedClient.transferFiyatListesi}</p>
                </div>
              </CardContent>
            </Card>

            {/* Invoicing & Reporting */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Invoicing & Reporting
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Flight Invoice Information</h3>
                  <p>{selectedClient.faturaUzerindeOlacakBilgilerUcak || "N/A"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Hotel/Dept Invoice Information</h3>
                  <p>{selectedClient.faturaUzerindeOlacakBilgilerOtelDept || "N/A"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Bulk Invoice</h3>
                  <p>{selectedClient.topluFatura}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Automatic Invoice Delivery</h3>
                  <p>{selectedClient.otomatikFaturaGonderim}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">AMEX Dept Reports</h3>
                  <p>{selectedClient.amexDeptRaporlar}</p>
                </div>
              </CardContent>
            </Card>

            {/* Approval Process */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Approval Process
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Approval Process</h3>
                  <p>{selectedClient.onaySureci || "N/A"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">PO Form Approval Email</h3>
                  <p>{selectedClient.poFormOnayEmaili || "N/A"}</p>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Additional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Additional Products</h3>
                  <p>{selectedClient.ekUrunler || "N/A"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">TC Special Notes</h3>
                  <p>{selectedClient.tcOzelNotlar || "N/A"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Firms to be Followed by Anıl</h3>
                  <p>{selectedClient.anilTakipEdilecekFirmalar || "N/A"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Important/Critical Names of Firms</h3>
                  <p>{selectedClient.firmalarinOnemliKritikIsimleri || "N/A"}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* No Client Selected State */}
      {!selectedClient && (
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <Building className="h-16 w-16 text-muted-foreground/30 mb-4" />
          <h2 className="text-xl font-medium mb-2">No Client Selected</h2>
          <p className="text-muted-foreground max-w-md">
            Search for a client or select one from the dropdown to view their detailed information.
          </p>
        </div>
      )}
    </div>
  )
}
