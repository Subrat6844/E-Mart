"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Overview } from '@/components/Overview'
import { RecentSales } from '@/components/RecentSales'
import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function DashboardPage() {
  return (
    <motion.div
      className="space-y-4 p-8"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      <motion.div variants={fadeInUp} className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
      </motion.div>
      <motion.div variants={fadeInUp} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Revenue", value: "$45,231.89", change: "+20.1% from last month" },
          { title: "Subscriptions", value: "+2350", change: "+180.1% from last month" },
          { title: "Sales", value: "+12,234", change: "+19% from last month" },
          { title: "Active Now", value: "+573", change: "+201 since last hour" },
        ].map((item, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
                <p className="text-xs text-muted-foreground">{item.change}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      <motion.div variants={fadeInUp} className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>
              You made 265 sales this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

