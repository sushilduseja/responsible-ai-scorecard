"use client";

import { useState } from "react";
import { ShieldCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const complianceChecks = {
  "eu-ai-act": [
    { id: "1", label: "Data Governance and Management", checked: true },
    { id: "2", label: "Technical Documentation", checked: true },
    { id: "3", label: "Record-Keeping (Logging)", checked: false },
    { id: "4", label: "Transparency and Provision of Information", checked: true },
    { id: "5", label: "Human Oversight", checked: false },
    { id: "6", label: "Accuracy, Robustness, and Cybersecurity", checked: true },
  ],
  "google-ai": [
    { id: "1", label: "Be socially beneficial", checked: true },
    { id: "2", label: "Avoid creating or reinforcing unfair bias", checked: false },
    { id: "3", label: "Be built and tested for safety", checked: true },
    { id: "4", label: "Be accountable to people", checked: true },
    { id: "5", label: "Incorporate privacy design principles", checked: true },
    { id: "6", label: "Uphold high standards of scientific excellence", checked: false },
    { id: "7", label: "Be made available for uses that accord with these principles", checked: true },
  ],
};

type FrameworkKey = keyof typeof complianceChecks;

export default function CompliancePage() {
  const [framework, setFramework] = useState<FrameworkKey | "">("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<typeof complianceChecks[FrameworkKey] | null>(null);

  const handleCheck = () => {
    if (!framework) return;
    setIsLoading(true);
    setResults(null);
    setTimeout(() => {
      setResults(complianceChecks[framework as FrameworkKey]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Compliance Checker</CardTitle>
            <CardDescription>
              Select a framework to run a basic compliance check.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select onValueChange={(val) => setFramework(val as FrameworkKey)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a framework" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eu-ai-act">EU AI Act Guidelines</SelectItem>
                <SelectItem value="google-ai">Google AI Principles</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={handleCheck}
              disabled={isLoading || !framework}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <ShieldCheck className="mr-2 h-4 w-4" />
              )}
              Run Check
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2">
        <Card className="min-h-full">
          <CardHeader>
            <CardTitle className="font-headline">Checklist</CardTitle>
            <CardDescription>
              The compliance status will be shown here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-64">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground">
                  Running compliance checks...
                </p>
              </div>
            )}
            {results && (
              <div className="space-y-4">
                {results.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 rounded-md border" data-checked={item.checked}>
                    <Checkbox id={item.id} checked={item.checked} disabled />
                    <Label htmlFor={item.id} className={`flex-1 ${!item.checked ? "text-destructive" : ""}`}>
                      {item.label}
                    </Label>
                  </div>
                ))}
              </div>
            )}
            {!isLoading && !results && (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <ShieldCheck className="h-16 w-16 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">
                  Select a framework and run the check to see results.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
