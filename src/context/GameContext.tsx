import React, { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

// Описываем типы
interface Player {
	id: number
	name: string
	score: number
}

interface GameContextType {
	players: Player[]
	activePlayerIdx: number
	diceValue: number
	isRolling: boolean
	rollDice: () => void
	nextTurn: () => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export const GameProvider = ({ children }: { children: ReactNode }) => {
	const [players, setPlayers] = useState<Player[]>([
		{ id: 1, name: 'Игрок 1', score: 0 },
		{ id: 2, name: 'Игрок 2', score: 0 },
	])
	const [activePlayerIdx, setActivePlayerIdx] = useState(0)
	const [diceValue, setDiceValue] = useState(1)
	const [isRolling, setIsRolling] = useState(false)

	const rollDice = () => {
		if (isRolling) return
		setIsRolling(true)

		setTimeout(() => {
			const result = Math.floor(Math.random() * 6) + 1
			setDiceValue(result)
			setIsRolling(false)
			updateScore(result)
		}, 600)
	}

	const updateScore = (points: number) => {
		setPlayers(prev =>
			prev.map((p, idx) => {
				if (idx === activePlayerIdx) {
					return { ...p, score: p.score + points }
				}
				return p
			})
		)
	}

	const nextTurn = () => {
		setActivePlayerIdx(prev => (prev + 1) % players.length)
	}

	return (
		<GameContext.Provider
			value={{
				players,
				activePlayerIdx,
				diceValue,
				isRolling,
				rollDice,
				nextTurn,
			}}
		>
			{children}
		</GameContext.Provider>
	)
}

export const useGame = () => {
	const context = useContext(GameContext)
	if (!context) {
		throw new Error('useGame must be used within a GameProvider')
	}
	return context
}
