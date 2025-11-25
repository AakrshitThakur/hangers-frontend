export default function About() {
  return (
    <div
      id="about-page"
      className="w-full min-h-[85vh] flex flex-col justify-center items-center gap-3 p-5 sm:p-7 md:p-9"
    >
      <div className="flex flex-col md:flex-row justify-center items-center gap-3">
        <div>
          <p className="text-base sm:text-lg md:text-xl text-center md:text-left">
            Find Formal and Informal Wear for Every Style <br />— From Casual to
            Classic
          </p>
        </div>
        <div className="w-xs sm:w-sm md:w-sm h-auto rounded-full overflow-hidden solid-border">
          <img
            src="/images/about-lehenga.png"
            alt="Lehenga image"
            className="w-full h-full"
          />
        </div>
      </div>
      {/* The default display behavior of flex items is block-level within the flex container */}
      <div className="color-info color-info-content flex flex-col md:flex-row justify-center items-center gap-3 p-3 rounded-xl">
        <div className="w-2xs sm:w-2xs md:w-xs flex-shrink-0 h-auto rounded-full overflow-hidden">
          <img
            src="/images/AakrshitThakurPassportPic.jpeg"
            alt="Aakrshit Thakur's pic"
            className="w-full h-full"
          />
        </div>
        <div>
          <p className="text-base sm:text-lg md:text-xl text-center md:text-left">
            A software developer proficient in software development. Demonstrated ability to build and maintain full-lifecycle web applications, backed by strong academic achievements. <br />— Software Developer
          </p>
        </div>
      </div>
    </div>
  );
}
