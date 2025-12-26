import React, { createContext, useContext, useState } from 'react'

const GameContext = createContext()

export const GameProvider = ({ children }) => {
	const [players, setPlayers] = useState([
		{ id: 1, name: 'Игрок 1', score: 0 },
		{ id: 2, name: 'Игрок 2', score: 0 },
	])
	const [activePlayerIdx, setActivePlayerIdx] = useState(0)
	const [diceValue, setDiceValue] = useState(1)
	const [isRolling, setIsRolling] = useState(false)

	// Логика броска кубика
	const rollDice = () => {
		if (isRolling) return
		setIsRolling(true)

		// Имитация задержки анимации
		setTimeout(() => {
			const result = Math.floor(Math.random() * 6) + 1
			setDiceValue(result)
			setIsRolling(false)
			updateScore(result)
		}, 600)
	}

	// Обновление очков и смена хода
	const updateScore = points => {
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

export const useGame = () => useContext(GameContext)
