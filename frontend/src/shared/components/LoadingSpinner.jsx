const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-lg sm:text-xl">Loading...</span>
    </div>
)

export default LoadingSpinner