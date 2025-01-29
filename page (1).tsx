"use client"

import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BlogPostPreview } from "@/components/blog-post-preview"

export default function Dashboard() {
  const { user } = useAuth()

  if (!user) {
    return <div>Please log in to view your dashboard.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome, {user.name}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">$1,234.56</p>
            <p className="text-sm text-muted-foreground">Total earnings this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Blog Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">10,234</p>
            <p className="text-sm text-muted-foreground">Total views this month</p>
          </CardContent>
        </Card>
      </div>
      <h2 className="text-2xl font-semibold mt-12 mb-6">Your Recent Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <BlogPostPreview />
        <BlogPostPreview />
        <BlogPostPreview />
      </div>
    </div>
  )
}

