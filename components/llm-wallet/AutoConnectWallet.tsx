'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';
import { Button } from '../ui/button';
import {
  Check,
  Loader2,
  Wallet,
  Copy,
  AlertTriangle,
  LogOut,
} from 'lucide-react';

export function AutoConnectWallet() {
  const { isConnected, address, isConnecting } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { disconnect } = useDisconnect();
  const [connectionStatus, setConnectionStatus] = useState<
    'idle' | 'connecting' | 'connected' | 'failed'
  >('idle');
  const [copied, setCopied] = useState(false);
  const [autoReconnectAttempts, setAutoReconnectAttempts] = useState(0);

  // Format địa chỉ ví
  const formatAddress = (address: `0x${string}`) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`;

  // Sao chép địa chỉ
  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Quản lý kết nối
  useEffect(() => {
    const MAX_RECONNECT_ATTEMPTS = 1;

    if (!isConnected && !isConnecting) {
      if (autoReconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
        setConnectionStatus('idle');

        const timer = setTimeout(() => {
          openConnectModal?.();
          setConnectionStatus('connecting');
          setAutoReconnectAttempts((prev) => prev + 1);
        }, 500);

        return () => clearTimeout(timer);
      } else {
        setConnectionStatus('failed');
      }
    }

    if (isConnecting) {
      setConnectionStatus('connecting');
    }

    if (isConnected && address) {
      setConnectionStatus('connected');
      setAutoReconnectAttempts(0);
    }
  }, [
    isConnected,
    isConnecting,
    address,
    openConnectModal,
    autoReconnectAttempts,
  ]);

  // Xử lý kết nối thủ công
  const handleManualConnect = () => {
    setAutoReconnectAttempts(0);
    setConnectionStatus('connecting');
    openConnectModal?.();
  };

  // Thử kết nối lại
  const handleRetryConnection = () => {
    setAutoReconnectAttempts(0);
    setConnectionStatus('connecting');
    openConnectModal?.();
  };

  // Ngắt kết nối
  const handleDisconnect = () => {
    disconnect();
    setConnectionStatus('idle');
    setAutoReconnectAttempts(0);
  };

  // Render nội dung theo trạng thái kết nối
  const renderContent = () => {
    switch (connectionStatus) {
      // Trạng thái ban đầu
      case 'idle':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full flex items-center justify-center space-x-3 bg-yellow-50/10 text-yellow-600 p-4 rounded-xl"
          >
            <Wallet className="h-6 w-6 animate-pulse text-yellow-500" />
            <span className="text-sm font-medium text-center">
              Preparing to connect wallet...
            </span>
          </motion.div>
        );

      // Đang kết nối
      case 'connecting':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full flex items-center justify-center space-x-3 bg-blue-50/10 text-blue-600 p-4 rounded-xl"
          >
            <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
            <span className="text-sm font-medium text-center">
              Connecting to wallet...
            </span>
          </motion.div>
        );

      // Kết nối thành công
      case 'connected':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-full mx-auto bg-white/90 backdrop-blur-xl rounded-2xl border border-emerald-200/60 shadow-xl overflow-hidden relative"
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/40 to-emerald-200/40 opacity-60 pointer-events-none z-0"></div>

            {/* Nút Disconnect */}
            <button
              onClick={handleDisconnect}
              className="absolute top-2 right-2 text-emerald-600 hover:text-emerald-800 transition-colors p-2 rounded-full hover:bg-emerald-100/30"
              title="Disconnect Wallet"
            >
              <LogOut className="h-4 w-4" />
            </button>

            <div className="relative z-10 p-4">
              {/* Tiêu đề */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="bg-emerald-100/70 rounded-full p-2.5 shadow-md backdrop-blur-sm"
                  >
                    <Check className="h-5 w-5 text-emerald-700" />
                  </motion.div>

                  <h3 className="text-lg font-bold text-emerald-900/90 tracking-tight">
                    Wallet Connected
                  </h3>
                </div>

                <div className="text-xs text-emerald-700/70 font-medium tracking-tight">
                  Connected now
                </div>
              </div>

              {/* Địa chỉ ví */}
              <div className="bg-white/60 backdrop-blur-lg rounded-xl p-3 border border-emerald-100/40 shadow-sm flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-emerald-700/80 font-medium">
                    Address:
                  </span>
                  <code className="font-mono text-xs font-semibold text-emerald-900 bg-emerald-100/40 px-2 py-1 rounded-md">
                    {address
                      ? formatAddress(address as `0x${string}`)
                      : 'Not connected'}
                  </code>
                </div>

                {/* Nút sao chép */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  whileTap={{ scale: 0.9, rotate: -3 }}
                  onClick={copyAddress}
                  className="ml-2 text-emerald-600 hover:text-emerald-800 transition-all rounded-full p-1.5 hover:bg-emerald-100/40"
                  title="Copy Address"
                >
                  <div className="w-4 h-4  flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.span
                          key="copied"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          className="text-emerald-600 text-xs font-medium absolute tracking-tight"
                        >
                          Copied!
                        </motion.span>
                      ) : (
                        <Copy className="h-4 w-4 text-emerald-600/80 hover:text-emerald-800" />
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        );

      // Kết nối thất bại
      case 'failed':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full"
          >
            <div className="space-y-2">
              <Button
                variant="destructive"
                className="w-full flex items-center justify-center space-x-3 py-4"
              >
                <AlertTriangle className="h-6 w-6" />
                <span>Connection Failed. Retry</span>
              </Button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full bg-white/5 rounded-xl border border-gray-100/10 p-1"
    >
      <div className="w-full flex flex-col items-center">
        <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>

        {connectionStatus !== 'connected' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full mt-2"
          >
            <Button
              onClick={handleManualConnect}
              variant="outline"
              className="w-full flex items-center justify-center space-x-3 py-3 border-dashed"
            >
              <Wallet className="h-5 w-5" />
              <span>Manual Connect</span>
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
