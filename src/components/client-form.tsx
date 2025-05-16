"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

// Define the form schema
const formSchema = z.object({
  // Basic Information
  firmaAdi: z.string().min(1, { message: "Firma adı gereklidir" }),
  sektor: z.string().min(1, { message: "Sektör gereklidir" }),
  kam: z.string().min(1, { message: "KAM gereklidir" }),
  ekip: z.string().min(1, { message: "Ekip gereklidir" }),
  lokalKontak: z.string().min(1, { message: "Lokal kontak gereklidir" }),

  // Corporate Information
  cgm: z.string().optional(),
  pcc: z.string().optional(),
  clientId: z.string().min(1, { message: "Client ID gereklidir" }),
  cariKod: z.string().optional(),
  voipNumaralari: z.string().optional(),
  tkCorpKod: z.string().optional(),
  tkYuklemeKontrol: z.string().optional(),
  firmaCorporateId: z.string().optional(),

  // Hotel Information
  yurticiOtelCapRate: z.string().optional(),
  otelKodu: z.string().optional(),
  otelKoduYukleme: z.string().optional(),
  capProfile: z.string().optional(),
  colaOrInequity: z.string().optional(),

  // Profile Management
  profileManagement: z.string().optional(),
  amexGbtMobApp: z.string().optional(),
  proactiveTravelerCare: z.string().optional(),
  ekUrunler: z.string().optional(),
  profilYapi: z.string().optional(),
  onOff: z.string().optional(),

  // EBT Services
  onlineUrun: z.string().optional(),
  ebtSelfKullanimiOlanFirmalar: z.string().optional(),
  lokalOtelListesi: z.string().optional(),
  ebtIchatUcakBileti: z.string().optional(),
  ebtDishatUcakBileti: z.string().optional(),
  ebtYurticiOtel: z.string().optional(),
  ebtYurtdisiOtel: z.string().optional(),
  ebtYurticiAracKiralama: z.string().optional(),
  ebtYurtdisiAracKiralama: z.string().optional(),

  // Additional Services
  globalOtelListesi: z.string().optional(),
  transferFiyatListesi: z.string().optional(),
  amexDeptRaporlar: z.string().optional(),

  // Invoice Information
  faturaUzerindeOlacakBilgilerUcak: z.string().optional(),
  faturaUzerindeOlacakBilgilerOtelDept: z.string().optional(),

  // Payment Methods
  odemeSekileriUcak: z.string().optional(),
  kartKomisyonuVarMi: z.string().optional(),
  odemeSekileriOtel: z.string().optional(),
  odemeSekileriArac: z.string().optional(),
  odemeSekileriVizeDiger: z.string().optional(),
  topluFatura: z.string().optional(),
  otomatikFaturaGonderim: z.string().optional(),

  // Notes and Approvals
  onaySureci: z.string().optional(),
  poFormOnayEmaili: z.string().optional(),
  tcOzelNotlar: z.string().optional(),
  anilTakipEdilecekFirmalar: z.string().optional(),
  firmalarinOnemliKritikIsimleri: z.string().optional(),
})

export function ClientForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firmaAdi: "",
      sektor: "",
      kam: "",
      ekip: "SHARED",
      lokalKontak: "",
      clientId: "",
      onOff: "OFFLINE",
      tkYuklemeKontrol: "YUKLUYOR",
      capProfile: "VAR",
      colaOrInequity: "VAR",
      ebtIchatUcakBileti: "AÇIK",
      ebtDishatUcakBileti: "AÇIK",
      ebtYurticiOtel: "AÇIK",
      ebtYurtdisiOtel: "AÇIK",
      ebtYurticiAracKiralama: "AÇIK",
      ebtYurtdisiAracKiralama: "AÇIK",
      topluFatura: "HAYIR",
      cgm: "",
      yurticiOtelCapRate: "",
      tcOzelNotlar: "",
      firmalarinOnemliKritikIsimleri: "",
    },
  })

  // Form submission handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log(values)
      toast({
        title: "Client added successfully",
        description: `${values.firmaAdi} has been added to the system.`,
      })
      setIsSubmitting(false)
      router.push("/")
    }, 1500)
  }

  // Sectors list
  const sectors = ["TOBACCO", "AUTOMATIVE", "FINANCE", "TECHNOLOGY", "HEALTHCARE", "RETAIL", "OTHER"]

  // Teams list
  const teams = ["SHARED", "DEDICATED", "HYBRID"]

  // Status options
  const statusOptions = ["ONLINE/OFFLINE", "OFFLINE", "ONLINE"]

  // Payment methods
  const paymentMethods = ["KREDI KARTLI", "VADELI-15 GUN", "VADELI-30 GUN", "MUSTERI ODEMELI", "ACENTA ODEMELI"]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>

        <Button type="submit" form="client-form" disabled={isSubmitting} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          {isSubmitting ? "Saving..." : "Save Client"}
        </Button>
      </div>

      <Form {...form}>
        <form id="client-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="corporate">Corporate</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
            </TabsList>

            {/* Basic Information Tab */}
            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firmaAdi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Firma Adı*</FormLabel>
                          <FormControl>
                            <Input placeholder="Firma adını giriniz" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="sektor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sektör*</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sektör seçiniz" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {sectors.map((sector) => (
                                <SelectItem key={sector} value={sector}>
                                  {sector}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="kam"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>KAM*</FormLabel>
                          <FormControl>
                            <Input placeholder="KAM adını giriniz" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ekip"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ekip*</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Ekip seçiniz" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {teams.map((team) => (
                                <SelectItem key={team} value={team}>
                                  {team}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="lokalKontak"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lokal Kontak*</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Lokal kontak bilgilerini giriniz"
                            className="min-h-[100px]"
                            value={field.value || ""}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            name={field.name}
                            ref={field.ref}
                          />
                        </FormControl>
                        <FormDescription>
                          Birden fazla kontak için her satıra bir kontak bilgisi giriniz.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="clientId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Client ID*</FormLabel>
                          <FormControl>
                            <Input placeholder="Client ID giriniz" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="voipNumaralari"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>VOIP Numaraları</FormLabel>
                          <FormControl>
                            <Input placeholder="VOIP numaralarını giriniz" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Corporate Information Tab */}
            <TabsContent value="corporate">
              <Card>
                <CardHeader>
                  <CardTitle>Corporate Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="cgm"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CGM</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="CGM bilgilerini giriniz"
                              className="min-h-[80px]"
                              value={field.value || ""}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              name={field.name}
                              ref={field.ref}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="pcc"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>PCC</FormLabel>
                          <FormControl>
                            <Input placeholder="PCC giriniz" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cariKod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cari Kod</FormLabel>
                          <FormControl>
                            <Input placeholder="Cari kod giriniz" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="tkCorpKod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>TK Corp Kod</FormLabel>
                          <FormControl>
                            <Input placeholder="TK Corp Kod giriniz" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="tkYuklemeKontrol"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>TK Yükleme Kontrol</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seçiniz" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="YUKLUYOR">YUKLUYOR</SelectItem>
                              <SelectItem value="YUKLEMIYOR">YUKLEMIYOR</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="firmaCorporateId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Firma Corporate ID</FormLabel>
                          <FormControl>
                            <Input placeholder="Firma Corporate ID giriniz" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="yurticiOtelCapRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Yurtiçi Otel Cap Rate</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Yurtiçi Otel Cap Rate bilgilerini giriniz"
                              className="min-h-[80px]"
                              value={field.value || ""}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              name={field.name}
                              ref={field.ref}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="otelKodu"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Otel Kodu</FormLabel>
                            <FormControl>
                              <Input placeholder="Otel kodu giriniz" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="otelKoduYukleme"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Otel Kodu Yükleme</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Seçiniz" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="EVET">EVET</SelectItem>
                                <SelectItem value="HAYIR">HAYIR</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Management Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="capProfile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CAP Profile</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seçiniz" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="VAR">VAR</SelectItem>
                              <SelectItem value="YOK">YOK</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="colaOrInequity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>COLA or INEQUITY</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seçiniz" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="VAR">VAR</SelectItem>
                              <SelectItem value="YOK">YOK</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="profileManagement"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Profile Management</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seçiniz" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="CONNECT PROFILE">CONNECT PROFILE</SelectItem>
                              <SelectItem value="SABRE PROFILE">SABRE PROFILE</SelectItem>
                              <SelectItem value="VAR">VAR</SelectItem>
                              <SelectItem value="YOK">YOK</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="profilYapi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Profil Yapı</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seçiniz" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="CONNECT PROFILE">CONNECT PROFILE</SelectItem>
                              <SelectItem value="ADVANCE FORMAT">ADVANCE FORMAT</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="amexGbtMobApp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amex GBT Mob App</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seçiniz" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="VAR">VAR</SelectItem>
                              <SelectItem value="YOK">YOK</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="proactiveTravelerCare"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Proactive Traveler Care/GTR</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seçiniz" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="VAR">VAR</SelectItem>
                              <SelectItem value="YOK">YOK</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ekUrunler"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ek Ürünler</FormLabel>
                          <FormControl>
                            <Input placeholder="Ek ürünleri giriniz" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="onOff"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ON/OFF</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seçiniz" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {statusOptions.map((status) => (
                                <SelectItem key={status} value={status}>
                                  {status}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Services Tab */}
            <TabsContent value="services">
              <Card>
                <CardHeader>
                  <CardTitle>EBT Services</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="onlineUrun"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Online Ürün</FormLabel>
                          <FormControl>
                            <Input placeholder="Online ürün giriniz" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ebtSelfKullanimiOlanFirmalar"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>EBT Self Kullanımı</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seçiniz" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="VAR">VAR</SelectItem>
                              <SelectItem value="YOK">YOK</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="ebtIchatUcakBileti"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>İçhat Uçak Bileti</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seçiniz" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="AÇIK">AÇIK</SelectItem>
                              <SelectItem value="KAPALI">KAPALI</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ebtDishatUcakBileti"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dışhat Uçak Bileti</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seçiniz" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="AÇIK">AÇIK</SelectItem>
                              <SelectItem value="KAPALI">KAPALI</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ebtYurticiOtel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Yurtiçi Otel</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seçiniz" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="AÇIK">AÇIK</SelectItem>
                              <SelectItem value="KAPALI">KAPALI</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ebtYurtdisiOtel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Yurtdışı Otel</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seçiniz" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="AÇIK">AÇIK</SelectItem>
                              <SelectItem value="KAPALI">KAPALI</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ebtYurticiAracKiralama"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Yurtiçi Araç Kiralama</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seçiniz" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="AÇIK">AÇIK</SelectItem>
                              <SelectItem value="KAPALI">KAPALI</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ebtYurtdisiAracKiralama"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Yurtdışı Araç Kiralama</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seçiniz" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="AÇIK">AÇIK</SelectItem>
                              <SelectItem value="KAPALI">KAPALI</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="lokalOtelListesi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lokal Otel Listesi</FormLabel>
                          <FormControl>
                            <Input placeholder="Lokal otel listesi giriniz" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="globalOtelListesi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Global Otel Listesi</FormLabel>
                          <FormControl>
                            <Input placeholder="Global otel listesi giriniz" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="transferFiyatListesi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Transfer Fiyat Listesi</FormLabel>
                          <FormControl>
                            <Input placeholder="Transfer fiyat listesi giriniz" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="amexDeptRaporlar"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amex Dept. Raporlar</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seçiniz" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="VAR">VAR</SelectItem>
                              <SelectItem value="YOK">YOK</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payment Tab */}
            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <CardTitle>Payment & Invoice Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="faturaUzerindeOlacakBilgilerUcak"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fatura Üzerinde Olacak Bilgiler (Uçak)</FormLabel>
                          <FormControl>
                            <Input placeholder="Bilgileri giriniz" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="faturaUzerindeOlacakBilgilerOtelDept"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fatura Üzerinde Olacak Bilgiler (Otel Dept)</FormLabel>
                          <FormControl>
                            <Input placeholder="Bilgileri giriniz" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="odemeSekileriUcak"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ödeme Şekilleri (Uçak)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seçiniz" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {paymentMethods.map((method) => (
                                <SelectItem key={method} value={method}>
                                  {method}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="kartKomisyonuVarMi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kart Komisyonu Var Mı?</FormLabel>
                          <FormControl>
                            <Input placeholder="Kart komisyonu bilgisi giriniz" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="odemeSekileriOtel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ödeme Şekilleri (Otel)</FormLabel>
                          <FormControl>
                            <Input placeholder="Ödeme şekli giriniz" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="odemeSekileriArac"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ödeme Şekilleri (Araç)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seçiniz" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {paymentMethods.map((method) => (
                                <SelectItem key={method} value={method}>
                                  {method}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="odemeSekileriVizeDiger"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ödeme Şekilleri (Vize-Diğer)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seçiniz" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {paymentMethods.map((method) => (
                                <SelectItem key={method} value={method}>
                                  {method}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="topluFatura"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Toplu Fatura</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seçiniz" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="EVET">EVET</SelectItem>
                              <SelectItem value="HAYIR">HAYIR</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="otomatikFaturaGonderim"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Otomatik Fatura Gönderim</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seçiniz" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="VAR">VAR</SelectItem>
                              <SelectItem value="YOK">YOK</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="onaySureci"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Onay Süreci</FormLabel>
                          <FormControl>
                            <Input placeholder="Onay süreci bilgisi giriniz" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="poFormOnayEmaili"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>PO/Form/Onay Emaili</FormLabel>
                          <FormControl>
                            <Input placeholder="Email bilgisi giriniz" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <FormField
                      control={form.control}
                      name="tcOzelNotlar"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>TC Özel Notlar</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Özel notları giriniz"
                              className="min-h-[80px]"
                              value={field.value || ""}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              name={field.name}
                              ref={field.ref}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="anilTakipEdilecekFirmalar"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Anıl Takip Edilecek Firmalar</FormLabel>
                          <FormControl>
                            <Input placeholder="Bilgi giriniz" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="firmalarinOnemliKritikIsimleri"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Firmaların Önemli Kritik İsimleri</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Önemli isimleri giriniz"
                              className="min-h-[80px]"
                              value={field.value || ""}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              name={field.name}
                              ref={field.ref}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end mt-6">
            <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              {isSubmitting ? "Saving..." : "Save Client"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
