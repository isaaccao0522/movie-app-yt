import { FC } from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
//// Others
import { Image_Path } from "../server/api";
import { IMovie, ITVShows } from "../types";

interface ICardComponentsProps {
  item: IMovie | ITVShows;
  type: string;
}

const CardComponents: FC<ICardComponentsProps> = ({ item, type }) => {
  console.log(type);
  return (
    <Link to={`/${type}/${item?.id}`}>
      <Box
        position={"relative"}
        transform={"scale(1)"}
        _hover={{
          transform: {
            base: "scale(1)x",
            md: "scale(1.08)",
          },
          transition: "transform 0.2s ease-in-out",
          zIndex: "10",
          "& .overlay": { opacity: 1 },
        }}
      >
        <Image
          src={`${Image_Path}/${item?.poster_path}`}
          height={"100%"}
          alt={item?.title || item?.name}
        />
        <Box
          className="overlay"
          pos={"absolute"}
          p="2"
          bottom={"0"}
          left={"0"}
          w={"100%"}
          h={"33%"}
          bg="rgba(0,0,0,0.9)"
          opacity={"0"}
          transition={"opacity 0.3s ease-in-out"}
        >
          <Text textAlign={"center"} color={"white"} fontSize={"1.5rem"}>
            {(item?.title?.length > 15
              ? item?.title.slice(0, 12) + "..."
              : item?.title) ||
              (item?.name?.length > 15
                ? item?.name.slice(0, 12) + "..."
                : item?.name)}
          </Text>
          <Text textAlign={"center"} fontSize={"small"} color={"green.200"}>
            {new Date(
              item?.release_date || item?.first_air_date
            ).getFullYear() || "N/A"}
          </Text>
          <Flex alignItems={"center"} justifyContent={"center"} gap={2} mt="4">
            <StarIcon fontSize={"small"} color={"goldenrod"} />
            <Text color={"white"}>{item?.vote_average?.toFixed(1)}</Text>
          </Flex>
        </Box>
      </Box>
    </Link>
  );
};

export default CardComponents;
