'use client';

import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Anchor, ChevronDown, MapPin, OctagonAlert, Ship } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

type Props = {
  isScrolled: boolean;
};

export function CustomConnectButton() {
  const { theme, systemTheme, resolvedTheme } = useTheme();
  const { toast } = useToast();

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme, systemTheme, resolvedTheme]);

  function formatAddress(address: string) {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  }

  const handleCopy = (e: any, account: any) => {
    e.stopPropagation();
    navigator.clipboard
      .writeText(account.address)
      .then(() => {
        toast({
          title: 'Address Copied',
          description: 'Wallet address has been copied to clipboard',
          duration: 2000,
          variant: 'default',
        });
      })
      .catch((err) => {
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

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    onClick={openConnectModal}
                    variant="default"
                    className={`flex items-center justify-center group relative overflow-hidden  backdrop-blur-sm transition-all duration-300`}
                  >
                    <Anchor
                      className={`mr-2 h-4 w-4 text-white 
                      group-hover:animate-[anchor_1.5s_ease-in-out_infinite]
                      transition-transform relative z-10`}
                    />
                    <span className="truncate">Connect Wallet</span>
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    onClick={openChainModal}
                    variant="destructive"
                    className="flex items-center gap-2 px-4 py-2"
                  >
                    <OctagonAlert className="h-4 w-4" />
                    <span>Unsupported Maritime Network</span>
                  </Button>
                );
              }

              return (
                <div className="flex items-center space-x-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={openChainModal}
                        variant="secondary"
                        className={`flex items-center justify-center w-10 transition-all duration-300`}
                      >
                        <MapPin className="h-4 w-4 text-blue-500" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      sideOffset={10}
                      className="border-none"
                    >
                      <Button variant="outline">
                        <MapPin className="h-4 w-4" />
                        <span>{chain.name}</span>
                      </Button>
                    </TooltipContent>
                  </Tooltip>

                  <Button
                    onClick={openAccountModal}
                    variant="default"
                    className={`group flex items-center gap-2 relative overflow-hidden backdrop-blur-sm transition-all duration-300`}
                  >
                    <div className="relative">
                      <Ship
                        className={`h-4 w-4 text-white/80 group-hover:animate-[wave_1.5s_ease-in-out_infinite] transition-transform`}
                      />
                      <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity">
                        <div className="absolute w-2 h-0.5 bg-white/50 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:animate-[wake_1.5s_linear_infinite]"></div>
                      </div>
                    </div>
                    <div className="flex flex-col items-start">
                      <span className={`text-sm font-medium`}>
                        {account.displayBalance}
                      </span>
                      <span className={`text-xs flex items-center`}>
                        <span
                          className="cursor-copy"
                          onClick={(e) => handleCopy(e, account)}
                        >
                          {formatAddress(account.address)}
                        </span>
                      </span>
                    </div>
                    <ChevronDown className="ml-auto h-4 w-4 text-white/50" />
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
