export default function PrimaryButton({ title }: { title: string }) {
    return (
        <button
            type="submit"
            className="mr-1 cursor-pointer rounded-md bg-gradient-to-r from-pink-600 to-rose-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
        >
            {title}
        </button>
    )
}
