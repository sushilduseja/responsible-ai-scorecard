"use client";

import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";

const complianceData = [
  { framework: "EU AI Act", score: 85, target: 90 },
  { framework: "PAI", score: 92, target: 90 },
  { framework: "IEEE", score: 78, target: 80 },
  { framework: "Google AI", score: 88, target: 90 },
];

const trendData = [
  { date: "Jan", score: 65 },
  { date: "Feb", score: 70 },
  { date: "Mar", score: 72 },
  { date: "Apr", score: 78 },
  { date: "May", score: 82 },
  { date: "Jun", score: 85 },
];

const chartConfig = {
  score: {
    label: "Score",
    color: "hsl(var(--primary))",
  },
  target: {
    label: "Target",
    color: "hsl(var(--muted-foreground))",
  },
};

export default function DashboardPage() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Overall Compliance</CardTitle>
          <CardDescription>Across all frameworks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold">86%</span>
          </div>
          <Progress value={86} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-1">
            4% increase from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Active Assessments</CardTitle>
          <CardDescription>In-progress evaluations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">3</div>
          <p className="text-xs text-muted-foreground mt-1">
            1 assessment requires attention
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">High-Risk Gaps</CardTitle>
          <CardDescription>Urgent items to address</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">8</div>
          <p className="text-xs text-muted-foreground mt-1">
            In 'Model X' documentation
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Reports Generated</CardTitle>
          <CardDescription>Total reports this quarter</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">12</div>
          <p className="text-xs text-muted-foreground mt-1">
            5 scheduled for next month
          </p>
        </CardContent>
      </Card>

      <Card className="sm:col-span-2 lg:col-span-2">
        <CardHeader>
          <CardTitle className="font-headline">Compliance Score by Framework</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <BarChart accessibilityLayer data={complianceData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="framework"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="score" fill="var(--color-score)" radius={4} />
              <Bar dataKey="target" fill="var(--color-target)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="sm:col-span-2 lg:col-span-2">
        <CardHeader>
          <CardTitle className="font-headline">Compliance Trend</CardTitle>
          <CardDescription>Overall score improvement over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <LineChart accessibilityLayer data={trendData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="score"
                stroke="var(--color-score)"
                strokeWidth={2}
                dot={true}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
