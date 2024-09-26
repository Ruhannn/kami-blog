import { BigPlayButton, Player } from "video-react";
import "video-react/dist/video-react.css";
const Pplayer = ({ url }: { url: string }) => {
  return (
    <div className="overflow-hidden rounded-lg">
      <Player src={url}>
        <BigPlayButton position="center" />
      </Player>
    </div>
  );
};

export default Pplayer;
