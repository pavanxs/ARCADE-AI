"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Wallet, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { useAccount, useBalance, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { toast } from "sonner";

interface PaymentFlowProps {
  tier: {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    priceModel: string;
    features: string[];
  };
  agentId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

type PaymentStep = "confirm" | "connecting" | "pending" | "success" | "error";

export function PaymentFlow({ tier, agentId, onSuccess, onCancel }: PaymentFlowProps) {
  const { address, isConnected } = useAccount();
  const [currentStep, setCurrentStep] = useState<PaymentStep>("confirm");
  const [transactionHash, setTransactionHash] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { data: balance } = useBalance({
    address: address,
  });

  // Mock contract write - in real implementation, this would interact with 0G Chain
  const { writeContract, isPending: isWritePending } = useWriteContract();

  const { isLoading: isTransactionLoading, isSuccess: isTransactionSuccess } = 
    useWaitForTransactionReceipt({
      hash: transactionHash as `0x${string}`,
    });

  React.useEffect(() => {
    if (isTransactionSuccess) {
      setCurrentStep("success");
      toast.success("Payment successful!");
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }
  }, [isTransactionSuccess, onSuccess]);

  const handlePayment = async () => {
    // Disable auth check during development
    // if (!isConnected) {
    //   toast.error("Please connect your wallet");
    //   return;
    // }

    setCurrentStep("connecting");
    setError("");

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock transaction hash
      const mockTxHash = "0x" + Math.random().toString(16).substr(2, 64);
      setTransactionHash(mockTxHash);
      setCurrentStep("pending");
      
      // Simulate transaction confirmation
      setTimeout(() => {
        setCurrentStep("success");
        toast.success("Payment successful!");
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }, 3000);

    } catch (err: any) {
      setError(err.message || "Payment failed");
      setCurrentStep("error");
      toast.error("Payment failed");
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "confirm":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{tier.name}</span>
                  <Badge>{tier.currency}</Badge>
                </CardTitle>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-3xl font-bold">
                    ${tier.price} {tier.currency}
                    {tier.priceModel === "monthly_subscription" && <span className="text-sm font-normal">/month</span>}
                    {tier.priceModel === "per_query" && <span className="text-sm font-normal">/query</span>}
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Included features:</h4>
                    <ul className="space-y-1">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payment Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${tier.price} {tier.currency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Fee (2.5%)</span>
                    <span>${(tier.price * 0.025).toFixed(2)} {tier.currency}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${(tier.price * 1.025).toFixed(2)} {tier.currency}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {balance && (
              <Alert>
                <Wallet className="h-4 w-4" />
                <AlertDescription>
                  Wallet Balance: {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
                </AlertDescription>
              </Alert>
            )}

            <div className="flex gap-3">
              <Button variant="outline" onClick={onCancel} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handlePayment} className="flex-1">
                <Wallet className="h-4 w-4 mr-2" />
                Pay ${(tier.price * 1.025).toFixed(2)} {tier.currency}
              </Button>
            </div>
          </div>
        );

      case "connecting":
        return (
          <div className="text-center py-8">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Connecting to Wallet</h3>
            <p className="text-muted-foreground">
              Please confirm the transaction in your wallet...
            </p>
          </div>
        );

      case "pending":
        return (
          <div className="text-center py-8">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Transaction Pending</h3>
            <p className="text-muted-foreground mb-4">
              Your payment is being processed on the blockchain...
            </p>
            {transactionHash && (
              <div className="text-xs text-muted-foreground">
                Transaction: {transactionHash.slice(0, 10)}...{transactionHash.slice(-8)}
              </div>
            )}
          </div>
        );

      case "success":
        return (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Payment Successful!</h3>
            <p className="text-muted-foreground mb-4">
              You now have access to {tier.name}
            </p>
            <div className="text-xs text-muted-foreground">
              Redirecting to chat...
            </div>
          </div>
        );

      case "error":
        return (
          <div className="text-center py-8">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Payment Failed</h3>
            <p className="text-muted-foreground mb-4">
              {error || "Something went wrong with your payment"}
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button onClick={() => setCurrentStep("confirm")}>
                Try Again
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {renderStepContent()}
    </div>
  );
}
