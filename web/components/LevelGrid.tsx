'use client';

import { StepCard } from './StepCard';
import { PauseProbe } from './PauseProbe';
import { STEPS, LEVEL_NAMES, stepsByLevel, isStepAvailable } from '@/lib/steps';
import type { StepLevel } from '@/lib/steps';

interface LevelGridProps {
  progress: bigint;
  assetToken: `0x${string}` | undefined;
}

const LEVEL_COLORS: Record<StepLevel, string> = {
  1: 'text-violet-400 border-violet-500/20',
  2: 'text-cyan-400 border-cyan-500/20',
  3: 'text-green-400 border-green-500/20',
  4: 'text-orange-400 border-orange-500/20',
  5: 'text-red-400 border-red-500/20',
};

export function LevelGrid({ progress, assetToken }: LevelGridProps) {
  const levels: StepLevel[] = [1, 2, 3, 4, 5];

  return (
    <div className="space-y-10">
      {levels.map((level) => {
        const steps = stepsByLevel(level);
        const done = steps.filter((s) => (progress >> BigInt(s.id)) & 1n).length;
        const color = LEVEL_COLORS[level];

        return (
          <section key={level}>
            {/* Level header */}
            <div className={`flex items-center justify-between mb-4 pb-2 border-b ${color}`}>
              <h2 className={`font-bold text-sm ${color.split(' ')[0]}`}>
                {LEVEL_NAMES[level]}
              </h2>
              <span className="text-gray-600 text-xs font-mono">
                {done}/{steps.length}
              </span>
            </div>

            {/* Step grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {steps.map((step) => {
                const isDone = Boolean((progress >> BigInt(step.id)) & 1n);
                const available = isStepAvailable(step.id, progress);

                return (
                  <div key={step.id}>
                    <StepCard
                      step={step}
                      isDone={isDone}
                      isAvailable={available}
                    />
                    {/* Pause probe shown inline after a pause step is done */}
                    {step.isPauseStep && isDone && assetToken && (
                      <PauseProbe
                        tokenAddress={assetToken}
                        feature={
                          step.id === 35 ? 0 /* TRANSFER */
                          : step.id === 36 ? 1 /* MINT */
                          : 2 /* BURN */
                        }
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
