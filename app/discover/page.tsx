/*
"use client"

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const DiscoverPage = () => {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('transport')

  const markersData = {
    transport: [
      { name: "Bus Station", position: [36.764, 3.475] },
      { name: "Train Station", position: [36.758, 3.485] }
    ],
    auberges: [
      { name: "Auberge A", position: [36.765, 3.478] },
      { name: "Auberge B", position: [36.770, 3.490] }
    ],
    restaurants: [
      { name: "Restaurant X", position: [36.762, 3.480] },
      { name: "Restaurant Y", position: [36.768, 3.482] }
    ],
    touristic: [
      { name: "Touristic Place 1", position: [36.760, 3.490] },
      { name: "Touristic Place 2", position: [36.772, 3.495] }
    ]
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && mapRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([36.7667, 3.4833], 13)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstanceRef.current)
    }
  }, [])

  useEffect(() => {
    if (mapInstanceRef.current) {
      // Clear existing markers
      mapInstanceRef.current.eachLayer((layer) => {
        if ((layer as L.Marker).getLatLng) {
          mapInstanceRef.current?.removeLayer(layer)
        }
      })

      // Add new markers for the selected category
      markersData[selectedCategory].forEach(({ name, position }) => {
        L.marker(position)
          .addTo(mapInstanceRef.current!)
          .bindPopup(name)
      })
    }
  }, [selectedCategory])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Discover Boumerdes</CardTitle>
        <CardDescription>Explore the map to find interesting places.</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ marginBottom: '10px' }}>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ padding: '8px', fontSize: '16px' }}
          >
            <option value="transport">Transport</option>
            <option value="auberges">Auberges</option>
            <option value="restaurants">Restaurants</option>
            <option value="touristic">Touristic Places</option>
          </select>
        </div>
        <div ref={mapRef} style={{ height: '500px' }} />
      </CardContent>
    </Card>
  )
}

export default DiscoverPage
*/
"use client"

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const iconUrls = {
  hotel: "https://img.icons8.com/?size=100&id=AVe9YeyAXTql&format=png&color=000000",
  museum: "https://img.icons8.com/?size=100&id=103801&format=png&color=000000",
  park: "https://example.com/park-icon.png",
  default: "https://img.icons8.com/?size=100&id=c0oWYVVz-baJ&format=png&color=000000"
};

const DiscoverPage = () => {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const [tourismData, setTourismData] = useState<any[]>([])

  useEffect(() => {
    // Fetch tourism data from the JSON file
    fetch('/tourism.json')
      .then(response => response.json())
      .then(data => {
        setTourismData(data.elements)
      })
      .catch(error => console.error('Error fetching tourism data:', error))
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && mapRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([36.7667, 3.4833], 13)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstanceRef.current)
    }

    if (mapInstanceRef.current) {
      tourismData.forEach(item => {
        if (item.type === 'node' && item.tags && item.tags.tourism) {
          const iconUrl = iconUrls[item.tags.tourism] || iconUrls.default;
          const icon = L.icon({
            iconUrl,
            iconRetinaUrl: iconUrl,
            shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });
          const marker = L.marker([item.lat, item.lon], { icon }).addTo(mapInstanceRef.current)
          marker.bindPopup(`<b>${item.tags.name || 'Unknown'}</b><br>${item.tags.tourism}`)
        }
      })
    }
  }, [tourismData])

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Discover Tourism</CardTitle>
          <CardDescription>Explore various touristic places on the map.</CardDescription>
        </CardHeader>
        <CardContent>
          <div ref={mapRef} style={{ height: '500px', width: '100%' }}></div>
          <div style={{ marginTop: '20px' }}>
            <h4>Legend</h4>
            <ul>
              <li><img src={iconUrls.hotel} alt="Hotel" /> Hotel</li> 
              <li><img src={iconUrls.museum} alt="Museum" /> Museum</li>
              <li><img src={iconUrls.park} alt="Park" /> Park</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DiscoverPage