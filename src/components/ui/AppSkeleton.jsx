export function AppSkeleton() {
  return (
    <div className="animate-pulse space-y-6 max-w-6xl mx-auto pt-4 sm:pt-8">
      {/* Search Header */}
      <div className="flex flex-wrap items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-6">
        <div className="h-8 sm:h-10 bg-white/20 rounded w-32 sm:w-48"></div>
        <div className="flex gap-2 order-2 md:order-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full"></div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full"></div>
        </div>
        <div className="h-10 sm:h-14 bg-white/20 rounded-full w-full md:flex-1 md:max-w-2xl order-3 md:order-2 mt-2 md:mt-0"></div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-[300px] bg-white/10 rounded-2xl"></div>
          <div className="h-[200px] bg-white/10 rounded-2xl"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-[250px] bg-white/10 rounded-2xl"></div>
            <div className="h-[250px] bg-white/10 rounded-2xl"></div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="h-[500px] bg-white/10 rounded-2xl"></div>
          <div className="h-[250px] bg-white/10 rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
}
