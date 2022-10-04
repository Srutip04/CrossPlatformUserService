import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Textarea,
  IconButton,
} from "@chakra-ui/react";

import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {

  const toast = useToast();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async () =>{
     
     if (!name || !email || !password || !confirmpassword || !aadharNo) {
       toast({
         title: "Please Fill all the Feilds",
         status: "warning",
         duration: 5000,
         isClosable: true,
         position: "bottom",
       });
     
       return;
     }
     if (password !== confirmpassword) {
       toast({
         title: "Passwords Do Not Match",
         status: "warning",
         duration: 5000,
         isClosable: true,
         position: "bottom",
       });
       return;
     }

     try{
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      }
     
     const {data} = await axios.post(
      "/api/user",{
        name,
        email,
        password,
        walletAddress,
        aadharNo,
        isWeb3,
        img,
        coverImg,
        bio,
        socials

      },
      config
     );
     console.log(data);

      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
  } catch(error){
     toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
  }
}
  return (
    <div>
      <VStack spacing="10px">
        <Stack spacing={8} mx={"auto"} maxW={"729px"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <Box>
                <FormControl id="username" isRequired>
                  <FormLabel>User Name</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
              </Box>

              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <HStack>
                <Box pr={10}>
                  <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <InputRightElement h={"full"}>
                        <Button
                          variant={"ghost"}
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }
                        >
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl id="cpassword" isRequired>
                    <FormLabel>Confirm Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => setConfirmpassword(e.target.value)}
                      />
                      <InputRightElement h={"full"}>
                        <Button
                          variant={"ghost"}
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }
                        >
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                </Box>
              </HStack>

              <HStack>
                <Box pr={10}>
                  <FormControl id="walletAddress" isRequired>
                    <FormLabel>Wallet Address</FormLabel>
                    <Input type="text" />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="aadharNo" isRequired>
                    <FormLabel>Aadhar Number</FormLabel>
                    <Input type="number" />
                  </FormControl>
                </Box>
              </HStack>

              <HStack>
                <Box>
                  <FormControl id="img" isRequired>
                    <FormLabel>Image</FormLabel>
                    <Input type="file" />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="coverImg" isRequired>
                    <FormLabel>Cover Image</FormLabel>
                    <Input type="file" />
                  </FormControl>
                </Box>
              </HStack>

              <Box>
                <FormControl id="bio" isRequired>
                  <FormLabel>Bio</FormLabel>
                  <Textarea placeholder="Enter Bio" size="sm" />
                </FormControl>
              </Box>

              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={submitHandler}
                >
                  Sign up
                </Button>
              </Stack>
              {/* <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link onClick={() => navigate("/login")} color={"blue.400"}>
                    Login
                  </Link>
                </Text>
              </Stack> */}
            </Stack>
          </Box>
        </Stack>
      </VStack>
    </div>
  );
};

export default Signup;
