import Link from "next/link";
import {
  ArrowRight,
  BookCheck,
  ClipboardCheck,
  FileScan,
  Gauge,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: <BookCheck className="h-8 w-8 text-primary" />,
    title: "Framework Library",
    description:
      "Access a comprehensive library of responsible AI frameworks from leading organizations.",
    link: "/frameworks",
  },
  {
    icon: <ClipboardCheck className="h-8 w-8 text-primary" />,
    title: "Self-Assessment Wizard",
    description:
      "A guided questionnaire to evaluate your AI models and safety practices.",
    link: "/assessment",
  },
  {
    icon: <FileScan className="h-8 w-8 text-primary" />,
    title: "Document Analysis",
    description:
      "AI-powered engine to analyze documents and extract key information.",
    link: "/document-analysis",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "Compliance Checker",
    description:
      "Ensure your AI documentation meets compliance standards against various frameworks.",
    link: "/compliance",
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: "Gap Analysis",
    description:
      "Identify documentation gaps and receive prioritized, actionable recommendations.",
    link: "/gap-analysis",
  },
  {
    icon: <Gauge className="h-8 w-8 text-primary" />,
    title: "Advanced Visualization",
    description:
      "Interactive dashboards to visualize assessment results and track progress.",
    link: "/dashboard",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40 bg-card">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter font-headline mb-4">
              Build Trustworthy AI.
            </h1>
            <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mb-8">
              AI Ethics Auditor helps you navigate the complexities of
              responsible AI. Assess, analyze, and align your models with
              leading ethical frameworks.
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                A Complete Toolkit for Responsible AI
              </h2>
              <p className="max-w-[700px] mx-auto text-muted-foreground md:text-lg mt-4">
                From assessment to reporting, we've got you covered.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  className="flex flex-col hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      {feature.icon}
                      <CardTitle className="font-headline text-2xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Link href={feature.link}>
                      <Button variant="outline" className="w-full">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full bg-card border-t py-6">
        <div className="container mx-auto px-4 md:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm text-center sm:text-left">
            © 2024 AI Ethics Auditor. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground text-sm">
              Privacy
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground text-sm">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
