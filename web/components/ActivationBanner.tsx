'use client';

import { useChainId } from 'wagmi';
import { useBerylCountdown, useActivationStatus } from '@/lib/hooks';
import { BERYL_ACTIVATION } from '@/lib/addresses';

export function ActivationBanner() {
  const chainId = useChainId();
  const activation = useActivationStatus();
  const cd = useBerylCountdown();

  if (activation === 'active') return null;

  const networkName = chainId === 8453 ? 'Base Mainnet' : chainId === 84532 ? 'Base Sepolia' : `Chain ${chainId}`;
  const hasTarget = !!BERYL_ACTIVATION[chainId];

  return (
    <div className="border border-yellow-500/30 bg-yellow-900/10 rounded-xl p-5">
      <div className="flex items-start gap-4">
        <span className="text-2xl mt-0.5">⏳</span>
        <div className="flex-1">
          <div className="font-semibold text-yellow-300 mb-1">
            Awaiting Beryl activation on {networkName}
          </div>
          <p className="text-yellow-200/60 text-sm mb-3">
            B20 precompiles are not yet deployed at their canonical addresses.
            The app is fully built and ready — it will unlock automatically once the upgrade activates.
          </p>

          {hasTarget && !cd.expired && (
            <>
              <div className="flex gap-3 mb-3">
                {[
                  { label: 'Days',  value: cd.days  },
                  { label: 'Hours', value: cd.hours },
                  { label: 'Mins',  value: cd.mins  },
                  { label: 'Secs',  value: cd.secs  },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="bg-yellow-900/20 border border-yellow-500/20 rounded-lg px-3 py-2 text-center min-w-[56px]"
                  >
                    <div className="text-yellow-300 font-mono font-bold text-xl leading-none">
                      {String(value).padStart(2, '0')}
                    </div>
                    <div className="text-yellow-500/60 text-xs mt-1">{label}</div>
                  </div>
                ))}
              </div>
              {cd.targetDate && (
                <div className="text-yellow-500/50 text-xs font-mono">
                  Target: {cd.targetDate.toUTCString()}
                </div>
              )}
            </>
          )}

          {cd.expired && activation === 'pending' && (
            <div className="text-yellow-300 text-sm font-medium animate-pulse">
              Activation window passed — checking precompile…
            </div>
          )}

          {!hasTarget && (
            <div className="text-yellow-500/60 text-xs">
              Switch to Base Sepolia or Base Mainnet to see the activation countdown.
            </div>
          )}

          <div className="mt-3 flex gap-3 text-xs">
            <a
              href="https://docs.base.org/base-chain/specs/upgrades/beryl/overview"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:underline"
            >
              Beryl upgrade docs ↗
            </a>
            <a
              href="https://github.com/base/base-std"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:underline"
            >
              base-std repo ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
