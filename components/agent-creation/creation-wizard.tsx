"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CreationWizardProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onStepClick: (step: number) => void;
  canProceed: boolean;
  children: React.ReactNode;
}

const stepTitles = [
  "Basic Information",
  "Knowledge Base",
  "Behavior & Personality", 
  "Monetization Settings",
  "Review & Publish"
];

export function CreationWizard({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onStepClick,
  canProceed,
  children
}: CreationWizardProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Header */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle>Create AI Agent</CardTitle>
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <Progress value={progress} className="mb-4" />
          
          {/* Step Navigation */}
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
              <Button
                key={step}
                variant={step === currentStep ? "default" : step < currentStep ? "secondary" : "ghost"}
                size="sm"
                onClick={() => onStepClick(step)}
                className="flex-1 min-w-0 text-xs"
                disabled={step > currentStep}
              >
                <span className="truncate">{stepTitles[step - 1]}</span>
              </Button>
            ))}
          </div>
        </CardHeader>
      </Card>

      {/* Step Content */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{stepTitles[currentStep - 1]}</CardTitle>
          <CardDescription>
            {currentStep === 1 && "Enter basic information about your AI agent"}
            {currentStep === 2 && "Upload documents to create your agent's knowledge base"}
            {currentStep === 3 && "Define your agent's personality and behavior"}
            {currentStep === 4 && "Set up pricing and access tiers"}
            {currentStep === 5 && "Review your agent configuration before publishing"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrev}
          disabled={currentStep === 1}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        
        <Button
          onClick={onNext}
          disabled={false}
          className="flex items-center gap-2"
        >
          {currentStep === totalSteps ? "Publish Agent" : "Next"}
          {currentStep < totalSteps && <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
