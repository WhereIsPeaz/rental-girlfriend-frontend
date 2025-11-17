type Props = {
    title: string
    onClick?: () => void
}

export default function PrimaryButton({ title, onClick }: Props) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="mr-1 cursor-pointer rounded-md bg-gradient-to-r from-pink-600 to-rose-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
        >
            {title}
        </button>
    )
}