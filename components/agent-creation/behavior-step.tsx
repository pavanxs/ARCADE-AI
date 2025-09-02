"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";

const behaviorSchema = z.object({
  personaDescription: z.string().min(20, "Persona description must be at least 20 characters"),
  directives: z.string().optional(),
  conversationalTone: z.enum(["formal", "casual", "friendly", "professional", "empathetic"], {
    required_error: "Please select a conversational tone",
  }),
});

type BehaviorFormData = z.infer<typeof behaviorSchema>;

interface BehaviorStepProps {
  data: Partial<BehaviorFormData>;
  onUpdate: (data: Partial<BehaviorFormData>) => void;
  onValidationChange: (isValid: boolean) => void;
}

export function BehaviorStep({ data, onUpdate, onValidationChange }: BehaviorStepProps) {
  const form = useForm<BehaviorFormData>({
    resolver: zodResolver(behaviorSchema),
    defaultValues: {
      personaDescription: data.personaDescription || "",
      directives: data.directives || "",
      conversationalTone: data.conversationalTone || undefined,
    },
    mode: "onChange",
  });

  const { formState, watch } = form;
  
  // Watch for form changes and update parent
  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      onUpdate(value);
    });
    return () => subscription.unsubscribe();
  }, [watch, onUpdate]);

  // Update validation state separately
  React.useEffect(() => {
    onValidationChange(formState.isValid);
  }, [formState.isValid, onValidationChange]);

  return (
    <Form {...form}>
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="personaDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Agent Persona *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., Act as a helpful and knowledgeable financial advisor with 10+ years of experience. Be supportive but realistic about financial goals..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Define how your agent should behave and what personality it should have
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="conversationalTone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Conversational Tone *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a conversational tone" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="formal">Formal - Professional and structured</SelectItem>
                  <SelectItem value="casual">Casual - Relaxed and conversational</SelectItem>
                  <SelectItem value="friendly">Friendly - Warm and approachable</SelectItem>
                  <SelectItem value="professional">Professional - Business-focused</SelectItem>
                  <SelectItem value="empathetic">Empathetic - Understanding and supportive</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="directives"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specific Directives (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., Always cite sources from the knowledge base when providing information. Never give direct financial advice without disclaimers..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Add specific rules or instructions for how your agent should respond
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Example Responses Section */}
        <div className="border rounded-lg p-4 bg-muted/50">
          <h4 className="font-medium mb-2">💡 Tips for Better Agent Behavior</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Be specific about expertise areas and limitations</li>
            <li>• Define how the agent should handle questions outside its knowledge</li>
            <li>• Consider adding personality traits that match your target audience</li>
            <li>• Include guidelines for citing sources from your knowledge base</li>
          </ul>
        </div>
      </div>
    </Form>
  );
}
