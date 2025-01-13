'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { Button } from '../ui/button';
import { Check, Loader2, Wallet, Copy } from 'lucide-react';

export function AutoConnectWallet() {
  const { isConnected, address, isConnecting } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [connectionStatus, setConnectionStatus] = useState<
    'idle' | 'connecting' | 'connected' | 'failed'
  >('idle');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isConnected && !isConnecting) {
      setConnectionStatus('idle');

      const timer = setTimeout(() => {
        openConnectModal?.();
        setConnectionStatus('connecting');
      }, 500);

      return () => clearTimeout(timer);
    }

    if (isConnecting) {
      setConnectionStatus('connecting');
    }

    if (isConnected && address) {
      setConnectionStatus('connected');
    }
  }, [isConnected, isConnecting, address, openConnectModal]);

  // Hàm format địa chỉ ví
  const formatAddress = (address: `0x${string}`) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(address as string);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderContent = () => {
    switch (connectionStatus) {
      case 'idle':
        return (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 text-yellow-600"
          >
            <Wallet className="h-5 w-5 animate-pulse" />
            <span>Preparing to connect wallet...</span>
          </motion.div>
        );

      case 'connecting':
        return (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 text-blue-600"
          >
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Connecting to wallet...</span>
          </motion.div>
        );

      case 'connected':
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full bg-gradient-to-br from-green-50 to-green-100 border border-green-200/50 p-4 shadow-lg"
          >
            <div className="flex items-center space-x-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Check className="h-8 w-8 text-green-600 bg-green-200/50 rounded-full p-1.5" />
              </motion.div>

              <div className="flex-grow">
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg font-semibold text-green-800"
                >
                  Wallet Connected Successfully
                </motion.h3>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-2 flex items-center space-x-2"
                >
                  <div className="bg-white/60 backdrop-blur-sm px-3 py-2 rounded-lg flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Address:</span>
                    <code className="font-mono text-sm font-bold text-gray-800">
                      {formatAddress(address as `0x${string}`)}
                    </code>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={copyAddress}
                      className="ml-2 text-gray-500 hover:text-blue-500 transition-colors"
                      title="Copy Address"
                    >
                      <AnimatePresence>
                        {copied ? (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="text-green-500"
                          >
                            Copied!
                          </motion.span>
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-xs text-gray-400 self-start"
              >
                Connected just now
              </motion.div>
            </div>
          </motion.div>
        );

      case 'failed':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center space-x-2 text-red-600"
          >
            <Button
              variant="destructive"
              onClick={() => {
                openConnectModal?.();
                setConnectionStatus('connecting');
              }}
            >
              Connection Failed. Try Again
            </Button>
          </motion.div>
        );

      default:
        return null;
    }
  };

  const renderManualConnectButton = () => {
    if (connectionStatus !== 'connected') {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button onClick={openConnectModal} variant="outline" className="mt-2">
            <Wallet className="mr-2 h-4 w-4" />
            Manual Connect
          </Button>
        </motion.div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-4 bg-white/5 rounded-lg border flex items-center justify-center"
    >
      <div className="w-full flex flex-col items-center">
        <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
        {renderManualConnectButton()}
      </div>
    </motion.div>
  );
}
