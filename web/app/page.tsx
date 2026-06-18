'use client';

import Link from 'next/link';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ActivationBanner } from '@/components/ActivationBanner';
import { useActivationStatus } from '@/lib/hooks';

export default function LandingPage() {
  const { isConnected, address } = useAccount();
  const activation = useActivationStatus();

  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      {/* Header */}
      <header className="text-center mb-12">
        <div className="inline-block bg-blue-600/10 border border-blue-500/30 rounded-full px-4 py-1 text-blue-400 text-sm font-mono mb-6">
          Base · Beryl upgrade · B20 native token standard
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold mb-5 tracking-tight">
          <span className="text-blue-400">B20</span>{' '}
          <span className="text-white">Speedrun</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          A guided, gamified walkthrough of every feature in Base&apos;s native token standard.
          Deploy two B20 tokens, exercise all 40 capabilities, and renounce admin to seal
          your run as immutable evidence on Base mainnet.
        </p>
      </header>

      {/* Activation banner — shown when B20 precompiles are not live */}
      {activation === 'pending' && (
        <div className="mb-10">
          <ActivationBanner />
        </div>
      )}

      {/* Connect / Start */}
      <div className="flex flex-col items-center gap-6 mb-16">
        <ConnectButton />
        {isConnected && (
          <div className="flex flex-col items-center gap-3">
            <Link
              href="/run"
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-3 px-10 rounded-xl text-lg transition-colors shadow-lg shadow-blue-900/30"
            >
              {activation === 'active' ? 'Start Speedrun →' : 'Prepare my run →'}
            </Link>
            <Link
              href={`/profile/${address}`}
              className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
            >
              View your profile
            </Link>
          </div>
        )}
      </div>

      {/* Feature breakdown */}
      <section className="grid sm:grid-cols-3 gap-4 mb-16">
        {[
          {
            level: 'Level 1',
            name: 'Factory & Roles',
            steps: '9 steps',
            desc: 'Deploy both tokens, grant all 7 roles including OPERATOR_ROLE.',
            color: 'border-violet-500/30 bg-violet-900/10',
          },
          {
            level: 'Level 2',
            name: 'Policies',
            steps: '9 steps',
            desc: 'Create blocklist & allowlist, bind all 4 policy scopes, two-step admin transfer.',
            color: 'border-cyan-500/30 bg-cyan-900/10',
          },
          {
            level: 'Level 3',
            name: 'Movement',
            steps: '11 steps',
            desc: 'Mint, burn, transfer (with memos), burnBlocked, supply cap, ERC-2612 permit.',
            color: 'border-green-500/30 bg-green-900/10',
          },
          {
            level: 'Level 4',
            name: 'Asset Specials',
            steps: '6 steps',
            desc: 'Multiplier scaling, announce+batchMint, extra metadata, name/symbol/contractURI updates.',
            color: 'border-orange-500/30 bg-orange-900/10',
          },
          {
            level: '👾 Boss',
            name: 'Pause & Renounce',
            steps: '5 steps',
            desc: 'Pause all 3 features (with revert proof), unpause, then renounceLastAdmin forever.',
            color: 'border-red-500/30 bg-red-900/10',
          },
          {
            level: 'Total',
            name: '40 steps',
            steps: '~$3 at typical Base fees',
            desc: 'Every B20 capability exercised and recorded as immutable onchain evidence.',
            color: 'border-blue-500/30 bg-blue-900/10',
          },
        ].map((card) => (
          <div
            key={card.level}
            className={`border rounded-xl p-5 ${card.color}`}
          >
            <div className="text-xs font-mono text-gray-500 mb-1">{card.level}</div>
            <div className="font-semibold text-white mb-1">{card.name}</div>
            <div className="text-xs text-gray-400 mb-2">{card.steps}</div>
            <div className="text-sm text-gray-500">{card.desc}</div>
          </div>
        ))}
      </section>

      {/* Leaderboard */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-300">Leaderboard</h2>
        <div className="border border-gray-800 rounded-xl p-10 text-center">
          <div className="text-4xl mb-3">🏁</div>
          <p className="text-gray-500">
            No completed runs yet.{' '}
            <span className="text-gray-400">Be the first runner on Base.</span>
          </p>
        </div>
      </section>
    </main>
  );
}
