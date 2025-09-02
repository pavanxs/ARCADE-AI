"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Bot, FileText, MessageSquare, DollarSign, Edit } from "lucide-react";

interface ReviewStepProps {
  basicInfo: {
    name?: string;
    description?: string;
    baseModel?: string;
  };
  files: any[];
  behavior: {
    personaDescription?: string;
    directives?: string;
    conversationalTone?: string;
  };
  tiers: any[];
  onEdit: (step: number) => void;
  onPublish: () => void;
  isPublishing: boolean;
}

export function ReviewStep({
  basicInfo,
  files,
  behavior,
  tiers,
  onEdit,
  onPublish,
  isPublishing
}: ReviewStepProps) {
  const [agreedToTerms, setAgreedToTerms] = React.useState(false);

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            <CardTitle className="text-lg">Basic Information</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onEdit(1)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium">{basicInfo.name || "Untitled Agent"}</h4>
              <p className="text-sm text-muted-foreground">
                {basicInfo.description || "No description provided"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {basicInfo.baseModel?.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase()) || "Not set"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Knowledge Base */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <CardTitle className="text-lg">Knowledge Base</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onEdit(2)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm">
              <strong>{files.length}</strong> document{files.length !== 1 ? 's' : ''} uploaded
            </p>
            {files.length > 0 && (
              <div className="space-y-1">
                {files.slice(0, 3).map((file, idx) => (
                  <p key={idx} className="text-sm text-muted-foreground">
                    • {file.file.name}
                  </p>
                ))}
                {files.length > 3 && (
                  <p className="text-sm text-muted-foreground">
                    • ... and {files.length - 3} more
                  </p>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Behavior & Personality */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            <CardTitle className="text-lg">Behavior & Personality</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onEdit(3)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-sm">Persona</h4>
              <p className="text-sm text-muted-foreground">
                {behavior.personaDescription?.slice(0, 150)}
                {behavior.personaDescription && behavior.personaDescription.length > 150 ? "..." : ""}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-sm">Tone</h4>
              <Badge variant="outline">
                {behavior.conversationalTone?.replace(/\b\w/g, l => l.toUpperCase()) || "Not set"}
              </Badge>
            </div>
            {behavior.directives && (
              <div>
                <h4 className="font-medium text-sm">Directives</h4>
                <p className="text-sm text-muted-foreground">
                  {behavior.directives.slice(0, 100)}
                  {behavior.directives.length > 100 ? "..." : ""}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Monetization */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            <CardTitle className="text-lg">Monetization</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onEdit(4)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm">
              <strong>{tiers.length}</strong> access tier{tiers.length !== 1 ? 's' : ''} configured
            </p>
            <div className="space-y-2">
              {tiers.map((tier, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-sm">{tier.name}</span>
                  <Badge variant={tier.amount === 0 ? "secondary" : "default"}>
                    {tier.amount === 0 ? "Free" : `${tier.amount} ${tier.currency}`}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Terms and Conditions */}
      <div className="flex items-start space-x-2">
        <Checkbox
          id="terms"
          checked={agreedToTerms}
          onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the terms and conditions
          </label>
          <p className="text-xs text-muted-foreground">
            By publishing this agent, you agree to our platform terms of service and content policy.
          </p>
        </div>
      </div>

      {/* Publish Button */}
      <div className="flex justify-center pt-4">
        <Button
          size="lg"
          onClick={onPublish}
          disabled={!agreedToTerms || isPublishing}
          className="min-w-[200px]"
        >
          {isPublishing ? "Publishing..." : "Publish Agent"}
        </Button>
      </div>
    </div>
  );
}
