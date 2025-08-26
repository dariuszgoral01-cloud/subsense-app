import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Find user by clerkId
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const subscriptions = await prisma.subscription.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(subscriptions)
  } catch (error) {
    console.error('GET /api/subscriptions error:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, cost, billingCycle, nextPayment, category, description } = body

    // Validation
    if (!name || !cost || !billingCycle || !nextPayment || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      )
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      // Create user if doesn't exist (this should happen during sign up, but failsafe)
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email: 'user@example.com', // You'll get this from Clerk in production
        }
      })
    }

    const subscription = await prisma.subscription.create({
      data: {
        userId: user.id,
        name,
        cost: parseFloat(cost),
        billingCycle,
        nextPayment: new Date(nextPayment),
        category,
        description: description || null,
      }
    })

    return NextResponse.json(subscription, { status: 201 })
  } catch (error) {
    console.error('POST /api/subscriptions error:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}