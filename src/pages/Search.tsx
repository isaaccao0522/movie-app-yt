import { FC, useState, useEffect } from "react";
import {
  Container,
  Flex,
  Grid,
  Heading,
  Input,
  Skeleton,
  Spinner,
  useComponentStyles__unstable,
} from "@chakra-ui/react";
//// Others
import { searchData } from "../server/api";
import CardComponent from "../components/CardComponent";
import PageComponent from "../components/PageComponent";
import { IMovie } from "../types";

interface ISearchProps {}

const Search: FC<ISearchProps> = (props) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [tempSearchValue, setTempSearchValue] = useState<string>("");
  const [activePage, setActivePage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<IMovie[]>([]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(tempSearchValue);
    setSearchValue(tempSearchValue);
  };

  useEffect(() => {
    console.log(searchValue);
    setIsLoading(true);
    searchData(searchValue, activePage)
      .then((res) => {
        console.log("Res:", res?.results);
        setData(res?.results);
        setActivePage(res?.page);
        setTotalPages(res?.total_pages);
      })
      .catch((err) => console.log("Err in search data:", err))
      .finally(() => setIsLoading(false));
  }, [searchValue, activePage]);

console.log ( data)

  return (
    <Container maxW={"container.xl"}>
      <Flex alignItems={"baseline"} gap={"4"} my={"10"}>
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          Search
        </Heading>
      </Flex>
      <form onSubmit={handleSearch}>
        <Input
          placeholder="Search movies, tv shows..."
          _placeholder={{ color: "gray.100" }}
          value={tempSearchValue}
          onChange={(e) => setTempSearchValue(e.target.value)}
        />
      </form>

      {isLoading && (
        <Flex justifyContent={"center"} mt="10">
          <Spinner size={"xl"} color="red" />
        </Flex>
      )}
      {data?.length === 0 && !isLoading && (
        <Heading textAlign={"center"} as="h3" fontSize={"sm"} mt="10">
          No results found
        </Heading>
      )}
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={"4"}
        mt="6"
      >
        {data?.length > 0 &&
          !isLoading &&
          data?.map((item: IMovie, i: number) =>
            isLoading ? (
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
      {data?.length > 0 && !isLoading && (
        <PageComponent
          activePage={activePage}
          totalPages={totalPages}
          setActivePage={setActivePage}
        />
      )}
    </Container>
  );
};

export default Search;
