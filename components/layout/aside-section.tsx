const progress = 63;

const AsideSection = () => {
  return (
    <aside className="space-y-8 md:col-start-2 md:col-span-1 md:row-start-1 md:row-span-full">
      <h2 className="text-lg font-bold mb-4 capitalize">
        Topics for this course
      </h2>

      <div className="relative">
        <div className="w-full h-1 bg-[#E6E6E6] rounded-full">
          <div
            className="relative h-1 bg-green-500 rounded-full"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute -top-11 right-0 transform translate-x-1/2">
              <div className="relative">
                <div className="text-[#485293] w-8 h-8 border-2 border-[#C8C8C8] rounded-full flex items-center justify-center text-xs">
                  You
                </div>
                <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-t-[#C8C8C8] border-l-transparent border-r-transparent"></div>
              </div>
            </div>

            <div className="absolute top-1.5 right-0 transform translate-x-1/2">
              <span className="relative text-xs text-[#485293]">
                {progress}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AsideSection;
