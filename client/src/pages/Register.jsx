import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/register`,
        formData
      );
      localStorage.setItem("token", res.data.token);
      // Force a reload to update the Navbar state
      window.location.reload();
      toast({
        title: "Registration successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="md" py={10}>
      <VStack spacing={8}>
        <Heading>Register</Heading>
        <Box as="form" onSubmit={handleSubmit} w="100%">
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" w="100%">
              Register
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Register;
