import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { MapPin, Calendar, Banknote, Compass } from 'lucide-react'

export default function Home() {
  return (
    <div className="space-y-6">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4 text-[#fff]">Welcome to Boumerdes Explorer</h1>
        <p className="text-xl text-muted-foreground mb-8">Discover, Experience, and Invest in the Heart of Algeria</p>
        <Button asChild size="lg">
          <Link href="/discover">Start Exploring</Link>
        </Button>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2" /> Discover Boumerdes
            </CardTitle>
          </CardHeader>
          <CardContent>
            Explore the beautiful coastal city of Boumerdes, its beaches, historical sites, and local attractions.
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline">
              <Link href="/discover">Explore Map</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2" /> Reserve Your Stay
            </CardTitle>
          </CardHeader>
          <CardContent>
            Find and book accommodations, from cozy auberges to luxurious hotels, for your perfect Boumerdes getaway.
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline">
              <Link href="/reserve">Make a Reservation</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Banknote className="mr-2" /> Investment Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            Discover lucrative investment prospects in Boumerdes' growing tourism, real estate, and business sectors.
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline">
              <Link href="/investment">Explore Investments</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Compass className="mr-2" /> Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            Stay updated with local festivals, cultural events, and activities happening in and around Boumerdes.
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline">
              <Link href="/events">View Events</Link>
            </Button>
          </CardFooter>
        </Card>
      </section>

      <section className="text-center py-12">
        <h2 className="text-3xl font-bold mb-4 text-[#ffffff]">About Boumerdes Explorer</h2>
        <p className="text-lg text-muted-foreground mb-4">
          Boumerdes Explorer is your comprehensive guide to experiencing the best of Boumerdes, Algeria. 
          Whether you're a tourist looking to explore the city's beautiful coastline and rich culture, 
          an investor seeking opportunities in this growing region, or a local wanting to stay updated 
          with events and attractions, our app has everything you need to make the most of your time in Boumerdes.
        </p>
        <Button asChild>
          <Link href="/discover">Start Your Boumerdes Adventure</Link>
        </Button>
      </section>
    </div>
  )
}

