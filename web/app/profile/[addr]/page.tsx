'use client';

import { use } from 'react';
import Link from 'next/link';
import { useSpeedrunProgress } from '@/lib/hooks';
import { STEPS, LEVEL_NAMES, stepsByLevel } from '@/lib/steps';

interface Props {
  params: Promise<{ addr: string }>;
}

export default function ProfilePage({ params }: Props) {
  const { addr } = use(params);
  const address = addr as `0x${string}`;

  // We can't know the Speedrun contract from an address alone without an indexer.
  // For now, try the address as a Speedrun contract (self-hosted runner).
  const progress = useSpeedrunProgress(address);

  const totalDone = progress.stepsCompleted;
  const isComplete = progress.completedAt > 0n;

  const levels = ([1, 2, 3, 4, 5] as const).map((level) => ({
    level,
    name: LEVEL_NAMES[level],
    steps: stepsByLevel(level),
  }));

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <Link href="/" className="text-gray-500 hover:text-white text-sm transition-colors">
          ← Home
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="text-xs text-gray-500 font-mono mb-1">Runner / Speedrun contract</div>
        <h1 className="font-mono text-xl text-white break-all">{address}</h1>
        <a
          href={`https://basescan.org/address/${address}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline text-xs"
        >
          View on BaseScan →
        </a>
      </div>

      {/* Summary */}
      <div className="border border-gray-800 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-5xl font-bold text-white">
              {totalDone}
              <span className="text-gray-600 text-3xl">/40</span>
            </div>
            <div className="text-gray-500 text-sm mt-1">steps completed</div>
          </div>
          <div className="text-right">
            {isComplete ? (
              <div>
                <div className="text-green-400 font-bold text-lg">🏁 COMPLETE</div>
                <div className="text-gray-500 text-xs mt-1">
                  {new Date(Number(progress.completedAt) * 1000).toLocaleDateString()}
                </div>
              </div>
            ) : progress.startedAt > 0n ? (
              <div>
                <div className="text-gray-400 text-sm">In progress</div>
                <div className="text-gray-600 text-xs mt-1">
                  Started {new Date(Number(progress.startedAt) * 1000).toLocaleDateString()}
                </div>
              </div>
            ) : (
              <div className="text-gray-600 text-sm">Not started</div>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${(totalDone / 40) * 100}%` }}
          />
        </div>
      </div>

      {/* Step checklist by level */}
      {levels.map(({ level, name, steps }) => {
        const levelDone = steps.filter((s) => progress.isStepDone(s.id)).length;
        return (
          <section key={level} className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-gray-300 text-sm">{name}</h2>
              <span className="text-xs text-gray-600 font-mono">
                {levelDone}/{steps.length}
              </span>
            </div>
            <div className="border border-gray-800 rounded-xl overflow-hidden">
              {steps.map((step, i) => {
                const done = progress.isStepDone(step.id);
                return (
                  <div
                    key={step.id}
                    className={`flex items-start gap-4 px-5 py-4 ${
                      i < steps.length - 1 ? 'border-b border-gray-800/60' : ''
                    } ${done ? 'bg-gray-950' : ''}`}
                  >
                    {/* Checkbox */}
                    <div
                      className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                        done
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-gray-800 text-gray-600 border border-gray-700'
                      }`}
                    >
                      {done ? '✓' : step.specId}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-sm font-medium ${
                          done ? 'text-white' : 'text-gray-500'
                        }`}
                      >
                        {step.title}
                      </div>
                      {done && (
                        <div className="text-xs text-gray-600 mt-0.5">
                          Step {step.specId} of 40 · {step.levelName}
                        </div>
                      )}
                    </div>

                    {/* Doc link */}
                    <a
                      href={step.docAnchor}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-blue-400 text-xs shrink-0 transition-colors"
                    >
                      docs ↗
                    </a>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      {/* Token addresses */}
      {progress.initialized && (
        <div className="mt-8 grid sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="border border-gray-800 rounded-xl p-4">
            <div className="text-gray-500 mb-1">Asset token</div>
            <a
              href={`https://basescan.org/address/${progress.assetToken}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:underline break-all"
            >
              {progress.assetToken}
            </a>
          </div>
          <div className="border border-gray-800 rounded-xl p-4">
            <div className="text-gray-500 mb-1">Stablecoin token</div>
            <a
              href={`https://basescan.org/address/${progress.stablecoinToken}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline break-all"
            >
              {progress.stablecoinToken}
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
