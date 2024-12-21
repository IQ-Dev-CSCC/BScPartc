"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, MapPinIcon } from 'lucide-react'
import { ChatBot } from '@/components/ChatBot'

const EventsPage = () => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)

  const events = [
    { id: 1, title: "Boumerdes Summer Festival", date: "July 15-20, 2023", location: "Boumerdes Beach", coordinates: { lat: 36.7570, lng: 3.4781 } },
    { id: 2, title: "Agricultural Fair", date: "September 5-7, 2023", location: "City Center", coordinates: { lat: 36.7667, lng: 3.4833 } },
    { id: 3, title: "Coastal Cleanup Day", date: "October 1, 2023", location: "Various Beaches", coordinates: { lat: 36.7570, lng: 3.4781 } },
    { id: 4, title: "Boumerdes Film Festival", date: "November 10-15, 2023", location: "Cultural Center", coordinates: { lat: 36.7623, lng: 3.4920 } },
  ]

  const openGoogleMaps = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Events in Boumerdes</h1>
      <div className="space-y-4">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="flex items-center space-x-2">
                <CalendarIcon className="h-4 w-4" />
                <span>{event.date}</span>
              </CardDescription>
              <CardDescription className="flex items-center space-x-2 mt-2">
                <MapPinIcon className="h-4 w-4" />
                <span>{event.location}</span>
              </CardDescription>
              <Button 
                className="mt-4"
                onClick={() => openGoogleMaps(event.coordinates.lat, event.coordinates.lng)}
              >
                View on Map
              </Button>
              <Button 
                className="mt-4 ml-4"
                onClick={() => setSelectedEvent(event.title)}
              >
                Get More Info
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <ChatBot />
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Card className="w-96">
            <CardHeader>
              <CardTitle>{selectedEvent}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>You've requested more information about {selectedEvent}. Please use the chat bot in the bottom right corner for assistance.</p>
            </CardContent>
            <Button className="m-4" onClick={() => setSelectedEvent(null)}>Close</Button>
          </Card>
        </div>
      )}
    </div>
  )
}

export default EventsPage

