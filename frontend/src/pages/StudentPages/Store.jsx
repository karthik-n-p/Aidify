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
} from '@chakra-ui/react';
import { auth } from './firebase-auth';
import AuthContext from './AuthContext';
import { MdFavoriteBorder } from 'react-icons/md';

function Marketplace() {
  const {username} = useContext(AuthContext); // Get username from the AuthContext
  const {uid} = useContext(AuthContext);
  console.log("uid",uid,"username",username)

  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    meetingPoint: '',
    seller: {username},
    email: '',
    sellersuid: {uid},
    image: ''
    
    
  });


  const [showAddProductForm, setShowAddProductForm] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Form data:', formData);
      await axios.post('http://localhost:3000/save-product', formData);
      setFormData({
        title: '',
        description: '',
        price: '',
        meetingPoint: '',
        email: '',
        image: '',
        sellersuid: uid,
        seller: username
      });
      fetchProducts(); // Refresh product list after adding a new product
      setShowAddProductForm(false); // Hide add product form after submission
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleSearch = async (searchText) => {
    try {
      const response = await axios.get(`http://localhost:3000/products`);
      const filteredProducts = response.data.filter((product) =>
        product.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setProducts(filteredProducts);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  const handleSort = async (sortBy) => {
    try {
      const response = await axios.get(`http://localhost:3000/products?sort=${sortBy}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error sorting products:', error);
    }
  };

  const handleBookProduct = async (productId) => {
    try {
      await axios.post('http://localhost:3000/book-product', { productId, buyer: uid });
      fetchProducts(); // Refresh product list after booking
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

  return (
    <VStack spacing={8} align="flex-start" p={8} ml="10%" width="80%">
      <HStack justify="space-between" w="100%">
        <Heading as="h1" size="xl">Marketplace</Heading>
        <HStack>
          <Button colorScheme="teal" leftIcon={<MdFavoriteBorder />}>My Products</Button>
          <Spacer />
          <Button colorScheme="blue" onClick={handleToggleAddProductForm}>Add Product</Button>
        </HStack>
      </HStack>
      <Box w="100%">
        <Heading as="h2" size="lg" mb="30px">Add New Product</Heading>
        {showAddProductForm && (
          <form onSubmit={handleSubmit}>
            <VStack spacing={3} align="flex-start">
              <Input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" />
              <Textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" />
              <Input type="text" name="price" value={formData.price} onChange={handleInputChange} placeholder="Price" />
              <Input type="text" name="meetingPoint" value={formData.meetingPoint} onChange={handleInputChange} placeholder="Meeting Point" />
              <Input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" />
              <Input type="text" name="image" value={formData.image} onChange={handleInputChange} placeholder="Image URL" />
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
                <Image src={product.image} alt={product.title} borderRadius="md" />
                <Text mt={2} fontWeight="semibold">{product.title}</Text>
                <Text fontSize="sm" color="gray.600">{product.description}</Text>
                <Text fontSize="sm">Price: ${product.price}</Text>
                <Text fontSize="sm">Meeting Point: {product.meetingPoint}</Text>
                <Text fontSize="sm">Email: {product.email}</Text>
                <Button onClick={() => handleBookProduct(product._id)} colorScheme="teal" mt={2}>Book</Button>
             
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Box>
      
    </VStack>
  );
}

export default Marketplace;
