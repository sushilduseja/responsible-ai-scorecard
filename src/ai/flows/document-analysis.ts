'use server';

/**
 * @fileOverview Analyzes uploaded documents to extract key information relevant to responsible AI frameworks.
 *
 * - analyzeDocument - A function that handles the document analysis process.
 * - AnalyzeDocumentInput - The input type for the analyzeDocument function.
 * - AnalyzeDocumentOutput - The return type for the analyzeDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeDocumentInputSchema = z.object({
  documentDataUri: z
    .string()
    .describe(
      "The document to analyze, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  framework: z.string().describe('The responsible AI framework to use for analysis.'),
});
export type AnalyzeDocumentInput = z.infer<typeof AnalyzeDocumentInputSchema>;

const AnalyzeDocumentOutputSchema = z.object({
  summary: z.string().describe('A summary of the document analysis.'),
  keyInformation: z.array(z.string()).describe('Key information extracted from the document relevant to the specified framework.'),
  gaps: z.array(z.string()).describe('Identified gaps in the document based on the framework criteria.'),
  qualityScore: z.number().describe('A score representing the quality of the document in relation to the framework.'),
  citations: z.array(z.string()).describe('A list of citations found in the document.'),
});
export type AnalyzeDocumentOutput = z.infer<typeof AnalyzeDocumentOutputSchema>;

export async function analyzeDocument(input: AnalyzeDocumentInput): Promise<AnalyzeDocumentOutput> {
  return analyzeDocumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeDocumentPrompt',
  input: {schema: AnalyzeDocumentInputSchema},
  output: {schema: AnalyzeDocumentOutputSchema},
  prompt: `You are an AI document analysis engine. You will analyze the provided document and extract key information relevant to the specified responsible AI framework.

  Document: {{media url=documentDataUri}}
  Framework: {{{framework}}}

  Your analysis should include a summary, key information, identified gaps, a quality score, and a list of citations.

  Summary:
  Key Information:
  Gaps:
  Quality Score:
  Citations:`,
});

const analyzeDocumentFlow = ai.defineFlow(
  {
    name: 'analyzeDocumentFlow',
    inputSchema: AnalyzeDocumentInputSchema,
    outputSchema: AnalyzeDocumentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
