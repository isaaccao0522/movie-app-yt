import { FC } from "react";
import { Link } from "react-router-dom";
//// Ui & Icons
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { CheckIcon, StarIcon } from "@chakra-ui/icons";
//// Firebase
import { useFirestore } from "../server/firestore";
////Others
import { Image_Path } from "../server/api";
import { useAuth } from "../context/useAuth";
import { IMovie, ITVShows } from "../types";

interface IWatchlistCardProps {
  type: string;
  item: IMovie | ITVShows;
  setWatchlist: (item: IMovie) => void;
}

const WatchlistCard: FC<IWatchlistCardProps> = ({
  type,
  item,
  setWatchlist,
}) => {
  const { user } = useAuth();
  const { removeFromWatchlist } = useFirestore();

  const handleRemoveClick = (event) => {
    event.preventDefault(); // Prevent the default behavior (link redirection)
    removeFromWatchlist(user?.uid, item.id).then(() => {
      setWatchlist((prev) => prev.filter((el) => el.id !== item.id));
    });
  };

  return (
    <Link to={`/${type}/${item?.id}`}>
      <Flex gap="4">
        <Box position={"relative"} w={"150px"}>
          <Image
            src={`${Image_Path}/${item?.poster_path}`}
            alt={item?.title}
            height={"200px"}
            minW={"150px"}
            objectFit={"cover"}
          />
          <Tooltip label="Remove from watchlist">
            <IconButton
              aria-label="Remove from watchlist"
              icon={<CheckIcon />}
              size={"sm"}
              colorScheme="green"
              position={"absolute"}
              zIndex={"999"}
              top="2px"
              left={"2px"}
              onClick={handleRemoveClick}
            />
          </Tooltip>
        </Box>

        <Box>
          <Heading fontSize={{ base: "xl", md: "2xl" }} noOfLines={1}>
            {item?.title || item?.name}
          </Heading>
          <Heading fontSize={"sm"} color={"green.200"} mt="2">
            {new Date(
              item?.release_date || item?.first_air_date
            ).getFullYear() || "N/A"}
          </Heading>
          <Flex alignItems={"center"} gap={2} mt="4">
            <StarIcon fontSize={"small"} />
            <Text textAlign={"center"} fontSize="small">
              {item?.vote_average?.toFixed(1)}
            </Text>
          </Flex>
          <Text mt="4" fontSize={{ base: "xs", md: "sm" }} noOfLines={5}>
            {item?.overview}
          </Text>
        </Box>
      </Flex>
    </Link>
  );
};

export default WatchlistCard;
