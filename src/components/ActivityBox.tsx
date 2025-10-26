export default function ActivityBox({
    activities = [],
}: {
    activities?: string[]
}) {
    // แสดงเฉพาะ activities ที่ไม่เป็น empty string และจำกัดไม่เกิน 3 รายการ
    const filteredActivities = activities
        .filter((activity) => activity.trim() !== '')
        .slice(0, 3)

    // ถ้าไม่มี activities ให้ return null
    if (filteredActivities.length === 0) {
        return null
    }

    return (
        <main className="mt-4 flex flex-wrap items-center gap-2">
            {filteredActivities.map((activity, index) => (
                <span
                    key={index}
                    className="h-[18px] w-auto rounded-[4px] bg-[#FEECF1] pt-[2px] pr-[4px] pb-[2px] pl-[4px] text-[10px] font-normal text-[#F24472]"
                >
                    {activity}
                </span>
            ))}
        </main>
    )
}
