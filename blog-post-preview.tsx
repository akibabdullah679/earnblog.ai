import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function BlogPostPreview() {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle>
          <Link href="/post/1">Blog Post Title</Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">This is a preview of the blog post content. Click to read more...</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-sm text-muted-foreground">By John Doe</span>
        <span className="text-sm text-muted-foreground">5 min read</span>
      </CardFooter>
    </Card>
  )
}

