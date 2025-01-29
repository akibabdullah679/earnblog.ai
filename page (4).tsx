import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BlogPostPreview } from "@/components/blog-post-preview"
import { SearchInput } from "@/components/search-input"
import { ThreeJSBackground } from "@/components/three-js-background"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<div>Loading 3D background...</div>}>
        <ThreeJSBackground />
      </Suspense>
      <h1 className="text-4xl font-bold mb-8">Welcome to Luxury Blog Platform</h1>
      <div className="mb-8">
        <SearchInput />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Start Writing</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Share your thoughts and earn from your content.</p>
            <Button asChild className="mt-4">
              <Link href="/create-post">Create a Post</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Explore Trending Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Discover the most engaging content on our platform.</p>
            <Button asChild variant="outline" className="mt-4">
              <Link href="/trending">View Trending</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Your Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Track your earnings and blog statistics.</p>
            <Button asChild variant="outline" className="mt-4">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      <h2 className="text-2xl font-semibold mt-12 mb-6">Latest Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <BlogPostPreview />
        <BlogPostPreview />
        <BlogPostPreview />
      </div>
    </div>
  )
}

