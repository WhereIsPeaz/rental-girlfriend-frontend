export default function ActivityBox({
    title1,
    title2,
    title3,
}: {
    title1: string
    title2: string
    title3: string
}) {
    return (
        <main className="mt-4 flex flex-wrap items-center gap-2">
            <span className="h-[18px] w-[33px] rounded-[4px] bg-[#FEECF1] pt-[2px] pr-[4px] pb-[2px] pl-[4px] text-[10px] font-normal text-[#F24472]">
                {title1}
            </span>
            <span className="h-[18px] w-[51px] rounded-[4px] bg-[#FEECF1] pt-[2px] pr-[4px] pb-[2px] pl-[4px] text-[10px] font-normal text-[#F24472]">
                {title2}
            </span>
            <span className="h-[18px] w-[39px] rounded-[4px] bg-[#FEECF1] pt-[2px] pr-[4px] pb-[2px] pl-[4px] text-[10px] font-normal text-[#F24472]">
                {title3}
            </span>
        </main>
    )
}
