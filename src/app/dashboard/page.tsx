'use client'
import { useEffect, useState } from 'react'
import AddSubscription from './add-subscription'

interface Subscription {
 id: string
 name: string
 cost: number
 currency: string
 billingCycle: string
 nextPayment: string
 category: string
 isActive: boolean
}

export default function DashboardPage() {
 const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
 const [loading, setLoading] = useState(true)
 const [showAddForm, setShowAddForm] = useState(false)

 useEffect(() => {
   fetch('/api/subscriptions')
     .then(r => r.json())
     .then(data => {
       setSubscriptions(data)
       setLoading(false)
     })
     .catch(err => {
       console.error('Error:', err)
       setLoading(false)
     })
 }, [])

 const totalMonthly = subscriptions.reduce((sum, sub) => sum + Number(sub.cost), 0)

 if (loading) return <div className="p-8">Loading...</div>

 return (
   <div className="p-8">
     <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
     
     {/* Overview Cards */}
     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
       <div className="bg-white p-6 rounded-lg shadow border">
         <h3 className="text-lg font-semibold text-gray-600">Monthly Cost</h3>
         <p className="text-3xl font-bold text-blue-600">£{totalMonthly.toFixed(2)}</p>
       </div>
       
       <div className="bg-white p-6 rounded-lg shadow border">
         <h3 className="text-lg font-semibold text-gray-600">Active Subscriptions</h3>
         <p className="text-3xl font-bold text-green-600">{subscriptions.length}</p>
       </div>
       
       <div className="bg-white p-6 rounded-lg shadow border">
         <h3 className="text-lg font-semibold text-gray-600">Yearly Projection</h3>
         <p className="text-3xl font-bold text-purple-600">£{(totalMonthly * 12).toFixed(2)}</p>
       </div>
     </div>

     {/* Add Subscription Button */}
     <div className="mb-6">
       <button 
         onClick={() => setShowAddForm(true)}
         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
       >
         Add Subscription
       </button>
     </div>

     {/* Subscriptions List */}
     <div className="bg-white rounded-lg shadow border">
       <div className="p-6 border-b">
         <h2 className="text-xl font-bold">Your Subscriptions</h2>
       </div>
       <div className="p-6">
         {subscriptions.length === 0 ? (
           <p className="text-gray-500 text-center py-8">
             No subscriptions yet. Click &quot;Add Subscription&quot; to get started.
           </p>
         ) : (
           <div className="space-y-4">
             {subscriptions.map(sub => (
               <div key={sub.id} className="flex justify-between items-center p-4 border rounded">
                 <div>
                   <h3 className="font-semibold">{sub.name}</h3>
                   <p className="text-gray-600">{sub.category}</p>
                 </div>
                 <div className="text-right">
                   <p className="font-semibold">£{sub.cost}/{sub.billingCycle}</p>
                   <p className="text-gray-600">Next: {new Date(sub.nextPayment).toLocaleDateString()}</p>
                 </div>
               </div>
             ))}
           </div>
         )}
       </div>
     </div>

     {/* Add Subscription Modal */}
     {showAddForm && (
       <AddSubscription 
         onAdd={(newSub) => setSubscriptions([...subscriptions, newSub])}
         onClose={() => setShowAddForm(false)}
       />
     )}
   </div>
 )
}