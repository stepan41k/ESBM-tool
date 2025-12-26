import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { Minus, Plus } from 'lucide-react'
import { motion, useSpring, useTransform } from 'framer-motion'

// Под-компонент для анимации чисел
function AnimatedNumber({ value }: { value: number }) {
	// Создаем пружинную анимацию
	const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 })
	const display = useTransform(spring, current => Math.round(current))

	useEffect(() => {
		spring.set(value)
	}, [value, spring])

	// Используем ref для прямого изменения текста без ре-рендера React (оптимизация)
	const ref = useRef<HTMLSpanElement>(null)

	useEffect(() => {
		const unsubscribe = display.on('change', latest => {
			if (ref.current) {
				ref.current.textContent = latest.toString()
			}
		})
		return unsubscribe
	}, [display])

	return <span ref={ref}>{value}</span>
}

interface StatCounterProps {
	label: string
	value: number
	icon: ReactNode
	colorClass: string
	onIncrement: () => void
	onDecrement: () => void
	isMain?: boolean
}

export const StatCounter = ({
	label,
	value,
	icon,
	colorClass,
	onIncrement,
	onDecrement,
	isMain = false,
}: StatCounterProps) => {
	return (
		<div
			className={`flex flex-col items-center p-2 rounded-xl bg-black/20 backdrop-blur-sm border border-white/5 transition-colors ${
				isMain
					? 'col-span-2 sm:col-span-1 bg-gradient-to-br from-white/5 to-white/0 border-white/10'
					: ''
			}`}
		>
			<div className={`flex items-center gap-1 mb-1 ${colorClass}`}>
				{icon}
				<span className='text-[10px] font-bold uppercase tracking-widest opacity-80'>
					{label}
				</span>
			</div>

			<div className='flex items-center justify-between w-full gap-2'>
				<motion.button
					whileTap={{ scale: 0.8 }}
					onClick={onDecrement}
					className='w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors active:bg-red-500/20'
				>
					<Minus size={18} />
				</motion.button>

				{/* Здесь выводим анимированное число */}
				<div
					className={`font-black tabular-nums ${
						isMain ? 'text-5xl' : 'text-2xl'
					} text-white flex justify-center w-24`}
				>
					<AnimatedNumber value={value} />
				</div>

				<motion.button
					whileTap={{ scale: 0.8 }}
					onClick={onIncrement}
					className={`w-10 h-10 flex items-center justify-center rounded-lg text-white transition-colors shadow-lg ${
						isMain
							? 'bg-white/10 hover:bg-white/20'
							: 'bg-white/10 hover:bg-white/20'
					}`}
				>
					<Plus size={18} />
				</motion.button>
			</div>
		</div>
	)
}
