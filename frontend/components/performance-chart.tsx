"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", yield: 186 },
  { month: "February", yield: 305 },
  { month: "March", yield: 237 },
  { month: "April", yield: 73 },
  { month: "May", yield: 209 },
  { month: "June", yield: 214 },
]

const chartConfig = {
  yield: {
    label: "Yield",
    color: "hsl(var(--primary))",
  },
}

export function PerformanceChart() {
  return (
    <Card className="bg-transparent shadow-none px-0">
      <CardHeader className="px-0">
        <CardTitle className="text-black">Performance</CardTitle>
        <CardDescription className="text-neutral-400">
          Showing total yield for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <ChartContainer config={chartConfig} className="h-[150px] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-neutral-600"/>
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
              className="fill-neutral-400 text-xs"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <defs>
                <linearGradient id="fillYield" x1="0" y1="0" x2="0" y2="1">
                    <stop
                        offset="5%"
                        stopColor="#714bcd"
                        stopOpacity={0.8}
                    />
                    <stop
                        offset="50%"
                        stopColor="#8f5bd9"
                        stopOpacity={0.4}
                    />
                    <stop
                        offset="95%"
                        stopColor="#a567e3"
                        stopOpacity={0.1}
                    />
                </linearGradient>
            </defs>
            <Area
              dataKey="yield"
              type="natural"
              fill="url(#fillYield)"
              fillOpacity={1}
              stroke="hsl(var(--primary))"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
} 