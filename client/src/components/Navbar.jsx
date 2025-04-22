import {
  Box,
  Flex,
  Button,
  Link,
  Heading,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const bgColor = useColorModeValue("teal.500", "teal.700");
  const hoverBgColor = useColorModeValue("teal.600", "teal.600");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast({
      title: "Logged out successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    navigate("/");
  };

  return (
    <Box
      bg={bgColor}
      px={4}
      py={4}
      boxShadow="md"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex maxW="1200px" mx="auto" justify="space-between" align="center">
        <Link as={RouterLink} to="/" _hover={{ textDecoration: "none" }}>
          <Heading size="lg" color="white" letterSpacing="tight">
            Task Manager Pro
          </Heading>
        </Link>
        <Flex gap={4} align="center">
          {isLoggedIn ? (
            <>
              <Button
                as={RouterLink}
                to="/dashboard"
                colorScheme="whiteAlpha"
                variant="ghost"
                _hover={{ bg: "whiteAlpha.200" }}
              >
                Dashboard
              </Button>
              <Button
                onClick={handleLogout}
                colorScheme="whiteAlpha"
                variant="outline"
                _hover={{ bg: "whiteAlpha.200" }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                as={RouterLink}
                to="/login"
                colorScheme="whiteAlpha"
                variant="ghost"
                _hover={{ bg: "whiteAlpha.200" }}
              >
                Login
              </Button>
              <Button
                as={RouterLink}
                to="/register"
                colorScheme="whiteAlpha"
                _hover={{ bg: "whiteAlpha.200" }}
              >
                Register
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
