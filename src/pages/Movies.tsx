import { FC, useState, useEffect } from "react";
import {
  Container,
  Flex,
  Grid,
  Heading,
  Select,
  Skeleton,
} from "@chakra-ui/react";
//// Others
import { fetchMovies } from "../server/api";
import CardComponent from "../components/CardComponent";
import PaginationComponent from "../components/PageComponent";
import { IMovie } from "../types";

interface IMovieProps {}

const Movies: FC<IMovieProps> = (props) => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [activePage, setActivePage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("popularity.desc");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchMovies(activePage, sortBy)
      .then((res) => {
        setMovies(res?.results);
        setActivePage(res?.page);
        setTotalPages(res?.total_pages);
      })
      .catch((error) => {
        console.log("Error in fetchMovies:", error);
      })
      .finally(() => setIsLoading(false));
  }, [activePage, sortBy]);

  return (
    <Container maxW={"Container.xl"}>
      <Flex alignItems={"baseline"} gap={"4"} my="10">
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          Discover Movies
        </Heading>

        <Select
          w={"130px"}
          onChange={(e) => {
            setActivePage(1);
            setSortBy(e.target.value);
          }}
        >
          <option value="popularity.desc">Popular</option>
          <option value="vote_average.desc&vote_count.gte=1000">
            Top Rated
          </option>
          <option value="primary_release_date.desc&vote_count.gte=1000">
            Primary Release
          </option>
          <option value="title.asc&vote_count.gte=1000">
            Title
          </option>
        </Select>
      </Flex>

      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={"4"}
      >
        {movies &&
          movies?.map((item, i) =>
            isLoading ? (
              <Skeleton height={300} key={i} />
            ) : (
              <CardComponent item={item} type={"movie"} key={item?.id} />
            )
          )}
      </Grid>

      {/* Counts of page */}
      <PaginationComponent
        activePage={activePage}
        totalPages={totalPages}
        setActivePage={setActivePage}
      />
    </Container>
  );
};

export default Movies;
