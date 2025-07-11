import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const frameworks = [
  {
    title: "Google AI Principles",
    description:
      "A set of ethical principles to guide the development and use of artificial intelligence in research and products.",
    image: "https://placehold.co/600x400.png",
    hint: "technology abstract"
  },
  {
    title: "Partnership on AI Tenets",
    description:
      "Foundational principles for a multistakeholder organization focused on AI for the benefit of people and society.",
    image: "https://placehold.co/600x400.png",
    hint: "collaboration teamwork"
  },
  {
    title: "EU AI Act Guidelines",
    description:
      "A regulatory framework for AI, categorizing applications by risk and setting requirements for high-risk systems.",
    image: "https://placehold.co/600x400.png",
    hint: "government building"
  },
  {
    title: "IEEE Ethical Design",
    description:
      "A vision for prioritizing human well-being in the design and development of autonomous and intelligent systems.",
    image: "https://placehold.co/600x400.png",
    hint: "circuit board"
  },
  {
    title: "Custom Framework",
    description:
      "Build your own framework tailored to your organization's specific needs and ethical guidelines.",
    image: "https://placehold.co/600x400.png",
    hint: "gears construction"
  },
];

export default function FrameworksPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {frameworks.map((framework) => (
        <Card key={framework.title} className="flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">
              {framework.title}
            </CardTitle>
            <CardDescription>{framework.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="aspect-video overflow-hidden rounded-md">
                <Image
                    src={framework.image}
                    alt={framework.title}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                    data-ai-hint={framework.hint}
                />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
