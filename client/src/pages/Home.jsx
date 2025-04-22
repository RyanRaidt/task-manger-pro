import {
  Container,
  Heading,
  Text,
  Button,
  VStack,
  SimpleGrid,
  Icon,
  Card,
  CardBody,
  CardHeader,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { FaTasks, FaCheckCircle, FaChartLine } from "react-icons/fa";
import { useEffect, useState } from "react";

const FeatureCard = ({ icon, title, description }) => (
  <Card
    boxShadow="md"
    borderRadius="lg"
    p={6}
    _hover={{ transform: "translateY(-5px)", transition: "all 0.2s" }}
  >
    <CardHeader>
      <Icon as={icon} w={10} h={10} color="teal.500" mb={4} />
      <Heading size="md" mb={2}>
        {title}
      </Heading>
    </CardHeader>
    <CardBody>
      <Text color="gray.600">{description}</Text>
    </CardBody>
  </Card>
);

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="home-container">
      <Container maxW="1200px">
        <VStack spacing={12} align="center">
          <VStack spacing={6} textAlign="center" maxW="800px">
            <Heading
              size="2xl"
              bgGradient="linear(to-r, teal.500, teal.300)"
              bgClip="text"
            >
              Task Manager Pro
            </Heading>
            <Text fontSize="xl" color="gray.600">
              Streamline your workflow and boost productivity with our powerful
              task management solution. Organize, prioritize, and track your
              tasks with ease.
            </Text>
            <Button
              onClick={handleGetStarted}
              colorScheme="teal"
              size="lg"
              px={8}
              py={6}
              fontSize="lg"
            >
              {isLoggedIn ? "Go to Dashboard" : "Get Started"}
            </Button>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="100%">
            <FeatureCard
              icon={FaTasks}
              title="Task Management"
              description="Create, organize, and manage your tasks efficiently with our intuitive interface."
            />
            <FeatureCard
              icon={FaCheckCircle}
              title="Priority Tracking"
              description="Set priorities and track progress to ensure important tasks are completed on time."
            />
            <FeatureCard
              icon={FaChartLine}
              title="Productivity Insights"
              description="Gain valuable insights into your productivity patterns and improve your workflow."
            />
          </SimpleGrid>
        </VStack>
      </Container>
    </div>
  );
};

export default Home;
