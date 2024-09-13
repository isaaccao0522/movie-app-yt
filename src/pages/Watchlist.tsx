import { FC, useState, useEffect } from "react";
import { Container, Flex, Grid, Heading, Spinner } from "@chakra-ui/react";
//// Firebase
import { useFirestore } from "../server/firestore";
////Others
import { useAuth } from "../context/useAuth";
import WatchlistCard from "../components/WatchlistCard";
import { IMovie, ITVShows } from "../types";

interface IWatchlistProps {}

const Watchlist: FC<IWatchlistProps> = (props) => {
  const { user } = useAuth();
  const { getWatchlist } = useFirestore();
  const [watchlist, setWatchlist] = useState<IMovie[] | ITVShows[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user?.uid) {
      getWatchlist(user?.uid)
        .then((data) => {
          setWatchlist(data);
          console.log(data);
        })
        .catch((error) => {
          console.log("Error", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [user?.uid, getWatchlist]);

  return (
    <Container maxW={"container.xl"}>
      <Flex alignItems={"baseline"} gap={"4"} my={"10"}>
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          Watchlist
        </Heading>
      </Flex>
      {isLoading && (
        <Flex justify={"center"} mt="10">
          <Spinner size={"xl"} color="red" />
        </Flex>
      )}
      {!isLoading && watchlist?.length === 0 && (
        <Flex justify={"center"} mt="10">
          <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
            Watchlist is empty
          </Heading>
        </Flex>
      )}
      {!isLoading && watchlist?.length > 0 && (
        <Grid
          templateColumns={{
            base: "1fr",
          }}
          gap={"4"}
        >
          {watchlist?.map((item) => (
            <WatchlistCard
              key={item?.id}
              item={item}
              type={item?.type}
              setWatchlist={setWatchlist}
            />
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Watchlist;
