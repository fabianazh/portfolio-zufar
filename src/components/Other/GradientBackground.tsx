export default function GradientBackground() {
    return (
        <>
            <div className="absolute block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1]  before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic  after:blur-2xl after:content-[''] before:bg-gradient-to-br before:from-transparent before:to-blue-700 before:opacity-10 after:from-sky-900 after:via-[#0141ff] after:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]"></div>
        </>
    )
}
