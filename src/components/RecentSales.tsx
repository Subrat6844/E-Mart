"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"

export function RecentSales() {
  const salesData = [
    { name: "Olivia Martin", email: "olivia.martin@email.com", sale: "+$1,999.00" },
    { name: "Jackson Lee", email: "jackson.lee@email.com", sale: "+$39.00" },
    { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", sale: "+$299.00" },
    { name: "William Kim", email: "will@email.com", sale: "+$99.00" },
    { name: "Sofia Davis", email: "sofia.davis@email.com", sale: "+$39.00" },
  ]

  return (
    <div className="space-y-8">
      {salesData.map((sale, index) => (
        <motion.div
          key={sale.email}
          className="flex items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/avatars/${index + 1}.png`} alt="Avatar" />
            <AvatarFallback>{sale.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.name}</p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
          </div>
          <div className="ml-auto font-medium">{sale.sale}</div>
        </motion.div>
      ))}
    </div>
  )
}
