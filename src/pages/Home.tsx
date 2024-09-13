import { FC, useState, useEffect } from "react";
import {
  useColorModeValue,
  Container,
  Heading,
  Grid,
  Box,
  Flex,
  Skeleton,
} from "@chakra-ui/react";
//// Others
import CardComponent from "../components/CardComponent";
import { IMovie } from "../types";
import { fetchTrending } from "../server/api";

interface IHomeProps {}

const Home: FC<IHomeProps> = (props) => {
  const [data, setData] = useState<[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeWindow, setTimeWindow] = useState("day");
  const textColor = useColorModeValue("black", "white");

  useEffect(() => {
    setLoading(true);
    fetchTrending(timeWindow)
      .then((res: object) => {
        setData(res?.data.results);
      })
      .catch((error) => {
        console.log("Error in fetchTrending:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [timeWindow]);

  console.log("data:", data);

  if (loading) {
    <Skeleton />;
  }
  return (
    <Container maxW={"Container.xl"}>
      <Flex alignItems={"baseline"} gap={"4"} my={"10"}>
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          Trend
        </Heading>

        <Flex
          alignItems={"center"}
          gap={"2"}
          border={"1px solid teal"}
          borderRadius={"20px"}
        >
          <Box
            as="button"
            px="3"
            py="1"
            borderRadius={"20px"}
            bg={`${timeWindow === "day" ? "yellow.700" : ""}`}
            color={`${
              textColor === "black" && timeWindow === "day"
                ? "white"
                : textColor === "black" && timeWindow !== "day"
                ? "black"
                : "white"
            }`}
            onClick={() => setTimeWindow("day")}
          >
            Today
          </Box>
          <Box
            as="button"
            px="3"
            py="1"
            borderRadius={"20px"}
            bg={`${timeWindow === "week" ? "yellow.700" : ""}`}
            color={`${
              textColor === "black" && timeWindow === "week"
                ? "white"
                : textColor === "black" && timeWindow !== "week"
                ? "black"
                : "white"
            }`}
            onClick={() => setTimeWindow("week")}
          >
            This Week
          </Box>
        </Flex>
      </Flex>
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={4}
      >
        {data &&
          data?.map((item: IMovie, i: number) =>
            loading ? (
              <Skeleton height={300} key={i} />
            ) : (
              <CardComponent
                item={item}
                type={item?.media_type}
                key={item?.id}
              />
            )
          )}
      </Grid>
    </Container>
  );
};

export default Home;
