import React, { useContext, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import UserContext from "../../helpers/ContextProvider";
export default function AudioPlayTrack() {
  const { playlist } = useContext(UserContext);
  const [current, setCurrent] = useState(0);
  const onNext = () => {
    console.log('next')
    setCurrent(current >= playlist.length - 1 ? 0 : current + 1);
  };
  const onPrev = () => {
    setCurrent(current <= 0 ? playlist.length - 1 : current - 1);
  };
  console.log(playlist)
  return (
    <div>
      <AudioPlayer
        autoPlay
        src={playlist?.[current]?.url || ""}
        onPlay={(e) => console.log("onPlay")}
        header={playlist?.[current]?.songName || ""}
        showJumpControls={false}
        showSkipControls
        onClickNext={onNext}
        onClickPrevious={onPrev}
        onEnded={onNext}
      />
    </div>
  );
}
