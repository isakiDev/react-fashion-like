export const SkeletonPost = () => {
  return (
    <div className="w-full">
      <div className="rounded overflow-hidden shadow-lg animate-pulse">
        <div className="flex items-center gap-4 p-2">
          <div className="bg-gray-300 w-10 h-10 rounded-full"/>
          <div className="h-4 bg-gray-300 w-1/4"></div>
        </div>
        <div className="h-48 bg-gray-300"></div>
        <div className="px-6 py-4">
          <div className="h-6 bg-gray-300 mb-2 w-1/2"></div>
          <div className="h-4 bg-gray-300 w-1/3"></div>
        </div>
      </div>
    </div>
  )
}
