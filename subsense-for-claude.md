# SubSense Project Analysis

**Project Structure:**
📄 next-env.d.ts
📄 next.config.ts
📄 package.json
📁 prisma/
  📄 schema.prisma
📁 public/
📄 README.md
📄 scanner.js
📁 src/
  📁 app/
    📁 api/
      📁 subscriptions/
        📄 route.ts
      📁 test/
        📄 page.tsx
    📁 dashboard/
      📄 add-subscription.tsx
      📄 page.tsx
    📄 layout.tsx
    📄 page.tsx
  📁 components/
    📄 SubSenseHero.tsx
  📁 lib/
    📄 db.ts
  📄 middleware.ts
📄 subsense-for-claude.md
📄 tsconfig.json


**Key Files Content:**
========================

## src\app\dashboard\add-subscription.tsx
```tsx
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
```

## src\app\dashboard\add-subscription.tsx
```tsx
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
```

## src\app\dashboard\page.tsx
```tsx
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
              No subscriptions yet. Click "Add Subscription" to get started.
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
```

## prisma\schema.prisma
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  clerkId   String   @unique
  email     String   @unique
  firstName String?
  lastName  String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  subscriptions Subscription[]
  
  @@map("users")
}

model Subscription {
  id          String   @id @default(cuid())
  userId      String
  name        String
  description String?
  cost        Decimal
  currency    String   @default("GBP")
  billingCycle String  // monthly, yearly, weekly
  nextPayment DateTime
  category    String
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@map("subscriptions")
}
```

## package.json
```json
{
  "name": "subsense-project",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@clerk/nextjs": "^6.31.4",
    "@prisma/client": "^6.14.0",
    "framer-motion": "^12.23.12",
    "next": "15.5.0",
    "react": "19.1.0",
    "react-dom": "19.1.0"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.5.0",
    "prisma": "^6.14.0",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}

```

