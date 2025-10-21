import { Curriculum, CurriculumItemProps } from "../atoms/curriculum";

// Mock data based on your first image
const week1To4Items: CurriculumItemProps[] = [
  { id: 1, title: "Introduction", isLocked: true },
  { id: 2, title: "Course Overview", isLocked: true },
  {
    id: 3,
    title: "Course Overview",
    tags: [
      { text: "0 QUESTION", color: "pink" },
      { text: "10 MINUTES", color: "green" },
    ],
    // action: onClick here will trigger the popup with screen size, can close it. displaying a pdf file
  },
  { id: 4, title: "Course Exercise / Reference Files", isLocked: true },
  { id: 5, title: "Code Editor Installation (Optional...)", isLocked: true },
  {
    id: 6,
    title: "Embedding PHP in HTML",
    isLocked: true,
    // action: onClick here will trigger the popup with screen size, can close it with maintaining the student progress. displaying a exam which will look like the attached image
  },
];

const week5To8Items: CurriculumItemProps[] = [
  { id: 1, title: "Defining Functions", isLocked: true },
  { id: 2, title: "Function Parameters", isLocked: true },
  {
    id: 3,
    title: "Return Values From Functions",
    tags: [
      { text: "2 QUESTIONS", color: "pink" },
      { text: "15 MINUTES", color: "green" },
    ],
    // action: onClick here will trigger the popup with screen size, can close it. displaying a pdf file
  },
  { id: 4, title: "Global Variable and Scope", isLocked: true },
  { id: 5, title: "Newer Way of creating a Constant", isLocked: true },
  {
    id: 6,
    title: "Constants",
    isLocked: true,
    // action: onClick here will trigger the popup with screen size, can close it with maintaining the student progress. displaying a exam which will look like the attached image
  },
];

const CurriculumList = () => {
  return (
    <div className="flex flex-col items-center gap-y-4 lg:gap-y-8">
      <Curriculum
        title="Week 1-4"
        subtitle="Advanced story telling techniques for writers: Personas, Characters & Plots"
        items={week1To4Items}
        defaultOpen={true}
      />

      <Curriculum
        title="Week 5-8"
        subtitle="Advanced story telling techniques for writers: Personas, Characters & Plots"
        items={week5To8Items}
      />

      <Curriculum
        title="Week 9-12"
        subtitle="Advanced story telling techniques for writers: Personas, Characters & Plots"
        items={week5To8Items}
      />
    </div>
  );
};

export default CurriculumList;
