'use client'

import { useEffect, useState } from 'react'
import { Order, useOrder } from "@/context/OrderContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { OrderDetailsSkeleton } from '@/components/OrderDetailsSkeleton'
import { EmptyOrder } from '@/components/OrderNotFound'

export default function OrderDetailsPage({ params }: { params: { id: string }}) {
  const { id } = params
  const { state } = useOrder()
  const [order, setOrder] = useState<Order | null>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log(state.orders);
      
      const foundOrder = state.orders.filter(o => o._id == id)
      console.log(foundOrder);
      
      setOrder(foundOrder.length > 0 ? foundOrder[0] : null)
      setIsLoading(false)
    }

    fetchOrder()
  }, [id, state.orders])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <OrderDetailsSkeleton />
      </div>
    )
  }

  if (!order) {
    return <EmptyOrder />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <span>Order #{order._id}</span>
            <Badge variant={order.status === 'pending' ? 'secondary' : 'default'}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Shipping Address</h3>
              <p>{order.address.addressLine1}</p>
              {order.address.addressLine2 && <p>{order.address.addressLine2}</p>}
              <p>{order.address.city}, {order.address.state} {order.address.postalCode}</p>
              <p>{order.address.country}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Order Summary</h3>
              <p>Total: ${order.total.toFixed(2)}</p>
              <p>Payment Status: {order.paymentStatus}</p>
              <p>Payment Provider: {order.paymentProvider}</p>
              <p>Transaction ID: {order.paymentTransactionId}</p>
              <p>Order Date: {new Date(order.createdAt).toLocaleString()}</p>
              <p>Last Updated: {new Date(order.updatedAt).toLocaleString()}</p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold mb-4">Items</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.product._id} className="flex justify-between items-center border-b pb-4 last:border-b-0">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                        {item.size && ` | Size: ${item.size}`}
                      </p>
                      <p className="text-sm text-gray-600">Price: ${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <p className="font-medium">${item.total.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

