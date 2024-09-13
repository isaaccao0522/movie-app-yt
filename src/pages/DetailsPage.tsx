import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//// Ui & Icons
import {
  Box,
  Container,
  Heading,
  Flex,
  Image,
  Text,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Badge,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import {
  CalendarIcon,
  TimeIcon,
  CheckCircleIcon,
  SmallAddIcon,
} from "@chakra-ui/icons";
//// Others
import {
  Image_Path,
  fetchCredits,
  fetchDetails,
  fetchVideos,
} from "../server/api";
import {
  minutesTohours,
  ratingToPercentage,
  resolveRatingColor,
} from "../utils/helper";
import { IMovie, ICast, IVideo } from "../types";
import VideoComponent from "../components/VideoComponent";
import { useFirestore } from "../server/firestore";
import { useAuth } from "../context/useAuth";

interface IDetailsPageProps {}

const DetailsPage: FC<IDetailsPageProps> = () => {
  const { type, id } = useParams();
  const { user } = useAuth();
  const [details, setDetails] = useState<IMovie>({});
  const [cast, setCast] = useState<ICast[]>([]);
  const [video, setVideo] = useState<IVideo>(null);
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isInWatchlist, setIsWatchlist] = useState<boolean>(false);
  const toast = useToast();
  const { addToWatchlist, checkIfInWatchlist, removeFromWatchlist } = useFirestore();

  /// Fetch details
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const [detailsData, creditsData, videosData] = await Promise.all([
          fetchDetails(type, id),
          fetchCredits(type, id),
          fetchVideos(type, id),
        ]);

        //// Set details
        console.log("DetailsData :", detailsData);
        setDetails(detailsData);

        //// Set cast
        console.log("CreditsData :", creditsData);
        setCast(creditsData?.cast);

        //// Set videos
        console.log("VideosData :", videosData);
        const videos = videosData?.results?.filter(
          (v: IVideo) => v?.type !== "Trailer"
        );
        setVideos(videos);
        console.log(videos);

        ////Set video
        const video = videosData?.results.find(
          (v: IVideo) => v?.type === "Trailer"
        );
        setVideo(video);
      } catch (error) {
        console.log("Error in fetch data :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, id]);

  const handleSaveToWatchlist = async () => {
    if (!user) {
      toast({
        title: "Please login to add to watchlist first !!!",
        status: "error",
        isClosable: true,
        duration: 3500,
        position: "top",
      });
      return;
    }
    const data = {
      id: details?.id,
      title: details?.title || details?.name,
      type: type,
      poster_path: details?.poster_path,
      release_date: details?.release_date || details?.first_air_date,
      vote_average: details?.vote_average,
      overview: details?.overview,
    };
    const dataId = details?.id?.toString();
    await addToWatchlist(user?.uid, dataId, data);
    const isSetToWatchList = await checkIfInWatchlist(user?.uid, dataId);
    setIsWatchlist(isSetToWatchList);
  };

  useEffect(() => {
    if (!user) {
      setIsWatchlist(false);
      return;
    }
    checkIfInWatchlist(user?.uid, id).then((data) => {
      setIsWatchlist(data);
    });
  }, [user, id, checkIfInWatchlist]);

  const handleRemoveFromWatchlist = async () => {
    await removeFromWatchlist(user?.uid, id);
    const isSetToWatchList = await checkIfInWatchlist(user?.uid, id);
    setIsWatchlist(isSetToWatchList);
  };

  const title: string = details?.title || details?.name;
  const releaseDate: Date =
    type === "tv" ? details?.first_air_date : details?.release_date;

  if (loading) {
    return (
      <Flex justify={"center"}>
        <Spinner size={"xl"} color="red" />
      </Flex>
    );
  }

  return (
    <Box>
      <Box
        backgroundImage={`url(${Image_Path}/${details?.backdrop_path})`}
        bgGradient="linear(rgba(0,0,0,1), rgba(0,0,0,1))"
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        w={"100%"}
        h={{ base: "auto", md: "500px" }}
        py={"2"}
        zIndex={"-1"}
        display={"flex"}
        alignItems={"center"}
      >
        {/* Details */}
        <Container maxW={"container.xl"}>
          <Flex
            alignItems={"center"}
            gap="10"
            flexDirection={{ base: "column", md: "row" }}
          >
            <Image
              src={`${Image_Path}/${details?.poster_path}`}
              height={"450px"}
              borderRadius={"sm"}
              alt="Image_Path"
              key={id}
            />
            <Box>
              <Heading fontSize={"3xl"}>
                {title}{" "}
                <Text as="span" fontWeight={"normal"} color={"gray.400"}>
                  {new Date(releaseDate).getFullYear()}
                </Text>
              </Heading>
              <Flex alignItems={"center"} gap={"4"} mt={1} mb={5}>
                <Flex alignItems={"center"}>
                  <CalendarIcon mr={2} fontSize={"30"} color={"gray.400"} />
                  <Text fontSize={"md"}>
                    {new Date(releaseDate).toLocaleDateString("en-US")} (US)
                  </Text>
                </Flex>
                {type === "movie" && (
                  <>
                    <Box>*</Box>
                    <Flex alignItems={"center"}>
                      <TimeIcon mr="2" color={"gray.400"} />
                      <Text fontSize={"sm"}>
                        {minutesTohours(details?.runtime)}
                      </Text>
                    </Flex>
                  </>
                )}
              </Flex>
              <Flex alignItems={"center"} gap={"4"}>
                <CircularProgress
                  value={ratingToPercentage(details?.vote_average)}
                  bg={"gray.800"}
                  borderRadius={"full"}
                  p={"0.5"}
                  size={"70px"}
                  color={resolveRatingColor(details?.vote_average)}
                  thickness={"6px"}
                >
                  <CircularProgressLabel fontSize={"lg"}>
                    {ratingToPercentage(details?.vote_average)}{" "}
                    <Box as="span" fontSize={"10px"}>
                      %
                    </Box>
                  </CircularProgressLabel>
                </CircularProgress>
                <Text display={{ base: "none", md: "initial" }}>
                  User Score
                </Text>
                {isInWatchlist ? (
                  <Button
                    leftIcon={<CheckCircleIcon />}
                    colorScheme="green"
                    variant={"outline"}
                    onClick={handleRemoveFromWatchlist}
                  >
                    In watchlist
                  </Button>
                ) : (
                  <Button
                    leftIcon={<SmallAddIcon />}
                    variant={"outline"}
                    onClick={handleSaveToWatchlist}
                  >
                    Add to watchlist
                  </Button>
                )}
              </Flex>
              <Text
                color={"gray.400"}
                fontSize={"sm"}
                fontStyle={"italic"}
                my="5"
              >
                {details?.tagline}
              </Text>
              <Heading fontSize={"xl"} mb={"3"}>
                Overview
              </Heading>
              <Text fontSize={"md"} mb={"3"}>
                {details?.overview}
              </Text>
              <Flex mt="6" gap="2">
                {details?.genres?.map((genre) => (
                  <Badge key={genre?.id} p="1">
                    {genre?.name}
                  </Badge>
                ))}
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Container */}
      <Container maxW={"container.xl"} pb="10">
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"} mt="10">
          Cast
        </Heading>
        {cast?.length === 0 ? (
          <Text>No cast found</Text>
        ) : (
          <Flex mt="5" mb="10" py="2" overflowX={"scroll"} gap={"5"}>
            {cast &&
              cast?.slice(0, 10).map((item) => (
                <Box key={item?.id} minW={"150px"}>
                  <Image
                    src={`${Image_Path}/${item?.profile_path}`}
                    w={"100%"}
                    height={"225px"}
                    objectFit={"cover"}
                    borderRadius={"sm"}
                  />
                  <Text align={"center"}>{item?.character}</Text>
                </Box>
              ))}
          </Flex>
        )}

        {/* Videos */}
        <Heading
          as="h2"
          fontSize={"md"}
          textTransform={"uppercase"}
          mt="10"
          mb="5"
        >
          Videos
        </Heading>

        {video === undefined && videos?.length === 0 && (
          <Flex justify={"center"} align={"center"}>
            <Text>No video relased !!!</Text>
          </Flex>
        )}
        {video !== undefined ? (
          <VideoComponent id={video?.key} small={false} />
        ) : (
          ""
        )}

        <Flex
          mt="5"
          mb="10"
          px={"3"}
          overflowX={"scroll"}
          gap={"5"}
          hidden={videos?.length === 0}
        >
          {videos?.length > 0 ? (
            videos?.map((v) => (
              <Box minW={"290px"} key={v?.id}>
                <VideoComponent id={v?.key} small={true} />
                <Text fontSize={"sm"} fontWeight={"bold"} mt="2" noOfLines={2}>
                  {v?.name}{" "}
                </Text>
              </Box>
            ))
          ) : (
            <Flex justify={"center"} align={"center"}>
              <Text>No video relased !!!</Text>
            </Flex>
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default DetailsPage;
