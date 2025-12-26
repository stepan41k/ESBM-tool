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
	isLoser: boolean
}

interface GameContextType {
	players: Player[]
	updateStat: (playerId: number, stat: keyof PlayerStats, delta: number) => void
	toggleEpicResurrection: (playerId: number) => void // <--- НОВАЯ ФУНКЦИЯ
	toggleLoser: (playerId: number) => void
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
		{ id: 1, name: 'Колдун 1', ...initialStats, hasEpicResurrection: false, isLoser: false },
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

	const toggleLoser = (playerId: number) => {
		setPlayers(prev =>
			prev.map(p => {
				if (p.id !== playerId) return p

				const newIsLoser = !p.isLoser
				let newHp = p.hp

				// Если мы стали лошарой и жизней больше 15 -> срезаем до 15
				if (newIsLoser && newHp > 15) {
					newHp = 15
				}

				return { ...p, isLoser: newIsLoser, hp: newHp }
			})
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
				
				const maxHp = p.isLoser ? 15 : 25

				// ЛОГИКА ДЛЯ ЗДОРОВЬЯ
				if (stat === 'hp') {
					// СМЕРТЬ
					if (newValue <= 0) {
						setTimeout(() => {
							setPlayers(currentPlayers =>
								currentPlayers.map(cp => {
									if (cp.id !== playerId) return cp

									let respawnHp = 20
									if (cp.hasEpicResurrection) respawnHp = 25

									// Но если Лошара - выше 15 прыгнуть нельзя
									if (cp.isLoser) respawnHp = 15

									return {
										...cp,
										hp: respawnHp,
										deadWizards: cp.deadWizards + 1,
									}
								})
							)
						}, 1000)

						return { ...p, hp: 0 }
					}

					if (newValue > maxHp) newValue = maxHp
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
				hasEpicResurrection: false,
				isLoser: false,
			}))
		)
	}

	return (
		<GameContext.Provider
			value={{ players, updateStat, toggleEpicResurrection, toggleLoser, resetGame }}
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