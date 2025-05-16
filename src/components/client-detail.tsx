"use client"
import type { ClientData } from "@/data/client-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, Phone, User } from "lucide-react"

interface ClientDetailProps {
  client: ClientData
  onBack: () => void
}

export function ClientDetail({ client, onBack }: ClientDetailProps) {
  return (
    <div className="space-y-6">
      <Button 
        variant="outline" 
        onClick={onBack} 
        className="mb-4 hover:bg-primary/10 hover:text-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to list
      </Button>

      <div className="flex flex-col md:flex-row gap-6">
        <Card className="w-full md:w-1/3 border-primary/20">
          <CardHeader className="border-b border-primary/10">
            <CardTitle className="text-primary">{client.firmaAdi}</CardTitle>
            <CardDescription className="text-primary/70">{client.sektor}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Client ID */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-primary/80">Client ID</div>
              <div className="flex items-center gap-2">
                <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                  {client.clientId}
                </Badge>
              </div>
            </div>

            {/* KAM */}
            <div className="space-y-2">
              <div className="text-sm font-medium">KAM</div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                {client.kam}
              </div>
            </div>

            {/* Lokal Kontak */}
            <div className="space-y-2">
              <div className="text-sm font-medium">Lokal Kontak</div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{client.lokalKontak}</span>
              </div>
            </div>

            {/* VOIP Numaraları */}
            <div className="space-y-2">
              <div className="text-sm font-medium">VOIP Numaraları</div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                {client.voipNumaralari}
              </div>
            </div>

            {/* Status Badge styling */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-primary/80">Status</div>
              <div>
                {client.onOff === "ONLINE/OFFLINE" ? (
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    ONLINE/OFFLINE
                  </Badge>
                ) : client.onOff === "OFFLINE" ? (
                  <Badge variant="outline" className="text-muted-foreground">
                    OFFLINE
                  </Badge>
                ) : (
                  <Badge className="bg-secondary/20 text-secondary hover:bg-secondary/30">
                    {client.onOff}
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="w-full md:w-2/3">
          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-4 bg-muted/20">
              <TabsTrigger 
                value="details"
                className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
              >
                Details
              </TabsTrigger>
              <TabsTrigger 
                value="payment"
                className="data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary"
              >
                Payment
              </TabsTrigger>
              <TabsTrigger 
                value="services"
                className="data-[state=active]:bg-accent/20 data-[state=active]:text-accent"
              >
                Services
              </TabsTrigger>
              <TabsTrigger 
                value="notes"
                className="data-[state=active]:bg-chart-1/20 data-[state=active]:text-chart-1"
              >
                Notes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4 mt-4">
              <Card className="border-primary/20">
                <CardHeader className="border-b border-primary/10">
                  <CardTitle className="text-primary">Corporate Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium">Corporate ID</div>
                      <div className="text-sm">{client.firmaCorporateId}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Cari Kod</div>
                      <div className="text-sm">{client.cariKod}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">TK Corp Kod</div>
                      <div className="text-sm">{client.tkCorpKod}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">TK Yukleme Kontrol</div>
                      <div className="text-sm">{client.tkYuklemeKontrol}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Otel Kodu</div>
                      <div className="text-sm">{client.otelKodu}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Otel Kodu Yukleme</div>
                      <div className="text-sm">{client.otelKoduYukleme}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Profile Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium">Profile Type</div>
                      <div className="text-sm">{client.profileManagement}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Profile Structure</div>
                      <div className="text-sm">{client.profilYapi}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">CAP Profile</div>
                      <div className="text-sm">{client.capProfile}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">COLA/Inequity</div>
                      <div className="text-sm">{client.colaOrInequity}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment" className="space-y-4 mt-4">
              <Card className="border-secondary/20">
                <CardHeader className="border-b border-secondary/10">
                  <CardTitle className="text-secondary">Payment Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium">Uçak Ödeme</div>
                      <div className="text-sm">{client.odemeSekileriUcak}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Otel Ödeme</div>
                      <div className="text-sm">{client.odemeSekileriOtel}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Araç Ödeme</div>
                      <div className="text-sm">{client.odemeSekileriArac}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Vize/Diğer Ödeme</div>
                      <div className="text-sm">{client.odemeSekileriVizeDiger}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Kart Komisyonu</div>
                      <div className="text-sm">{client.kartKomisyonuVarMi}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Toplu Fatura</div>
                      <div className="text-sm">{client.topluFatura}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Otomatik Fatura Gönderim</div>
                      <div className="text-sm">{client.otomatikFaturaGonderim}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Invoice Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <div className="text-sm font-medium">Fatura Üzerinde Olacak Bilgiler (Uçak)</div>
                      <div className="text-sm">{client.faturaUzerindeOlacakBilgilerUcak || "YOK"}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Fatura Üzerinde Olacak Bilgiler (Otel)</div>
                      <div className="text-sm">{client.faturaUzerindeOlacakBilgilerOtelDept || "YOK"}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="services" className="space-y-4 mt-4">
              <Card className="border-accent/20">
                <CardHeader className="border-b border-accent/10">
                  <CardTitle className="text-accent">EBT Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium">İçhat Uçak Bileti</div>
                      <div className="text-sm">{client.ebtIchatUcakBileti}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Dışhat Uçak Bileti</div>
                      <div className="text-sm">{client.ebtDishatUcakBileti}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Yurtiçi Otel</div>
                      <div className="text-sm">{client.ebtYurticiOtel}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Yurtdışı Otel</div>
                      <div className="text-sm">{client.ebtYurtdisiOtel}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Yurtiçi Araç Kiralama</div>
                      <div className="text-sm">{client.ebtYurticiAracKiralama}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Yurtdışı Araç Kiralama</div>
                      <div className="text-sm">{client.ebtYurtdisiAracKiralama}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Self Kullanım</div>
                      <div className="text-sm">{client.ebtSelfKullanimiOlanFirmalar}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Additional Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium">Amex GBT Mob App</div>
                      <div className="text-sm">{client.amexGbtMobApp}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Proactive Traveler Care</div>
                      <div className="text-sm">{client.proactiveTravelerCare}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Ek Ürünler</div>
                      <div className="text-sm">{client.ekUrunler || "YOK"}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Lokal Otel Listesi</div>
                      <div className="text-sm">{client.lokalOtelListesi}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Global Otel Listesi</div>
                      <div className="text-sm">{client.globalOtelListesi}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Transfer Fiyat Listesi</div>
                      <div className="text-sm">{client.transferFiyatListesi}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="space-y-4 mt-4">
              <Card className="border-chart-1/20">
                <CardHeader className="border-b border-chart-1/10">
                  <CardTitle className="text-chart-1">Notes & Important Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium">TC Özel Notlar</div>
                      <div className="text-sm">{client.tcOzelNotlar || "YOK"}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Anıl Takip Edilecek Firmalar</div>
                      <div className="text-sm">{client.anilTakipEdilecekFirmalar || "YOK"}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Firmaların Önemli Kritik İsimleri</div>
                      <div className="text-sm">{client.firmalarinOnemliKritikIsimleri || "YOK"}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Onay Süreci</div>
                      <div className="text-sm">{client.onaySureci}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">PO/Form/Onay Emaili</div>
                      <div className="text-sm">{client.poFormOnayEmaili || "YOK"}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
