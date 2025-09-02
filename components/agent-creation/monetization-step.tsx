"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X, DollarSign } from "lucide-react";
import { toast } from "sonner";

interface AccessTier {
  id: string;
  name: string;
  description: string;
  priceModel: "per_query" | "monthly_subscription" | "one_time";
  currency: string;
  amount: number;
  usageLimits: {
    queriesPerDay?: number;
    unlimited?: boolean;
  };
}

interface MonetizationStepProps {
  tiers: AccessTier[];
  onTiersUpdate: (tiers: AccessTier[]) => void;
  onValidationChange: (isValid: boolean) => void;
}

export function MonetizationStep({ 
  tiers, 
  onTiersUpdate, 
  onValidationChange 
}: MonetizationStepProps) {
  const [editingTier, setEditingTier] = useState<AccessTier | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Always ensure there's a free tier
  React.useEffect(() => {
    if (tiers.length === 0) {
      const freeTier: AccessTier = {
        id: "free",
        name: "Free Preview",
        description: "Limited interactions to try the agent",
        priceModel: "per_query",
        currency: "USDC",
        amount: 0,
        usageLimits: { queriesPerDay: 5 },
      };
      onTiersUpdate([freeTier]);
    }
  }, [tiers.length, onTiersUpdate]);

  // Separate effect for validation
  React.useEffect(() => {
    onValidationChange(tiers.length > 0);
  }, [tiers.length, onValidationChange]);

  const createNewTier = () => {
    const newTier: AccessTier = {
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      description: "",
      priceModel: "per_query",
      currency: "USDC",
      amount: 0,
      usageLimits: {},
    };
    setEditingTier(newTier);
    setIsCreating(true);
  };

  const saveTier = () => {
    if (!editingTier || !editingTier.name.trim()) {
      toast.error("Please enter a tier name");
      return;
    }

    if (isCreating) {
      onTiersUpdate([...tiers, editingTier]);
      toast.success("Tier created successfully");
    } else {
      onTiersUpdate(tiers.map(t => t.id === editingTier.id ? editingTier : t));
      toast.success("Tier updated successfully");
    }
    
    setEditingTier(null);
    setIsCreating(false);
  };

  const deleteTier = (tierId: string) => {
    if (tierId === "free") {
      toast.error("Cannot delete the free tier");
      return;
    }
    onTiersUpdate(tiers.filter(t => t.id !== tierId));
    toast.success("Tier deleted");
  };

  const editTier = (tier: AccessTier) => {
    setEditingTier({ ...tier });
    setIsCreating(false);
  };

  return (
    <div className="space-y-6">
      {/* Existing Tiers */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Access Tiers</h3>
          <Button onClick={createNewTier} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Tier
          </Button>
        </div>

        {tiers.map((tier) => (
          <Card key={tier.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {tier.name}
                    {tier.amount === 0 && <Badge variant="secondary">Free</Badge>}
                  </CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => editTier(tier)}>
                    Edit
                  </Button>
                  {tier.id !== "free" && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => deleteTier(tier.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-muted-foreground">Price</Label>
                  <p className="font-medium">
                    {tier.amount === 0 ? "Free" : `${tier.amount} ${tier.currency}`}
                    {tier.priceModel === "monthly_subscription" && "/month"}
                    {tier.priceModel === "per_query" && "/query"}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Usage Limits</Label>
                  <p className="font-medium">
                    {tier.usageLimits.unlimited 
                      ? "Unlimited" 
                      : tier.usageLimits.queriesPerDay 
                        ? `${tier.usageLimits.queriesPerDay}/day`
                        : "No limits set"
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tier Editor */}
      {editingTier && (
        <Card>
          <CardHeader>
            <CardTitle>{isCreating ? "Create New Tier" : "Edit Tier"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tierName">Tier Name *</Label>
                <Input
                  id="tierName"
                  value={editingTier.name}
                  onChange={(e) => setEditingTier({...editingTier, name: e.target.value})}
                  placeholder="e.g., Premium Access"
                />
              </div>
              <div>
                <Label htmlFor="priceModel">Price Model</Label>
                <Select
                  value={editingTier.priceModel}
                  onValueChange={(value: any) => setEditingTier({...editingTier, priceModel: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="per_query">Per Query</SelectItem>
                    <SelectItem value="monthly_subscription">Monthly Subscription</SelectItem>
                    <SelectItem value="one_time">One-time Purchase</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editingTier.description}
                onChange={(e) => setEditingTier({...editingTier, description: e.target.value})}
                placeholder="Describe what this tier includes..."
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="amount">Price</Label>
                <div className="flex">
                  <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                    <DollarSign className="h-4 w-4" />
                  </div>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={editingTier.amount}
                    onChange={(e) => setEditingTier({...editingTier, amount: parseFloat(e.target.value) || 0})}
                    className="rounded-l-none"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Select
                  value={editingTier.currency}
                  onValueChange={(value) => setEditingTier({...editingTier, currency: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USDC">USDC</SelectItem>
                    <SelectItem value="ETH">ETH</SelectItem>
                    <SelectItem value="0G">0G</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="queriesPerDay">Queries/Day</Label>
                <Input
                  id="queriesPerDay"
                  type="number"
                  value={editingTier.usageLimits.queriesPerDay || ""}
                  onChange={(e) => setEditingTier({
                    ...editingTier, 
                    usageLimits: {
                      ...editingTier.usageLimits,
                      queriesPerDay: parseInt(e.target.value) || undefined,
                      unlimited: !e.target.value
                    }
                  })}
                  placeholder="Unlimited"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setEditingTier(null);
                  setIsCreating(false);
                }}
              >
                Cancel
              </Button>
              <Button onClick={saveTier}>
                {isCreating ? "Create Tier" : "Save Changes"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info */}
      <div className="text-sm text-muted-foreground">
        <p>💡 <strong>Tip:</strong> Start with a free tier to let users try your agent, 
        then offer paid tiers for enhanced access or unlimited usage.</p>
      </div>
    </div>
  );
}
