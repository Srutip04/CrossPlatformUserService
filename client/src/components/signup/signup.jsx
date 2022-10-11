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
  const [picLoading, setPicLoading] = useState(false);
  

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

const postImgDetails = (pics) =>{
   if (pics === undefined) {
     toast({
       title: "Please Select an Image!",
       status: "warning",
       duration: 5000,
       isClosable: true,
       position: "bottom",
     });
     return;
   }
   console.log(pics);

   if (pics.type === "image/jpeg" || pics.type === "image/png"){
     const data = new FormData();
     data.append("file", pics);
     data.append("upload_preset", "CrossPlatformUserService");
     data.append("cloud_name", "crossuser");
     fetch("https://api.cloudinary.com/v1_1/crossuser/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          // setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          // setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      // setPicLoading(false);
      return;
    }
   
}

const postCoverImg = (pics) =>{

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
                    <Input
                      type="file"
                      p={1.5}
                      accept="image/*"
                      onChange={(e) => postImgDetails(e.target.files[0])}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="coverImg" isRequired>
                    <FormLabel>Cover Image</FormLabel>
                    <Input
                      type="file"
                      p={1.5}
                      accept="image/*"
                      onChange={(e) => postCoverImg(e.target.files[0])}
                    />
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
