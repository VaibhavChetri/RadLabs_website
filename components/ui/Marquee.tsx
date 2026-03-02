export function Marquee({
    children,
    speed = 30, // seconds per loop
    pauseOnHover = true,
}: {
    children: React.ReactNode;
    speed?: number;
    pauseOnHover?: boolean;
}) {
    return (
        <div className="relative flex w-full overflow-hidden bg-transparent">
            <div
                className={`flex w-max animate-marquee space-x-12 ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
                style={{ animationDuration: `${speed}s` }}
            >
                <div className="flex space-x-12 px-6">
                    {children}
                </div>
                <div className="flex space-x-12 px-6" aria-hidden="true">
                    {children}
                </div>
                <div className="flex space-x-12 px-6" aria-hidden="true">
                    {children}
                </div>
                <div className="flex space-x-12 px-6" aria-hidden="true">
                    {children}
                </div>
            </div>
        </div>
    );
}
