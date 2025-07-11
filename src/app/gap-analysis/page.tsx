"use client";

import { useState } from "react";
import { Loader2, Lightbulb } from "lucide-react";
import {
  gapAnalysisRecommendations,
  GapAnalysisRecommendationsOutput,
} from "@/ai/flows/gap-analysis-recommendations";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function GapAnalysisPage() {
  const [assessmentResults, setAssessmentResults] = useState("");
  const [frameworkCriteria, setFrameworkCriteria] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GapAnalysisRecommendationsOutput | null>(
    null
  );
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!assessmentResults || !frameworkCriteria) {
      toast({
        title: "Error",
        description: "Please provide assessment results and select a framework.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const analysisResult = await gapAnalysisRecommendations({
        assessmentResults,
        frameworkCriteria,
      });
      setResult(analysisResult);
    } catch (error) {
      console.error(error);
      toast({
        title: "Analysis Failed",
        description: "An error occurred during gap analysis.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      default:
        return "outline";
    }
  };


  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Gap Analysis</CardTitle>
            <CardDescription>
              Provide assessment results to get actionable recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="assessment-results">Assessment Results</Label>
              <Textarea
                id="assessment-results"
                placeholder="Paste your assessment results or a summary of findings here..."
                value={assessmentResults}
                onChange={(e) => setAssessmentResults(e.target.value)}
                rows={8}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="framework">Framework</Label>
              <Select onValueChange={setFrameworkCriteria} value={frameworkCriteria}>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select framework" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EU AI Act Criteria">
                    EU AI Act Guidelines
                  </SelectItem>
                  <SelectItem value="Google AI Principles Criteria">
                    Google AI Principles
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleSubmit}
              disabled={isLoading || !assessmentResults || !frameworkCriteria}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Lightbulb className="mr-2 h-4 w-4" />
              )}
              Get Recommendations
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <Card className="min-h-full">
          <CardHeader>
            <CardTitle className="font-headline">
              Recommendations
            </CardTitle>
            <CardDescription>
              Prioritized actions to address identified gaps will appear here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-64">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground">
                  Analyzing gaps...
                </p>
              </div>
            )}
            {result && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Gap Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{result.gapSummary}</p>
                  </CardContent>
                </Card>
                <div>
                  <h3 className="text-lg font-medium mb-2 font-headline">Action Items</h3>
                  <div className="border rounded-md overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Priority</TableHead>
                        <TableHead>Action Item</TableHead>
                        <TableHead>Implementation Guide</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {result.recommendations.map((rec, i) => (
                        <TableRow key={i}>
                          <TableCell>
                            <Badge variant={getPriorityBadgeVariant(rec.priority)}>
                              {rec.priority}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">{rec.actionItem}</TableCell>
                          <TableCell className="text-muted-foreground">{rec.implementationGuide}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  </div>
                </div>
              </div>
            )}
            {!isLoading && !result && (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                    <Lightbulb className="h-16 w-16 text-muted-foreground/50" />
                    <p className="mt-4 text-muted-foreground">Enter assessment details to generate recommendations.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
