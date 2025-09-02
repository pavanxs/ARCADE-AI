"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const basicInfoSchema = z.object({
  name: z.string().min(3, "Agent name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  baseModel: z.enum(["conversational", "task-oriented", "creative"], {
    required_error: "Please select a base model type",
  }),
});

type BasicInfoFormData = z.infer<typeof basicInfoSchema>;

interface BasicInfoStepProps {
  data: Partial<BasicInfoFormData>;
  onUpdate: (data: Partial<BasicInfoFormData>) => void;
  onValidationChange: (isValid: boolean) => void;
}

export function BasicInfoStep({ data, onUpdate, onValidationChange }: BasicInfoStepProps) {
  const form = useForm<BasicInfoFormData>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      name: data.name || "",
      description: data.description || "",
      baseModel: data.baseModel || undefined,
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Agent Name *</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Financial Advisor Bot" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe what your AI agent does and what makes it unique..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="baseModel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Base Model Type *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-1 gap-4"
                >
                  <div className="flex items-center space-x-2 border rounded-lg p-4">
                    <RadioGroupItem value="conversational" id="conversational" />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="conversational" className="font-medium">
                        Conversational
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Best for chat-based interactions and Q&A sessions
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 border rounded-lg p-4">
                    <RadioGroupItem value="task-oriented" id="task-oriented" />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="task-oriented" className="font-medium">
                        Task-Oriented
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Designed for specific tasks and structured workflows
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 border rounded-lg p-4">
                    <RadioGroupItem value="creative" id="creative" />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="creative" className="font-medium">
                        Creative
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Optimized for creative writing and content generation
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
}
