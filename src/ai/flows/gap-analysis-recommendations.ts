'use server';
/**
 * @fileOverview An AI agent that identifies gaps in model documentation and provides prioritized, actionable recommendations.
 *
 * - gapAnalysisRecommendations - A function that handles the gap analysis and recommendation process.
 * - GapAnalysisRecommendationsInput - The input type for the gapAnalysisRecommendations function.
 * - GapAnalysisRecommendationsOutput - The return type for the gapAnalysisRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GapAnalysisRecommendationsInputSchema = z.object({
  assessmentResults: z.string().describe('The results from a self-assessment or document analysis.'),
  frameworkCriteria: z.string().describe('The criteria of the responsible AI framework being evaluated against.'),
});
export type GapAnalysisRecommendationsInput = z.infer<typeof GapAnalysisRecommendationsInputSchema>;

const RecommendationSchema = z.object({
  priority: z.string().describe('The priority of the recommendation (e.g., High, Medium, Low).'),
  actionItem: z.string().describe('A specific action item to address the gap.'),
  implementationGuide: z.string().describe('Guidance on how to implement the action item.'),
  resourceLinks: z.array(z.string()).describe('Relevant resource links for further information.'),
  costBenefitAnalysis: z.string().describe('A brief analysis of the costs and benefits of implementing the recommendation.'),
});

const GapAnalysisRecommendationsOutputSchema = z.object({
  gapSummary: z.string().describe('A summary of the identified gaps in the model documentation.'),
  recommendations: z.array(RecommendationSchema).describe('A list of prioritized recommendations to address the gaps.'),
});
export type GapAnalysisRecommendationsOutput = z.infer<typeof GapAnalysisRecommendationsOutputSchema>;

export async function gapAnalysisRecommendations(input: GapAnalysisRecommendationsInput): Promise<GapAnalysisRecommendationsOutput> {
  return gapAnalysisRecommendationsFlow(input);
}

const gapAnalysisRecommendationsPrompt = ai.definePrompt({
  name: 'gapAnalysisRecommendationsPrompt',
  input: {schema: GapAnalysisRecommendationsInputSchema},
  output: {schema: GapAnalysisRecommendationsOutputSchema},
  prompt: `You are an AI assistant specialized in identifying gaps in AI model documentation and providing actionable recommendations based on responsible AI frameworks.

  Analyze the assessment results and framework criteria provided, and generate a gap summary and a list of prioritized recommendations.

  Assessment Results: {{{assessmentResults}}}
  Framework Criteria: {{{frameworkCriteria}}}

  Output:
  - gapSummary: A concise summary of the identified gaps in the model documentation.
  - recommendations: A list of prioritized recommendations to address the gaps, including priority, action item, implementation guide, resource links, and cost-benefit analysis.
  `,
});

const gapAnalysisRecommendationsFlow = ai.defineFlow(
  {
    name: 'gapAnalysisRecommendationsFlow',
    inputSchema: GapAnalysisRecommendationsInputSchema,
    outputSchema: GapAnalysisRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await gapAnalysisRecommendationsPrompt(input);
    return output!;
  }
);
