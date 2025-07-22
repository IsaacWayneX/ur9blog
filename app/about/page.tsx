import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "About UR9 Blog",
  description: "Learn more about our blog and our mission to share amazing stories.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
            <p className="text-xl text-gray-600">
              Sharing stories that inspire, educate, and connect people around the world
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 mb-6">
                We believe in the power of storytelling to bridge cultures, inspire adventures, and share knowledge. Our
                blog is a platform where diverse voices come together to explore topics ranging from travel and
                technology to lifestyle and culture.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Cover</h2>
              <ul className="text-gray-700 space-y-2 mb-6">
                <li>• Travel destinations and cultural experiences</li>
                <li>• Technology trends and innovations</li>
                <li>• Lifestyle tips and personal development</li>
                <li>• Photography and visual storytelling</li>
                <li>• Architecture and urban exploration</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Team</h2>
              <p className="text-gray-700">
                Our team consists of passionate writers, photographers, and storytellers from around the globe. Each
                contributor brings their unique perspective and expertise to create content that resonates with our
                diverse audience.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
