import { unixTimeDiff } from "../libs/time";
import Text from "./Text";

interface Props {
  startInTimestamp: number;
  endInTimestamp: number;
}

const ShowTime = ({ startInTimestamp, endInTimestamp }: Props) => {
  const currentUnixTimestampSeconds = Math.floor(Date.now() / 1000);

  if (currentUnixTimestampSeconds < startInTimestamp) {
    return (
      <Text
        text={`Starts in ${unixTimeDiff(startInTimestamp)}`}
        className="text-xs"
      />
    );
  }

  if (currentUnixTimestampSeconds < endInTimestamp) {
    return (
      <Text
        text={`Ends in ${unixTimeDiff(endInTimestamp)}`}
        className="text-xs"
      />
    );
  }

  return <Text text="Ended" className="text-xs md:text-sm" />;
};

export default ShowTime;
