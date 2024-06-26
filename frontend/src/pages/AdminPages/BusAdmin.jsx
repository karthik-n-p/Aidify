import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  HStack,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast // Step 1: Import the useToast hook
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { MdRemove } from 'react-icons/md';
import { FaEdit, FaTrash, FaWhatsapp } from 'react-icons/fa';
import html2canvas from 'html2canvas';



function BusAdmin() {
  const [userEmail, setUserEmail] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [busNo, setBusNo] = useState('');
  const [route, setRoute] = useState('');
  const [starttime, setStartTime] = useState('');
  const [returntime, setReturnTime] = useState('');
  const [capacity, setCapacity] = useState('');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddBusModal, setShowAddBusModal] = useState(false);
  const [buses, setBuses] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editBusId, setEditBusId] = useState('');
  const [editBusNo, setEditBusNo] = useState('');
  const [editRoute, setEditRoute] = useState('');
  const [editStartTime, setEditStartTime] = useState('');
  const [editReturnTime, setEditReturnTime] = useState('');
  const [editCapacity, setEditCapacity] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [showRegisteredUsersModal, setShowRegisteredUsersModal] = useState(false);
  const toast = useToast(); // Step 2: Initialize the useToast hook


  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      const response = await axios.get('https://aidify.onrender.com/get-buses');
      setBuses(response.data[0].busDetails);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch buses.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error('Error fetching buses:', error);
    }
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://aidify.onrender.com/bus-add-user', {
        email: userEmail,
        validity: selectedDate.toISOString()
      });
      setUserEmail('');
      setSelectedDate(new Date());
      fetchBuses();
      setShowAddUserModal(false);
      toast({
        title: 'Success',
        description: 'User added successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add user.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error('Error adding user:', error);
    }
  };

  const handleSubmitBus = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://aidify.onrender.com/save-bus', {
        busNo,
        route,
        starttime,
        returntime,
        capacity
      });
      setBusNo('');
      setRoute('');
      setStartTime('');
      setReturnTime('');
      setCapacity('');
      fetchBuses();
      setShowAddBusModal(false);
      toast({
        title: 'Success',
        description: 'Bus added successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add bus.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error('Error adding bus:', error);
    }
  };

  const handleRemoveBus = async (id) => {
    try {
      await axios.delete(`https://aidify.onrender.com/delete-bus/${id}`);
      fetchBuses();
      toast({
        title: 'Success',
        description: 'Bus removed successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove bus.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error('Error removing bus:', error);
    }
  };

  const handleMarkUnavailable = async (id) => {
    try {
      await axios.put(`https://aidify.onrender.com/mark-unavailable/${id}`);
      fetchBuses();
      toast({
        title: 'Success',
        description: 'Bus availability updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update bus availability.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error('Error updating bus availability:', error);
    }
  };

  // Function to open the edit modal and pre-fill the form with bus details
  const handleOpenEditModal = (bus) => {
    setEditBusId(bus._id);
    setEditBusNo(bus.busNo);
    setEditRoute(bus.route);
    setEditStartTime(bus.starttime);
    setEditReturnTime(bus.returntime);
    setEditCapacity(bus.capacity);
    setShowEditModal(true);
  };

  // Function to update bus details
  const handleUpdateBus = async () => {
    try {
      await axios.put(`https://aidify.onrender.com/edit-bus/${editBusId}`, {
        busNo: editBusNo,
        route: editRoute,
        starttime: editStartTime,
        returntime: editReturnTime,
        capacity: editCapacity
      });
      fetchBuses();
      setShowEditModal(false);
      toast({
        title: 'Success',
        description: 'Bus details updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update bus details.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error('Error updating bus details:', error);
    }
  };

  // Function to fetch registered users from the server
  const fetchRegisteredUsers = async () => {
    try {
      const response = await axios.get('https://aidify.onrender.com/bus-users');
      setRegisteredUsers(response.data);
      setShowRegisteredUsersModal(true);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch registered users.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error('Error fetching registered users:', error);
    }
  };

  // Automatically delete bus pass after validity
  useEffect(() => {
    const deleteUser = async () => {
      try {
        await axios.delete('https://aidify.onrender.com/delete-user');
        fetchBuses();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
    deleteUser();
  }, []);
  
  
  const formatBusDetailsAsTable = () => {
    // Header row of the table
    const headerRow = ['Bus No/Name', 'Route', 'Start Time', 'Return Time'];
  
    // Generate the header row string
    let table = 'Bus Schedule\n\n';
    table += headerRow.join('\t') + '\n';
  
    // Generate rows for each bus
    buses.forEach(bus => {
      const { busNo, route, starttime, returntime } = bus;
      const rowData = [busNo, route, starttime, returntime];
      
      // Pad each cell to ensure consistent column width
      const formattedRow = rowData.map(cell => cell.padEnd(12)).join('\t');
      
      table += formattedRow + '\n';
    });
  
    return table;
  };
  

  const handleShareOnWhatsApp = () => {
    const message = formatBusDetailsAsTable();
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  const handleDownloadTableImage = () => {
    // Find the table element by its id
    const table = document.getElementById('bus-schedule-table');

    //remove buttons from table
    const buttons = table.querySelectorAll('Button');
    //set display to none for buttons for 2sec
    buttons.forEach((button) => {
        button.style.display = 'none';
    });
    setTimeout(() => {
        buttons.forEach((button) => {
            button.style.display = 'block';
        });
    }, 10);

    //also remove last column of actions and capacity
    const ths = table.querySelectorAll('.thh');
    ths.forEach((th) => {
        th.style.display = 'none';
    });
    setTimeout(() => {

        ths.forEach((th) => {
            th.style.display = 'block';
        });
    }, 10);

   



    // Use html2canvas to capture the table as an image
    html2canvas(table)
      .then((canvas) => {
        // Convert the canvas to a data URL
        const imageUrl = canvas.toDataURL('image/png');

        // Create a temporary anchor element
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'bus_schedule.png';

        // Trigger the download
        link.click();
      })
      .catch((error) => {
        console.error('Error capturing table as image:', error);
      });
  };


  return (
    <HStack pl={150} gap={10}    bg={'bg'}>
      {/* Add User Modal */}
      <Modal isOpen={showAddUserModal} onClose={() => setShowAddUserModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add User and Pass Validity</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmitUser}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="Enter email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
              </FormControl>
              <FormControl mt={4} isRequired>
                <FormLabel>Pass Validity</FormLabel>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                  placeholderText="Select date"
                />
              </FormControl>
              <Button mt={4} colorScheme="blue" type="submit">Add User</Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Add Bus Modal */}
      <Modal isOpen={showAddBusModal} onClose={() => setShowAddBusModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Bus Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmitBus}>
              <FormControl isRequired>
                <FormLabel>Bus No/Name</FormLabel>
                <Input type="text" placeholder="Enter bus number" value={busNo} onChange={(e) => setBusNo(e.target.value)} />
              </FormControl>
              <FormControl mt={4} isRequired>
                <FormLabel>Route</FormLabel>
                <Input type="text" placeholder="Enter route" value={route} onChange={(e) => setRoute(e.target.value)} />
              </FormControl>
              <FormControl mt={4} isRequired>
                <FormLabel>Start Time</FormLabel>
                <Input type="time" placeholder="Enter start time" value={starttime} onChange={(e) => setStartTime(e.target.value)} />
              </FormControl>
              <FormControl mt={4} isRequired>
                <FormLabel>Return Time</FormLabel>
                <Input type="time" placeholder="Enter return time" value={returntime} onChange={(e) => setReturnTime(e.target.value)} />
              </FormControl>
              <FormControl mt={4} isRequired  >
                <FormLabel>Capacity</FormLabel>
                <Input type="text" placeholder="Enter capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
              </FormControl>
              <Button mt={4} colorScheme="blue" type="submit">Add Bus</Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Add User and Add Bus Section */}
      <VStack spacing={8} align="flex-start">
        <Box>
          <Heading as="h2" size="md" mb={4}>Add User and Pass Validity</Heading>
          <HStack>
          <Button onClick={() => setShowAddUserModal(true)} colorScheme="blue">Add User</Button>
            <Button onClick={fetchRegisteredUsers} colorScheme="green">View Registered Users</Button>
            </HStack>
        </Box>

        <Divider />

        <Box>
          <Heading as="h2" size="md" mb={4}>Add Bus Details</Heading>
          <Button onClick={() => setShowAddBusModal(true)} colorScheme="blue">Add Bus</Button>
        </Box>
      </VStack>

      <Divider orientation="vertical" />

      {/* View All Buses Section */}
      <Box>
        <Heading as="h2" size="md" mb={4}>All Buses</Heading>
        <Button onClick={handleShareOnWhatsApp} colorScheme="green" mr={'20px'} leftIcon={<FaWhatsapp />}>Share Schedule via WhatsApp</Button>
        <Button onClick={handleDownloadTableImage} colorScheme="blue">
        Download Table as Image
      </Button>
        <Table variant="striped" id="bus-schedule-table">
          <Thead>
            <Tr>
              <Th>Bus No/Name</Th>
              <Th>Route</Th>
              <Th>Start Time</Th>
              <Th>Return Time</Th>
              <Th className='thh'>Capacity</Th >
              <Th className='thh'>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {buses.map((bus) => (
              <Tr key={bus._id}>
                <Td>{bus.busNo}</Td>
                <Td>{bus.route}</Td>
                <Td>{bus.starttime}</Td>
                <Td>{bus.returntime}</Td>
                <Td className='thh'>{bus.seats.length}</Td>
                <Td className='thh'>
                    <HStack>
                  <Button className='Button' mr={'20px'} colorScheme="red" size="sm" onClick={() => handleRemoveBus(bus._id)}><FaTrash/></Button>
                  <Button colorScheme="green" size="sm" onClick={() => handleOpenEditModal(bus)}><FaEdit/></Button>
                  {bus.availiable ? <Button colorScheme="blue" size="sm" onClick={() => handleMarkUnavailable(bus._id)}>Mark Unavailable</Button> : <Button colorScheme="green" size="sm" onClick={() => handleMarkUnavailable(bus._id)}>Mark Available</Button>}
                
                </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>


      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Edit Bus Details</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <form>
        <FormControl isRequired>
          <FormLabel>Bus No/Name</FormLabel>
          <Input type="text" placeholder="Enter bus number" value={editBusNo} onChange={(e) => setEditBusNo(e.target.value)} />
        </FormControl>

        <FormControl mt={4} isRequired>
            <FormLabel>Route</FormLabel>
            <Input type="text" placeholder="Enter route" value={editRoute} onChange={(e) => setEditRoute(e.target.value)} />
            </FormControl>
            <FormControl mt={4} isRequired>
            <FormLabel>Start Time</FormLabel>
            <Input type="time" placeholder="Enter start time" value={editStartTime} onChange={(e) => setEditStartTime(e.target.value)} />
            </FormControl>
            <FormControl mt={4} isRequired>
            <FormLabel>Return Time</FormLabel>
            <Input type="time" placeholder="Enter return time" value={editReturnTime} onChange={(e) => setEditReturnTime(e.target.value)} />
            </FormControl>
            <FormControl mt={4} isRequired>
            <FormLabel>Capacity</FormLabel>
            <Input type="text" placeholder="Enter capacity" value={editCapacity} onChange={(e) => setEditCapacity(e.target.value)} />
            </FormControl>



      </form>
    </ModalBody>
    <ModalFooter>
      <Button colorScheme="blue" onClick={handleUpdateBus}>Update</Button>
      <Button variant="ghost" onClick={() => setShowEditModal(false)}>Cancel</Button>
    </ModalFooter>
  </ModalContent>
</Modal>


<Modal isOpen={showRegisteredUsersModal} onClose={() => setShowRegisteredUsersModal(false)}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Registered Users</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Email</Th>
            <Th>Validity</Th>
          </Tr>
        </Thead>
        <Tbody>
          {registeredUsers.map((user, index) => (
            <Tr key={index}>
              <Td>{user.email}</Td>
              <Td>{new Date(user.validity).toLocaleDateString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </ModalBody>
    <ModalFooter>
      <Button colorScheme="blue" onClick={() => setShowRegisteredUsersModal(false)}>Close</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
    </HStack>
  );
}

export default BusAdmin;
