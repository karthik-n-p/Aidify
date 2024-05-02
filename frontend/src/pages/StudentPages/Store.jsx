import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  Box,
  Text,
  Input,
  Textarea,
  Button,
  VStack,
  Heading,
  Grid,
  GridItem,
  Image,
  Select,
  Spacer,
  HStack,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from '@chakra-ui/react';
import { auth } from './firebase-auth';
import AuthContext from './AuthContext';
import { MdDelete, MdEdit, MdFavoriteBorder } from 'react-icons/md';

function Marketplace() {
  const toast = useToast(); // Initialize useToast hook
  const [viewingMyProducts, setViewingMyProducts] = useState(false);
  const userdata = localStorage.getItem('authData');
  const seller = userdata ? JSON.parse(userdata).username : '';
  const sellersuid = userdata ? JSON.parse(userdata).uid : '';
  console.log('uid', sellersuid);
  console.log('username', seller);


  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    meetingPoint: '',
    email: '',
    image: '',
    attachments: null
  });

  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);


  const [showEditModal, setShowEditModal] = useState(false);
  const [productId, setProductId] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);
  

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://aidify.onrender.com/products');
      const data = response.data;
      console.log('data', data);
      const filteredData = viewingMyProducts
        ? data.filter((product) => product.sellersuid === sellersuid)
        : data.filter((product) => product.sellersuid !== sellersuid);

        console.log('filteredData', filteredData); 

      // Filter out the products that are not sold
      const filteredData2 = filteredData.filter((product) => product.status !== 'sold');
      
      console.log('filteredData2', filteredData2);

      setProducts(filteredData2);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleImageUpload = (e) => {
    setFormData({ ...formData, attachments: e.target.files[0] }); 
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithSeller = new FormData(); // Create a FormData object
      // Append form data fields
      formDataWithSeller.append('title', formData.title);
      formDataWithSeller.append('description', formData.description);
      formDataWithSeller.append('price', formData.price);
      formDataWithSeller.append('meetingPoint', formData.meetingPoint);
      formDataWithSeller.append('email', formData.email);
      formDataWithSeller.append('image', formData.image); // Append image file
      formDataWithSeller.append('seller', seller);
      formDataWithSeller.append('sellersuid', sellersuid);
    
      formDataWithSeller.append('attachments', formData.attachments); // Append image file
      console.log('formDataWithSeller', formDataWithSeller);
      // Make POST request with formDataWithSeller
      await axios.post('https://aidify.onrender.com/save-product', formDataWithSeller, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type header for FormData
        },
      });

      fetchProducts();
      setShowAddProductForm(false);

      toast({
        title: 'Product added successfully',
        description: 'You can see your product in My Products',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleSearch = async (searchText) => {
    try {
      
      const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setProducts(filteredProducts);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  const handleSort = async (sortBy) => {
    try {
      console.log('sortBy', sortBy);
     
      if(sortBy === 'price') {
        const sortedProducts = products.sort((a, b) => a.price - b.price);
        setProducts(sortedProducts);
      }
      else {
        const sortedProducts = products.sort((a, b) => b.price - a.price);
        setProducts(sortedProducts);
      }
      console.log('sortedProducts', products);


      
      
    } catch (error) {
      console.error('Error sorting products:', error);
    }
  };

  const handleToggleView = async () => {
    setViewingMyProducts(!viewingMyProducts);

    try {
      const response = await axios.get('https://aidify.onrender.com/products');
      const data = response.data;

      const filteredData = data.filter((product) => product.sellersuid !== sellersuid && product.status !== 'sold');



      setProducts(filteredData);
      console.log('filteredData', products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleMyProduct = async () => {
    try {
      const response = await axios.get('https://aidify.onrender.com/products');
      const data = response.data;
    
      const filteredData = data.filter((product) => product.sellersuid === sellersuid);
      setProducts(filteredData);
    
      setViewingMyProducts(true);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleBookProduct = async (productId) => {
    try {
      await axios.post('https://aidify.onrender.com/book-product', { productId, buyer: sellersuid });
      fetchProducts();
      setShowModal(true);
      setSelectedProduct(products.find((product) => product._id === productId));

     
    } catch (error) {
      console.error('Error booking product:', error);
    }
  };

  const handleAddToWishlist = async (productId) => {
    // Implement adding to wishlist functionality
  };

  const handleToggleAddProductForm = () => {
    setShowAddProductForm(!showAddProductForm);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleModalConfirm = () => {
    // Here you can implement sending an email or any other action upon confirmation
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleRevert = async (productId) => {
    console.log('productId', productId);
    try {
      await axios.put('https://aidify.onrender.com/revert-product', {productId: productId});
      fetchProducts();
    } catch (error) {
      console.error('Error reverting product:', error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`https://aidify.onrender.com/delete-product/${productId}`);

      fetchProducts();

      toast({
        title: 'Product removed successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  const handleedit = async (productId) => {
    console.log('productId', productId);
    const product = products.find((product) => product._id === productId);
    console.log('product', product);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      meetingPoint: product.meetingPoint,
      email: product.email,
      image: product.image,
    });
    setShowEditModal(true);
    setProductId(productId);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };


  const handleEditSubmit = async () => {
    try {
      const formDataWithSeller = {
        ...formData,
        seller: seller,
        sellersuid: sellersuid,
      };
      await axios.put(`https://aidify.onrender.com/update-product/${productId}`, formDataWithSeller);
      setShowEditModal(false);
      toast({
        title: 'Product edited successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };





  console.log('showmyproducts', viewingMyProducts);

  return (
    <VStack spacing={8} align="flex-start" p="20px 120px" bg={'bg'}>
      <HStack justify="space-between" w="100%">
        <Heading as="h1" size="xl">
          Marketplace
        </Heading>
        <HStack>
          <Button onClick={viewingMyProducts ? handleToggleView : handleMyProduct} colorScheme="teal" leftIcon={<MdFavoriteBorder />}>
            {viewingMyProducts ? 'See All products' : 'See My Products'}
          </Button>
          <Spacer />
          <Button colorScheme="blue" onClick={handleToggleAddProductForm}>
            Add Product
          </Button>
        </HStack>
      </HStack>
      <Box w="100%">
        <Heading as="h2" size="lg">
          Add New Product
        </Heading>
        {showAddProductForm && (
  <form onSubmit={handleSubmit}>
    <VStack spacing={3} align="flex-start">
      <Input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" />
      <Textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" />
      <Input type="text" name="price" value={formData.price} onChange={handleInputChange} placeholder="Price" />
      <Input type="text" name="meetingPoint" value={formData.meetingPoint} onChange={handleInputChange} placeholder="Meeting Point" />
      <Input type="tel" name="email" value={formData.email} onChange={handleInputChange} placeholder="PhoneNumber" />
      <input type="radio" id="uploadByUrl" name="imageType" value="url" onChange={() => setFormData({ ...formData, imageType: 'url' })} checked={formData.imageType === 'url'} />
      <label htmlFor="uploadByUrl">Upload Image by URL</label>
      <Input type="text" name="image" value={formData.image} onChange={handleInputChange} placeholder="Image URL" style={{ display: formData.imageType === 'url' ? 'block' : 'none' }} />
      <input type="radio" id="uploadByFile" name="imageType" value="file" onChange={() => setFormData({ ...formData, imageType: 'file' })} checked={formData.imageType === 'file'} />
      <label htmlFor="uploadByFile">Upload Image File</label>
      <Input  type="file" name="attachments" onChange={handleImageUpload} style={{ display: formData.imageType === 'file' ? 'block' : 'none' }} />
      <Button type="submit">Add Product</Button>
    </VStack>
  </form>
)}
      </Box>
      <Box w="100%">
        <Box mb={4}>
          <Input
            type="text"
            placeholder="Search products..."
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Select placeholder="Sort by" onChange={(e) => handleSort(e.target.value)}>
            <option value="price">Price (Low to High)</option>
            <option value="-price">Price (High to Low)</option>
          </Select>
        </Box>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {products.length === 0 && <Text>No products found</Text>}
          {products.map((product) => (
            <GridItem key={product._id}>
              <Box p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
              {product.attachments && product.attachments.length > 0 && product.attachments[0] !== '' ? (
  <Image src={`https://aidify.onrender.com/uploads/${product.attachments[0].filename}`} alt={product.attachments[0].filename} />
) : (
  <Image src={product.image} alt={'No Image Uploaded'} />
)}

                <Text mt={2} fontWeight="semibold">
                  {product.title}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {product.description}
                </Text>
              
                <Text fontSize="sm">Price: {product.price}</Text>
                <Text fontSize="sm">Meeting Point: {product.meetingPoint}</Text>
                <Text fontSize="sm">Phone Number: {product.email}</Text>
                {!viewingMyProducts && (
                  <Button onClick={() => handleBookProduct(product._id)} colorScheme="teal" mt={2}>
                    Book Product
                  </Button>
                )}
                {viewingMyProducts && (
                  <>
                  <Text fontSize="sm" color="gray.600">
                    Status: {product.status}
                  </Text>
                  <Button mr={'20px'} onClick={() => handleRemove(product._id)} colorScheme="red" mt={2}>
                    <MdDelete />
                  </Button>
                  <Button mr={'20px'} onClick={() => handleedit(product._id)} colorScheme="blue" mt={2}>
                    <MdEdit />
                  </Button>
                  {product.status == 'sold' && (
                    <>
                    
                    <Button onClick={() => handleRevert(product._id)} colorScheme="teal" mt={2}> 

                    Revert to Available
                    </Button>
                    <Text color="red" fontSize="sm" >
                    If the product is not sold, you can revert it to available
                    </Text>
                    </>
                  )
                    }
                 
                  </>
                )}
              </Box>

              
            </GridItem>
          ))}
        </Grid>

        {/* create a model for taking input for editing the product */}
        <Modal isOpen={showEditModal} onClose={handleEditModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={3} align="flex-start">
              <Input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" />
              <Textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" />
              <Input type="text" name="price" value={formData.price} onChange={handleInputChange} placeholder="Price" />
              <Input type="text" name="meetingPoint" value={formData.meetingPoint} onChange={handleInputChange} placeholder="Meeting Point" />
              <Input type="tel" name="email" value={formData.email} onChange={handleInputChange} placeholder="PhoneNumber" />
              <Input type="text" name="image" value={formData.image} onChange={handleInputChange} placeholder="Image URL" />
              <Button onClick={handleEditSubmit}>Edit Product</Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>



      </Box>
      <Modal  isOpen={showModal} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Booking is confired</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
       
            <Text>
              You can contact the seller at {selectedProduct && selectedProduct.email} and meet at{' '}
              {selectedProduct && selectedProduct.meetingPoint}.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleModalConfirm}>
              OK
            </Button>
           
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
}

export default Marketplace;
