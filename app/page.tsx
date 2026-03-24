'use client'

import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect, useWriteContract, useReadContract } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { parseEther, formatEther } from 'viem'
import { CONTRACT_ADDRESS, CONTRACT_ABI, MIN_PLAY, APP_ID, APP_NAME } from '@/config/contract'
import { trackTransaction } from '@/utils/track'

export default function Home() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const { writeContract, data: txData, isPending } = useWriteContract()

  const [pot, setPot] = useState('0')
  const [totalPlays, setTotalPlays] = useState('0')
  const [userPlays, setUserPlays] = useState('0')
  const [userSpent, setUserSpent] = useState('0')

  const { data: statsData } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getStats',
  })

  const { data: playerData } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getPlayer',
    args: address ? [address] : undefined,
  })

  useEffect(() => {
    if (statsData) {
      setPot(formatEther(statsData[0]))
      setTotalPlays(statsData[1].toString())
    }
  }, [statsData])

  useEffect(() => {
    if (playerData) {
      setUserPlays(playerData[0].toString())
      setUserSpent(formatEther(playerData[1]))
    }
  }, [playerData])

  useEffect(() => {
    if (txData && address) {
      trackTransaction(APP_ID, APP_NAME, address, txData)
    }
  }, [txData, address])

  const handlePlay = async () => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'play',
        value: parseEther(MIN_PLAY),
      })
    } catch (error) {
      console.error('Play failed:', error)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">BaseNanoPlay</h1>
        <p className="text-center text-gray-300 mb-8">
          Ultra-Low Cost Onchain Game - 0.000001 ETH per play
        </p>

        <div className="bg-blue-800/30 rounded-lg p-6 mb-6 border border-blue-500/30">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-gray-400 text-sm">Prize Pool</p>
              <p className="text-2xl font-bold text-yellow-400">{pot} ETH</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Plays</p>
              <p className="text-2xl font-bold">{totalPlays}</p>
            </div>
          </div>

          {isConnected && (
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-500/30">
              <div>
                <p className="text-gray-400 text-sm">Your Plays</p>
                <p className="text-xl font-bold text-green-400">{userPlays}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Your Spent</p>
                <p className="text-xl font-bold text-orange-400">{userSpent} ETH</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white/10 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">How to Play</h2>
          <ul className="space-y-2 text-gray-300">
            <li>• Each play costs 0.000001 ETH</li>
            <li>• 10% chance to win the entire prize pool</li>
            <li>• 10 seconds cooldown between plays</li>
            <li>• All data stored onchain, fully transparent</li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          {!isConnected ? (
            <button
              onClick={() => connect({ connector: injected() })}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors"
            >
              Connect Wallet to Start
            </button>
          ) : (
            <>
              <div className="bg-white/5 rounded-lg p-3 text-center text-sm">
                <span className="text-gray-400">Connected: </span>
                <span className="font-mono">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
                <button
                  onClick={() => disconnect()}
                  className="ml-4 text-red-400 hover:text-red-300"
                >
                  Disconnect
                </button>
              </div>
              <button
                onClick={handlePlay}
                disabled={isPending}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-bold py-4 px-6 rounded-lg transition-colors"
              >
                {isPending ? 'Processing...' : 'Play Now (0.000001 ETH)'}
              </button>
            </>
          )}
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          <p>Contract: {CONTRACT_ADDRESS}</p>
          <p className="mt-2">Base Mainnet</p>
        </div>
      </div>
    </main>
  )
}
