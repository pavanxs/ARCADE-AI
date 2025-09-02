"use client";

import React, { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { CreationWizard } from "@/components/agent-creation/creation-wizard";
import { BasicInfoStep } from "@/components/agent-creation/basic-info-step";
import { KnowledgeBaseStep } from "@/components/agent-creation/knowledge-base-step";
import { BehaviorStep } from "@/components/agent-creation/behavior-step";
import { MonetizationStep } from "@/components/agent-creation/monetization-step";
import { ReviewStep } from "@/components/agent-creation/review-step";
import { useAccount } from "wagmi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AgentData {
  basicInfo: {
    name?: string;
    description?: string;
    baseModel?: string;
  };
  files: Array<{ id: string; file: File; status: string; progress: number }>;
  behavior: {
    personaDescription?: string;
    directives?: string;
    conversationalTone?: string;
  };
  tiers: Array<{ id: string; name: string; description: string; price: number; currency: string; features: string[] }>;
}

export default function CreateAgent() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [canProceed, setCanProceed] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  
  const [agentData, setAgentData] = useState<AgentData>({
    basicInfo: {},
    files: [],
    behavior: {},
    tiers: [],
  });

  const totalSteps = 5;

  // Disable auth check during development
  // if (!isConnected) {
  //   return (
  //     <Layout>
  //       <div className="container mx-auto px-4 py-16 text-center">
  //         <h1 className="text-3xl font-bold mb-4">Connect Your Wallet</h1>
  //         <p className="text-muted-foreground mb-8">
  //           Please connect your wallet to create AI agents.
  //         </p>
  //       </div>
  //     </Layout>
  //   );
  // }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setCanProceed(false); // Reset validation for next step
    } else {
      handlePublish();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (step: number) => {
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Agent published successfully!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Failed to publish agent");
    } finally {
      setIsPublishing(false);
    }
  };

  const updateBasicInfo = (data: Partial<AgentData['basicInfo']>) => {
    setAgentData(prev => ({
      ...prev,
      basicInfo: { ...prev.basicInfo, ...data }
    }));
  };

  const updateFiles = (files: AgentData['files']) => {
    setAgentData(prev => ({
      ...prev,
      files
    }));
  };

  const updateBehavior = (data: Partial<AgentData['behavior']>) => {
    setAgentData(prev => ({
      ...prev,
      behavior: { ...prev.behavior, ...data }
    }));
  };

  const updateTiers = (tiers: AgentData['tiers']) => {
    setAgentData(prev => ({
      ...prev,
      tiers
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep
            data={agentData.basicInfo}
            onUpdate={updateBasicInfo}
            onValidationChange={setCanProceed}
          />
        );
      case 2:
        return (
          <KnowledgeBaseStep
            files={agentData.files}
            onFilesUpdate={updateFiles}
            onValidationChange={setCanProceed}
          />
        );
      case 3:
        return (
          <BehaviorStep
            data={agentData.behavior}
            onUpdate={updateBehavior}
            onValidationChange={setCanProceed}
          />
        );
      case 4:
        return (
          <MonetizationStep
            tiers={agentData.tiers}
            onTiersUpdate={updateTiers}
            onValidationChange={setCanProceed}
          />
        );
      case 5:
        return (
          <ReviewStep
            basicInfo={agentData.basicInfo}
            files={agentData.files}
            behavior={agentData.behavior}
            tiers={agentData.tiers}
            onEdit={setCurrentStep}
            onPublish={handlePublish}
            isPublishing={isPublishing}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <CreationWizard
          currentStep={currentStep}
          totalSteps={totalSteps}
          onNext={handleNext}
          onPrev={handlePrev}
          onStepClick={handleStepClick}
          canProceed={true}
        >
          {renderStep()}
        </CreationWizard>
      </div>
    </Layout>
  );
}
