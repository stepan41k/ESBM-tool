import clsx from 'clsx'

// Типизируем пропсы
interface Player {
	id: number
	name: string
	score: number
}

interface PlayerCardProps {
	player: Player
	isActive: boolean
}

export const PlayerCard = ({ player, isActive }: PlayerCardProps) => {
	return (
		<div
			className={clsx(
				'p-4 rounded-lg flex justify-between items-center transition-all duration-300',
				isActive
					? 'bg-indigo-600 text-white shadow-lg scale-105'
					: 'bg-gray-100 text-gray-800'
			)}
		>
			<div>
				<h3 className='font-bold'>{player.name}</h3>
				<p className='text-sm opacity-80'>
					{isActive ? 'Ваш ход' : 'Ожидание'}
				</p>
			</div>
			<div className='text-2xl font-bold'>{player.score}</div>
		</div>
	)
}
