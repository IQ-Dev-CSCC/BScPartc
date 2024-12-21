import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const InvestmentPage = () => {
  const investmentOpportunities = [
    {
      title: "Tourism Sector",
      description: "Boumerdes offers great potential for tourism investments, with its beautiful coastline and rich cultural heritage.",
    },
    {
      title: "Agriculture",
      description: "The region's fertile land provides excellent opportunities for agricultural investments and food processing industries.",
    },
    {
      title: "Real Estate",
      description: "With growing urbanization, real estate development presents lucrative investment prospects in Boumerdes.",
    },
    {
      title: "Renewable Energy",
      description: "Boumerdes' climate is ideal for solar and wind energy projects, offering green investment opportunities.",
    },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#ffffff]">Investment Opportunities in Boumerdes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {investmentOpportunities.map((opportunity, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{opportunity.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{opportunity.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Investir</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default InvestmentPage

