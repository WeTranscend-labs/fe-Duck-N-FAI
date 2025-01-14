'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { parseEther } from 'viem';
import { useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { Button } from '../ui/button';

type TransactionStatus = 'idle' | 'preparing' | 'sending' | 'success' | 'error';

const TokenTransferComponent = ({
  amount,
  toAddress,
}: {
  amount: number;
  toAddress: string;
}) => {
  const [status, setStatus] = useState<TransactionStatus>('idle');
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();
  const [error, setError] = useState<string | null>(null);

  const {
    sendTransaction,
    data: hash,
    error: sendError,
  } = useSendTransaction();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: confirmError,
  } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  useEffect(() => {
    const initiateTransfer = async () => {
      try {
        setStatus('preparing');

        const transaction = sendTransaction({
          value: parseEther(amount.toString()),
          to: toAddress as `0x${string}`,
        });

        setStatus('sending');

        if (hash) {
          setTxHash(hash);
        }
      } catch (err) {
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    };

    initiateTransfer();
  }, [amount, toAddress, sendTransaction, hash]);

  useEffect(() => {
    if (isConfirmed) {
      setStatus('success');
    }
    if (confirmError) {
      setStatus('error');
      setError(confirmError.message);
    }
  }, [isConfirmed, confirmError]);

  const getStatusIcon = () => {
    switch (status) {
      case 'preparing':
        return <Loader2 className="h-6 w-6 animate-spin text-yellow-500" />;
      case 'sending':
        return <Loader2 className="h-6 w-6 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle2 className="h-6 w-6 text-green-500" />;
      case 'error':
        return <XCircle className="h-6 w-6 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'preparing':
        return <Badge variant="default">Preparing</Badge>;
      case 'sending':
        return <Badge variant="secondary">Sending</Badge>;
      case 'success':
        return <Badge variant="default">Success</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Token Transfer</span>
          {getStatusIcon()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Amount:</span>
            <strong>{amount} ETH</strong>
          </div>
          <div className="flex justify-between">
            <span>Recipient Address:</span>
            <code className="text-sm bg-gray-100 p-1 rounded">
              {toAddress.slice(0, 6)}...{toAddress.slice(-4)}
            </code>
          </div>

          <div className="flex justify-between items-center">
            <span>Status:</span>
            {getStatusBadge()}
          </div>

          {txHash && (
            <div className="mt-2">
              <a
                href={`https://etherscan.io/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Transaction Details
              </a>
            </div>
          )}

          {error && (
            <div className="text-red-500 mt-2">
              <strong>Error:</strong> {error}
            </div>
          )}

          {status === 'success' && (
            <Button variant="outline" className="w-full mt-4">
              Complete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenTransferComponent;
