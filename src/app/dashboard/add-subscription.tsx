'use client'
import { useState } from 'react'

interface AddSubscriptionProps {
  onAdd: (subscription: any) => void
  onClose: () => void
}

export default function AddSubscription({ onAdd, onClose }: AddSubscriptionProps) {
  const [formData, setFormData] = useState({
    name: '',
    cost: '',
    billingCycle: 'monthly',
    nextPayment: '',
    category: 'Entertainment',
    description: ''
  })

  const categories = [
    'Entertainment', 'Productivity', 'Health & Fitness', 
    'Education', 'News & Media', 'Shopping', 'Other'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const response = await fetch('/api/subscriptions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        cost: parseFloat(formData.cost)
      })
    })

    if (response.ok) {
      const newSub = await response.json()
      onAdd(newSub)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add Subscription</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Service Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="Netflix, Spotify, etc."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Cost (£)</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.cost}
                onChange={e => setFormData({...formData, cost: e.target.value})}
                className="w-full p-2 border rounded"
                placeholder="9.99"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Billing Cycle</label>
              <select
                value={formData.billingCycle}
                onChange={e => setFormData({...formData, billingCycle: e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Next Payment</label>
              <input
                type="date"
                required
                value={formData.nextPayment}
                onChange={e => setFormData({...formData, nextPayment: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
                className="w-full p-2 border rounded"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Subscription
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}