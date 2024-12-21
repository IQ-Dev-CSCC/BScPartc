import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const ReservePage = () => {
  const auberges = [
    { id: 1, name: "Seaside Retreat", description: "A cozy auberge with a beautiful ocean view." },
    { id: 2, name: "Mountain Lodge", description: "Nestled in the hills, perfect for nature lovers." },
    { id: 3, name: "City Center Inn", description: "Conveniently located in the heart of Boumerdes." },
    { id: 4, name: "Coastal Hideaway", description: "A secluded spot for a peaceful getaway." },
    { id: 5, name: "Historic Guesthouse", description: "Stay in a piece of Boumerdes history." },
    { id: 6, name: "Beachfront Bungalows", description: "Steps away from the Mediterranean Sea." },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Reserve in Boumerdes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {auberges.map((auberge) => (
          <Card key={auberge.id}>
            <CardHeader>
              <CardTitle>{auberge.name}</CardTitle>
              <CardDescription>{auberge.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Available rooms: 3</p>
              <p>Price: $50 - $100 per night</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={`/reserve/${auberge.id}`}>Reserve Now</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ReservePage

