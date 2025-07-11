"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  modelName: z.string().min(2, "Model name is required."),
  framework: z.string().min(1, "Please select a framework."),
  dataPrivacy: z.enum(["yes", "no", "partial"], {
    required_error: "You need to select an option.",
  }),
  dataPrivacyDetails: z.string().optional(),
  biasDetection: z.enum(["yes", "no"], {
    required_error: "You need to select an option.",
  }),
  biasMitigation: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const steps = [
  {
    id: 1,
    title: "Project Setup",
    description: "Tell us about your AI model and the framework you're using.",
    fields: ["modelName", "framework"],
  },
  {
    id: 2,
    title: "Data Privacy",
    description: "Questions about how user data is handled.",
    fields: ["dataPrivacy", "dataPrivacyDetails"],
  },
  {
    id: 3,
    title: "Fairness & Bias",
    description: "Evaluating the model for potential biases.",
    fields: ["biasDetection", "biasMitigation"],
  },
  {
    id: 4,
    title: "Review",
    description: "Review your answers before submitting.",
  },
];

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      modelName: "",
      framework: "",
      dataPrivacyDetails: "",
      biasMitigation: "",
    },
  });

  async function processForm(data: FormData) {
    console.log("Assessment Submitted:", data);
    alert("Assessment submitted successfully!");
    // In a real app, you would send this to your backend
  }

  type FieldName = keyof FormData;

  const nextStep = async () => {
    const fields = steps[currentStep].fields;
    const output = await form.trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      await form.handleSubmit(processForm)();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          {steps[currentStep].title}
        </CardTitle>
        <CardDescription>{steps[currentStep].description}</CardDescription>
        <Progress value={progress} className="mt-4" />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-8">
            {currentStep === 0 && (
              <>
                <FormField
                  control={form.control}
                  name="modelName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>AI Model Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Customer Churn Predictor" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="framework"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assessment Framework</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a framework" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="eu-ai-act">
                            EU AI Act Guidelines
                          </SelectItem>
                          <SelectItem value="google-ai">
                            Google AI Principles
                          </SelectItem>
                          <SelectItem value="pai-tenets">
                            Partnership on AI Tenets
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {currentStep === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="dataPrivacy"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>
                        Are you using any PII (Personally Identifiable
                        Information) in your training data?
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="yes" />
                            </FormControl>
                            <FormLabel className="font-normal">Yes</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="no" />
                            </FormControl>
                            <FormLabel className="font-normal">No</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="partial" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Partially (e.g., anonymized data)
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dataPrivacyDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Describe the measures taken to protect data privacy.
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., data anonymization, encryption, access controls..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {currentStep === 2 && (
              <>
                <FormField
                  control={form.control}
                  name="biasDetection"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>
                        Have you performed bias detection on your model?
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col sm:flex-row sm:space-x-4 sm:space-y-0"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="yes" />
                            </FormControl>
                            <FormLabel className="font-normal">Yes</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="no" />
                            </FormControl>
                            <FormLabel className="font-normal">No</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="biasMitigation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Describe the bias mitigation techniques used, if any.
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., re-weighting, adversarial debiasing, fairness constraints..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {currentStep === 3 && (
              <div>
                <h3 className="text-lg font-medium font-headline">Review Your Answers</h3>
                <div className="space-y-4 mt-4 text-sm">
                  <div>
                    <strong>Model Name:</strong> {form.watch("modelName")}
                  </div>
                  <div>
                    <strong>Framework:</strong> {form.watch("framework")}
                  </div>
                  <div>
                    <strong>Data Privacy:</strong> {form.watch("dataPrivacy")}
                  </div>
                  <div>
                    <strong>Privacy Details:</strong>{" "}
                    {form.watch("dataPrivacyDetails")}
                  </div>
                  <div>
                    <strong>Bias Detection:</strong> {form.watch("biasDetection")}
                  </div>
                  <div>
                    <strong>Bias Mitigation:</strong>{" "}
                    {form.watch("biasMitigation")}
                  </div>
                </div>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
          Previous
        </Button>
        <Button onClick={nextStep} className="bg-accent text-accent-foreground hover:bg-accent/90">
          {currentStep === steps.length - 1 ? "Submit" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  );
}
