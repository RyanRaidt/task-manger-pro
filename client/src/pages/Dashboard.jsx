import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Heading,
  Button,
  VStack,
  HStack,
  Text,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  useDisclosure,
  useColorModeValue,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, AddIcon } from "@chakra-ui/icons";
import axios from "axios";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "pending",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();
  const bgColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchTasks();
  }, [navigate]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (error) {
      toast({
        title: "Error fetching tasks",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, taskForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
      setTaskForm({
        title: "",
        description: "",
        priority: "medium",
        status: "pending",
      });
      onClose();
      toast({
        title: "Task created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error creating task",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
      toast({
        title: "Task deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error deleting task",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setTaskForm({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
    });
    onOpen();
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_API_URL}/tasks/${editingTask._id}`,
        taskForm,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchTasks();
      setTaskForm({
        title: "",
        description: "",
        priority: "medium",
        status: "pending",
      });
      setEditingTask(null);
      onClose();
      toast({
        title: "Task updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error updating task",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "yellow";
      case "low":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <div className="dashboard-container">
      <Container maxW="1200px">
        <Card boxShadow="lg" borderRadius="lg">
          <CardHeader>
            <Flex align="center">
              <Heading size="lg">Your Tasks</Heading>
              <Spacer />
              <Button
                leftIcon={<AddIcon />}
                colorScheme="teal"
                onClick={onOpen}
                size="md"
              >
                Create Task
              </Button>
            </Flex>
          </CardHeader>
          <CardBody>
            <Box overflowX="auto">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Title</Th>
                    <Th>Description</Th>
                    <Th>Priority</Th>
                    <Th>Status</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {tasks.map((task) => (
                    <Tr key={task._id} _hover={{ bg: "gray.50" }}>
                      <Td fontWeight="medium">{task.title}</Td>
                      <Td>{task.description}</Td>
                      <Td>
                        <Badge colorScheme={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </Td>
                      <Td>
                        <Badge
                          colorScheme={
                            task.status === "completed"
                              ? "green"
                              : task.status === "in-progress"
                              ? "blue"
                              : "yellow"
                          }
                        >
                          {task.status}
                        </Badge>
                      </Td>
                      <Td>
                        <HStack spacing={2}>
                          <IconButton
                            icon={<EditIcon />}
                            colorScheme="blue"
                            variant="ghost"
                            onClick={() => handleEditTask(task)}
                            aria-label="Edit task"
                          />
                          <IconButton
                            icon={<DeleteIcon />}
                            colorScheme="red"
                            variant="ghost"
                            onClick={() => handleDeleteTask(task._id)}
                            aria-label="Delete task"
                          />
                        </HStack>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </CardBody>
        </Card>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {editingTask ? "Edit Task" : "Create New Task"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={editingTask ? handleUpdateTask : handleCreateTask}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Title</FormLabel>
                  <Input
                    name="title"
                    value={taskForm.title}
                    onChange={(e) =>
                      setTaskForm({ ...taskForm, title: e.target.value })
                    }
                    placeholder="Enter task title"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    name="description"
                    value={taskForm.description}
                    onChange={(e) =>
                      setTaskForm({ ...taskForm, description: e.target.value })
                    }
                    placeholder="Enter task description"
                    minH="150px"
                    resize="vertical"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    name="priority"
                    value={taskForm.priority}
                    onChange={(e) =>
                      setTaskForm({ ...taskForm, priority: e.target.value })
                    }
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Status</FormLabel>
                  <Select
                    name="status"
                    value={taskForm.status}
                    onChange={(e) =>
                      setTaskForm({ ...taskForm, status: e.target.value })
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </Select>
                </FormControl>
                <Button type="submit" colorScheme="teal" w="100%">
                  {editingTask ? "Update Task" : "Create Task"}
                </Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Dashboard;
