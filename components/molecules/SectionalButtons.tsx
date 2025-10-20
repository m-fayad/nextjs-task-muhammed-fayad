const SectionalButtons = () => {
  return (
    <div className="lg:-mt-6 xl:mt-0 mb-8 md:mb-0 text-sm flex flex-wrap items-center gap-4 col-start-1">
      <a
        href="#curriculum"
        className={`px-3 py-1 rounded-[30px] border font-bold ${"border-[#d5d5d5] text-[#1F2937] hover:bg-primary/10"}`}
      >
        Curriculum
      </a>
      <a
        href="#comments"
        className={`px-3 py-1 rounded-[30px] border font-bold ${"border-[#d5d5d5] text-[#1F2937] hover:bg-primary/10"}`}
      >
        Comments
      </a>
      <a
        href="#ask-question"
        className={`px-3 py-1 rounded-[30px] border font-bold ${"border-[#d5d5d5] text-[#1F2937] hover:bg-primary/10"}`}
      >
        Ask a Question
      </a>
      <a
        href="#leaderboard"
        className={`px-3 py-1 rounded-[30px] border font-bold ${"border-[#d5d5d5] text-[#1F2937] hover:bg-primary/10"}`}
      >
        Leaderboard
      </a>
    </div>
  );
};

export default SectionalButtons;
