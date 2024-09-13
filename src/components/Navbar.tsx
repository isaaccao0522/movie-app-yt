import React from "react";
import { Link } from "react-router-dom";
//// Ui & Icons
import {
  useColorMode,
  useColorModeValue,
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon, HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
//// Others
import { useAuth } from "../context/useAuth";

const Navbar = () => {
  const { user, signInWithGoogle, logout } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const { onOpen, isOpen, onClose } = useDisclosure();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle(user);
      console.log("Success");
    } catch (error) {
      console.log("Error in Google login", error);
    }
  };
  return (
    <Box py="4" mb="2">
      <Container maxW={"Container.xl"}>
        <Flex justifyContent={"space-between"}>
          <Link to="/">
            <Box
              fontSize={"2xl"}
              fontWeight={"bold"}
              color={"red"}
              letterSpacing={"widest"}
              fontFamily={"mono"}
            >
              Four Lucks
            </Box>
          </Link>
          <Flex align={ "center"} gap={"5"}>
            <button onClick={toggleColorMode}>
              {colorMode === "dark" ? (
                <SunIcon boxSize={6} />
              ) : (
                <MoonIcon boxSize={6} />
              )}
            </button>
            <Box>
              {user && (
                <Menu>
                  <MenuButton>
                    <Avatar
                      bg={"red.500"}
                      color={"white"}
                      size={"sm"}
                      name={user?.email}
                    />
                  </MenuButton>
                  <MenuList>
                    <Link to="/watchlist">
                      <MenuItem>Watchlist</MenuItem>
                    </Link>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              )}
              {!user && (
                <Avatar
                  size={"sm"}
                  bg={"gray.800"}
                  as="button"
                  onClick={handleGoogleLogin}
                />
              )}
            </Box>
          </Flex>
        </Flex>

        {/* DESKTOP */}
        <Flex
          gap="4"
          alignItems={"center"}
          display={{ base: "none", md: "flex" }}
        >
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/shows">TV Shows</Link>
          <Link to="/search">
            <SearchIcon fontSize={"xl"} />
          </Link>
        </Flex>

        {/* Mobile */}
        <Flex
          display={{ base: "flex", md: "none" }}
          alignItems={"center"}
          gap="4"
        >
          <Link to="/search">
            <SearchIcon fontSize={"xl"} />
          </Link>
          <IconButton
            onClick={onOpen}
            icon={<HamburgerIcon />}
            aria-label="List"
          />
          <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent bg={"black"}>
              <DrawerCloseButton />
              <DrawerHeader>
                {/* {user ? (
                  <Flex alignItems="center" gap="2">
                    <Avatar bg="red.500" size={"sm"} name={user?.email} />
                    <Box fontSize={"sm"}>
                      {user?.displayName || user?.email}
                    </Box>
                  </Flex>
                ) : (
                  <Avatar
                    size={"sm"}
                    bg="gray.800"
                    as="button"
                    onClick={handleGoogleLogin}
                  />
                )} */}
              </DrawerHeader>

              <DrawerBody>
                <Flex flexDirection={"column"} gap={"4"} onClick={onClose}>
                  <Link to="/">Home</Link>
                  <Link to="/movies">Movies</Link>
                  <Link to="/shows">TV Shows</Link>
                  {/* {user && (
                    <>
                      <Link to="/watchlist">Watchlist</Link>
                      <Button
                        variant={"outline"}
                        colorScheme="red"
                        onClick={logout}
                      >
                        Logout
                      </Button>
                    </>
                  )} */}
                </Flex>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
