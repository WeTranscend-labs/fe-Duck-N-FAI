'use client';

import { useToast } from '@/hooks/use-toast';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Copy, Check, Network, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Player } from '@lordicon/react';

import duckIcon from '@/public/assets/duck.json';

export function CustomConnectButton() {
  const { toast } = useToast();
  const playerRef = useRef<Player>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isHovered) {
      playerRef.current?.playFromBeginning();
    }
  }, [isHovered]);

  function formatAddress(address: string) {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  }

  const handleCopy = (e: React.MouseEvent, address: string) => {
    e.stopPropagation();
    navigator.clipboard
      .writeText(address)
      .then(() => {
        toast({
          title: 'Address Copied',
          description: 'DuckChain wallet address copied',
          duration: 2000,
        });

        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(() => {
        toast({
          title: 'Copy Failed',
          description: 'Unable to copy address',
          variant: 'destructive',
          duration: 2000,
        });
      });
  };

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        if (!ready) {
          return (
            <Button variant="outline" disabled>
              Connecting...
            </Button>
          );
        }

        if (!connected) {
          return (
            <Button
              onClick={openConnectModal}
              variant="default"
              className="flex items-center justify-center group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="mr-2">
                <Player
                  ref={playerRef}
                  icon={duckIcon}
                  size={28}
                  renderMode={'AUTOMATIC'}
                  state={isHovered ? 'hover' : 'idle'}
                />
              </div>
              <span className="">Connect DuckChain</span>
            </Button>
          );
        }

        if (chain.unsupported) {
          return (
            <Button
              onClick={openChainModal}
              variant="destructive"
              className="flex items-center gap-2"
            >
              <Network className="h-5 w-5" />
              <span>Unsupported Network</span>
            </Button>
          );
        }

        return (
          <div className="flex items-center space-x-2">
            {/* Network Indicator */}
            <Button
              onClick={openChainModal}
              variant="secondary"
              className="flex items-center gap-2"
            >
              <Network className="h-5 w-5 text-primary" />
              <span className="text-sm">{chain.name}</span>
            </Button>

            {/* Account Details */}
            <Button
              onClick={openAccountModal}
              variant="default"
              className="flex items-center gap-2 group"
            >
              <Zap className="h-5 w-5 group-hover:animate-spin" />
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">
                  {account.displayBalance}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-xs opacity-70">
                    {formatAddress(account.address)}
                  </span>
                  {isCopied ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <Copy
                      className="h-3 w-3 cursor-pointer opacity-50 hover:opacity-100"
                      onClick={(e) => handleCopy(e, account.address)}
                    />
                  )}
                </div>
              </div>
            </Button>
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
