"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button" // Button import'u eklendi
import { useForm } from "react-hook-form"

const companies = [
	{ id: 1, name: "Şirket A" },
	{ id: 2, name: "Şirket B" },
	{ id: 3, name: "Şirket C" },
]

interface UserFormProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function UserForm({ open, onOpenChange }: UserFormProps) {
	const form = useForm()

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>Yeni Kullanıcı Ekle</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<form className="space-y-4">
						<FormField
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Ad Soyad</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							name="company"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Firma</FormLabel>
									<Select onValueChange={field.onChange}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Firma seçiniz" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{companies.map((company) => (
												<SelectItem key={company.id} value={company.id.toString()}>
													{company.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>

						<FormField
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input type="email" {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Telefon</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<Button type="submit" className="w-full">
							Kaydet
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}