'use client';

import { useState } from 'react';
import type { Step } from '@/lib/steps';

interface StepCardProps {
  step: Step;
  isDone: boolean;
  isAvailable: boolean;
  onMarkStep: (stepId: number, txRef: `0x${string}`, memo: `0x${string}`) => Promise<void>;
  provingTxHash?: `0x${string}`;
}

export function StepCard({ step, isDone, isAvailable, onMarkStep, provingTxHash }: StepCardProps) {
  const [txRef, setTxRef] = useState(provingTxHash ?? '');
  const [isMarking, setIsMarking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isLocked = !isAvailable && !isDone;

  async function handleMark() {
    if (!txRef.startsWith('0x') || txRef.length !== 66) {
      setError('Paste a valid 0x-prefixed tx hash (66 chars)');
      return;
    }
    setError(null);
    setIsMarking(true);
    try {
      await onMarkStep(step.id, txRef as `0x${string}`, '0x' + '0'.repeat(64) as `0x${string}`);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Transaction failed');
    } finally {
      setIsMarking(false);
    }
  }

  return (
    <div
      className={`border rounded-xl p-5 transition-all ${
        isDone
          ? 'border-green-500/30 bg-green-950/20'
          : isLocked
          ? 'border-gray-800 bg-gray-950 opacity-50'
          : step.isRenounce
          ? 'border-red-500/40 bg-red-950/10'
          : 'border-gray-700 bg-gray-900/50 hover:border-gray-600'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          {/* Status indicator */}
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
              isDone
                ? 'bg-green-500/20 text-green-400 border border-green-500/40'
                : isLocked
                ? 'bg-gray-800 text-gray-600 border border-gray-700'
                : step.isRenounce
                ? 'bg-red-900/30 text-red-400 border border-red-500/30'
                : 'bg-blue-900/30 text-blue-400 border border-blue-500/30'
            }`}
          >
            {isDone ? '✓' : step.specId}
          </div>

          <div>
            <div
              className={`font-semibold text-sm ${
                isDone ? 'text-white' : isLocked ? 'text-gray-600' : 'text-gray-200'
              }`}
            >
              {step.title}
              {step.isRenounce && (
                <span className="ml-2 text-xs text-red-400 font-normal">⚠ irreversible</span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span
                className={`text-xs ${
                  step.token === 'asset'
                    ? 'text-violet-400'
                    : step.token === 'stablecoin'
                    ? 'text-cyan-400'
                    : step.token === 'policy'
                    ? 'text-orange-400'
                    : 'text-yellow-400'
                }`}
              >
                {step.token === 'asset'
                  ? 'Asset'
                  : step.token === 'stablecoin'
                  ? 'Stablecoin'
                  : step.token === 'policy'
                  ? 'PolicyRegistry'
                  : 'Both tokens'}
              </span>
              <span className="text-gray-700">·</span>
              <span
                className={`text-xs ${
                  step.gasEstimate > 200_000 ? 'text-yellow-500' : 'text-gray-600'
                }`}
              >
                ~{(step.gasEstimate / 1000).toFixed(0)}k gas
                {step.gasEstimate > 200_000 && ' ⚠'}
              </span>
            </div>
          </div>
        </div>

        <a
          href={step.docAnchor}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-blue-400 text-xs shrink-0 transition-colors"
          title="View docs"
        >
          docs ↗
        </a>
      </div>

      {/* Description */}
      {!isDone && !isLocked && (
        <p className="text-gray-500 text-xs leading-relaxed mb-4">{step.description}</p>
      )}

      {/* Warning */}
      {step.warning && !isDone && (
        <div className="bg-yellow-900/10 border border-yellow-500/20 rounded-lg px-3 py-2 text-xs text-yellow-400 mb-4">
          {step.warning}
        </div>
      )}

      {/* Locked prereqs */}
      {isLocked && step.prereqs.length > 0 && (
        <div className="text-xs text-gray-700 mt-1">
          Requires steps: {step.prereqs.map((p) => p + 1).join(', ')}
        </div>
      )}

      {/* Mark done form */}
      {!isDone && isAvailable && (
        <div className="mt-3 space-y-3">
          <div>
            <label className="text-xs text-gray-500 block mb-1">
              Proving tx hash (from the B20 operation, not from markStep)
            </label>
            <input
              type="text"
              placeholder="0x..."
              value={txRef}
              onChange={(e) => setTxRef(e.target.value)}
              className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 font-mono text-xs text-white placeholder-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button
            onClick={handleMark}
            disabled={isMarking || !txRef}
            className={`w-full py-2 px-4 rounded-lg text-sm font-semibold transition-colors ${
              step.isRenounce
                ? 'bg-red-700 hover:bg-red-600 disabled:opacity-40 text-white'
                : 'bg-blue-700 hover:bg-blue-600 disabled:opacity-40 text-white'
            }`}
          >
            {isMarking ? 'Sending…' : step.isRenounce ? '⚠ Mark Renounced (irreversible)' : 'Mark Step Done'}
          </button>
        </div>
      )}

      {/* Done badge with tx link */}
      {isDone && provingTxHash && provingTxHash !== ('0x' + '0'.repeat(64) as `0x${string}`) && (
        <div className="mt-2">
          <a
            href={`https://basescan.org/tx/${provingTxHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:text-green-400 text-xs font-mono transition-colors"
          >
            Proof tx: {provingTxHash.slice(0, 12)}…{provingTxHash.slice(-6)} ↗
          </a>
        </div>
      )}
    </div>
  );
}
