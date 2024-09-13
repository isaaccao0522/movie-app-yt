import { FC } from "react";

interface IVideoComponentProps {
  id: string;
  small: boolean;
}

const VideoComponent: FC<IVideoComponentProps> = ({ id, small }) => {
  return (
    <iframe
      width="100%"
      height={small ? "150" : "500"}
      src={`https://www.youtube.com/embed/${id}`}
      title="YouTube video player"
      allowFullScreen
    ></iframe>
  );
};

export default VideoComponent;
