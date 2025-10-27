type Props = {
    title: string
    onClick?: () => void
}

export default function EditButton({ title, onClick }: Props) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="mr-1 cursor-pointer rounded-md bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
        >
            {title}
        </button>
    )
}
