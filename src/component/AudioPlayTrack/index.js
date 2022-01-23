import React from "react";
import AudioPlayer from 'react-h5-audio-player';
export default function index() {
  return (
    <div>
      <AudioPlayer
        autoPlay
        src="https://res.cloudinary.com/dojswen0t/video/upload/v1642922234/pdf_file/tjzzrj15lyqhhwdnig6f.mp3"
        onPlay={(e) => console.log("onPlay")}
      />
    </div>
  );
}
