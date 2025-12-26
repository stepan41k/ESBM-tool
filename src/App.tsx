import { GameProvider, useGame } from './context/GameContext.tsx'
import { Dice } from './components/Dice.tsx'
import { PlayerCard } from './components/PlayerCard.tsx'

const GameBoard = () => {
	const { players, activePlayerIdx, nextTurn } = useGame()

	return (
		<div className='min-h-screen bg-gray-50 p-6 flex flex-col justify-between'>
			<header className='text-center mb-6'>
				<h1 className='text-2xl font-black text-gray-800 tracking-tighter'>
					BOARD GAME APP
				</h1>
			</header>

			<div className='space-y-4 mb-8'>
				{players.map((player, idx) => (
					<PlayerCard
						key={player.id}
						player={player}
						isActive={idx === activePlayerIdx}
					/>
				))}
			</div>

			<div className='flex-grow flex flex-col items-center justify-center space-y-8'>
				<Dice />
				<p className='text-gray-400 text-sm'>Нажми на кубик, чтобы бросить</p>
			</div>

			<button
				onClick={nextTurn}
				className='w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-md active:bg-indigo-700 transition-colors mt-6 safe-area-bottom'
			>
				Завершить ход
			</button>
		</div>
	)
}

function App() {
	return (
		<GameProvider>
			<GameBoard />
		</GameProvider>
	)
}

export default App
