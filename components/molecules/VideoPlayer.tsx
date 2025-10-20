const VideoPlayer = () => {
  return (
    <div className="relative w-full h-0 pb-[300px]">
      <iframe
        className="absolute top-0 -left-4 w-screen md:left-0 md:w-full h-full"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
