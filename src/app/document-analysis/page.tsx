"use client";

import { useState } from "react";
import { Loader2, FileScan, ChevronRight } from "lucide-react";
import {
  analyzeDocument,
  AnalyzeDocumentOutput,
} from "@/ai/flows/document-analysis";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

export default function DocumentAnalysisPage() {
  const [file, setFile] = useState<File | null>(null);
  const [framework, setFramework] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeDocumentOutput | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const fileToDataUri = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target?.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async () => {
    if (!file || !framework) {
      toast({
        title: "Error",
        description: "Please select a file and a framework.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const documentDataUri = await fileToDataUri(file);
      const analysisResult = await analyzeDocument({
        documentDataUri,
        framework,
      });
      setResult(analysisResult);
    } catch (error) {
      console.error(error);
      toast({
        title: "Analysis Failed",
        description: "An error occurred during document analysis.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Analyze Document</CardTitle>
            <CardDescription>
              Upload a document to analyze it against a responsible AI framework.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="document">Document</Label>
              <Input
                id="document"
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="framework">Framework</Label>
              <Select onValueChange={setFramework} value={framework}>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select framework" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EU AI Act Guidelines">
                    EU AI Act Guidelines
                  </SelectItem>
                  <SelectItem value="Google AI Principles">
                    Google AI Principles
                  </SelectItem>
                  <SelectItem value="Partnership on AI Tenets">
                    Partnership on AI Tenets
                  </SelectItem>
                  <SelectItem value="IEEE Ethical Design">
                    IEEE Ethical Design
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleSubmit}
              disabled={isLoading || !file || !framework}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <FileScan className="mr-2 h-4 w-4" />
              )}
              Analyze
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <Card className="min-h-full">
          <CardHeader>
            <CardTitle className="font-headline">Analysis Results</CardTitle>
            <CardDescription>
              The extracted information will appear here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-64">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground">
                  Analyzing document...
                </p>
              </div>
            )}
            {result && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quality Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                        <span className="text-3xl font-bold">{result.qualityScore}/100</span>
                        <Progress value={result.qualityScore} className="flex-1" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{result.summary}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Key Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.keyInformation.map((info, i) => (
                        <li key={i} className="flex items-start">
                          <ChevronRight className="h-4 w-4 mt-1 mr-2 shrink-0 text-primary" />
                          <span className="text-sm">{info}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Identified Gaps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.gaps.map((gap, i) => (
                        <li key={i} className="flex items-start">
                           <ChevronRight className="h-4 w-4 mt-1 mr-2 shrink-0 text-destructive" />
                          <span className="text-sm">{gap}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                 <Card>
                  <CardHeader>
                    <CardTitle>Citations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.citations.map((citation, i) => (
                        <li key={i} className="flex items-start">
                          <ChevronRight className="h-4 w-4 mt-1 mr-2 shrink-0 text-muted-foreground" />
                          <span className="text-sm italic">{citation}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}
             {!isLoading && !result && (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                    <FileScan className="h-16 w-16 text-muted-foreground/50" />
                    <p className="mt-4 text-muted-foreground">Upload a document to begin analysis.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
