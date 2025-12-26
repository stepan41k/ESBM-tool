import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

// Типы ресурсов
export interface PlayerStats {
	hp: number
	deadWizards: number
	limpWands: number
	creatures: number
	treasures: number
	legends: number
}

export interface Player extends PlayerStats {
	id: number
	name: string
	hasEpicResurrection: boolean // <--- НОВОЕ ПОЛЕ
}

interface GameContextType {
	players: Player[]
	updateStat: (playerId: number, stat: keyof PlayerStats, delta: number) => void
	toggleEpicResurrection: (playerId: number) => void // <--- НОВАЯ ФУНКЦИЯ
	resetGame: () => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export const GameProvider = ({ children }: { children: ReactNode }) => {
	const initialStats: PlayerStats = {
		hp: 20,
		deadWizards: 0,
		limpWands: 0,
		creatures: 0,
		treasures: 0,
		legends: 0,
	}

	const [players, setPlayers] = useState<Player[]>([
		// Добавляем флаг false по умолчанию
		{ id: 1, name: 'Колдун 1', ...initialStats, hasEpicResurrection: false },
	])

	// Переключатель свойства
	const toggleEpicResurrection = (playerId: number) => {
		setPlayers(prev =>
			prev.map(p =>
				p.id === playerId
					? { ...p, hasEpicResurrection: !p.hasEpicResurrection }
					: p
			)
		)
	}

	const updateStat = (
		playerId: number,
		stat: keyof PlayerStats,
		delta: number
	) => {
		setPlayers(prev =>
			prev.map(p => {
				if (p.id !== playerId) return p

				let newValue = p[stat] + delta

				// ЛОГИКА ДЛЯ ЗДОРОВЬЯ
				if (stat === 'hp') {
					// СМЕРТЬ
					if (newValue <= 0) {
						setTimeout(() => {
							setPlayers(currentPlayers =>
								currentPlayers.map(cp => {
									if (cp.id !== playerId) return cp

									// <--- ПРОВЕРКА ФЛАГА ЗДЕСЬ
									const targetHp = cp.hasEpicResurrection ? 25 : 20

									return {
										...cp,
										hp: targetHp,
										deadWizards: cp.deadWizards + 1,
									}
								})
							)
						}, 1000)

						return { ...p, hp: 0 }
					}

					if (newValue > 25) newValue = 25
				} else {
					if (newValue < 0) newValue = 0
				}

				return { ...p, [stat]: newValue }
			})
		)
	}

	const resetGame = () => {
		setPlayers(prev =>
			prev.map(p => ({
				...p,
				...initialStats,
				hasEpicResurrection: false, // Сбрасываем и этот флаг
			}))
		)
	}

	return (
		<GameContext.Provider
			value={{ players, updateStat, toggleEpicResurrection, resetGame }}
		>
			{children}
		</GameContext.Provider>
	)
}

export const useGame = () => {
	const context = useContext(GameContext)
	if (!context) throw new Error('useGame must be used within a GameProvider')
	return context
}