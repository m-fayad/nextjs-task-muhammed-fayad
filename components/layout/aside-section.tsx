import Progressbar from "../progress-bar";

const AsideSection = () => {
  return (
    <aside className="space-y-8 md:col-start-2 md:col-span-1 md:row-start-1 md:row-span-full">
      <h2 className="text-lg font-bold mb-4 capitalize">
        Topics for this course
      </h2>

      <Progressbar />

      <section id="curriculum"></section>
    </aside>
  );
};

export default AsideSection;
