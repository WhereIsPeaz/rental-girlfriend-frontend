import { Star, StarHalf, X } from 'lucide-react'
export default function renderStarIcon(
    starIndex: number,
    currentRating: number
) {
    const isFull = currentRating >= starIndex
    const isHalf = currentRating === starIndex - 0.5

    let Icon = Star

    if (isHalf) {
        Icon = StarHalf
    } else if (!isFull) {
        Icon = Star
    }

    // Determine colors
    const colorClass =
        isFull || isHalf
            ? 'fill-yellow-400 text-yellow-400'
            : 'fill-transparent text-slate-300'

    return (
        <Icon
            size={32}
            className={`transition-colors duration-200 ${colorClass}`}
            strokeWidth={1.5}
        />
    )
}