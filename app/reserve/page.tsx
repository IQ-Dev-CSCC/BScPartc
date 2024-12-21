"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ReservePage = () => {
  const [auberges, setAuberges] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/hauberge-schemas?populate=imageList`
        );
        const data = await response.json();
        setAuberges(data.data); // Adjust based on Strapi's response structure
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#ffffff]">Reserve in Boumerdes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {auberges.map((auberge) => (
          <Card key={auberge.id}>
            <CardHeader>
              <CardTitle>{auberge.nom}</CardTitle>
              <CardDescription>{auberge.offres}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Capacity: {auberge.capacite}</p>
              <p>Availability: {auberge.availability ? 'Available' : 'Full'}</p>
              <p>Location: {auberge.adresse}</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={`https://www.google.com/maps/search/?api=1&query=${auberge.latitude},${auberge.longitude}`} target="_blank">
                  View on Map
                </Link>
              </Button>
              <p
              className='p-4'
              ></p>
              <Button asChild>
                <Link href={`/reserve/${auberge.id}`}>Reserve Now</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ReservePage;
