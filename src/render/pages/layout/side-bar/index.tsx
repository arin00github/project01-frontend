import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const SideBar = (): JSX.Element => {
  return (
    <Box h="100vh" w={{ base: "240px", "2xl": "300px" }} borderRight="1px solid" borderColor="gray.500">
      <Box h="70px" bg="linear-gradient(to left, #463ABB, #1B8EDB)">
        <Text textColor="white" padding="7%">
          G I S - S E R V I C E
        </Text>
      </Box>
      <Flex flexDirection="column" margin={{ base: "10%", "2xl": "13%" }}>
        <Flex>
          <Box>
            <Avatar size="xl" bg="#1B8EDB" flexWrap="nowrap" />
          </Box>
          <Box ml="5%" mt="7%">
            <Text textColor="#AFDAF6">이노뎁</Text>
          </Box>
        </Flex>
      </Flex>
      <Box mb={4}>
        <Box w="70%" m="0 auto" display="flex" color="white" fontSize="15px" textAlign="center">
          <Text borderRight="1px solid white" w="100%" cursor="pointer">
            <Link to="/my-page">마이 페이지</Link>
          </Text>
          <Text
            w="100%"
            cursor="pointer"
            onClick={() => {
              //  keycloak.logout();
            }}
          >
            로그아웃
          </Text>
        </Box>
      </Box>
      <Box>
        <Link to="/">
          <Box w="100%" h="40px" lineHeight="40px" px="16px">
            대시보드
          </Box>
        </Link>
        <Link to="/gis-monitoring">
          <Box w="100%" h="40px" lineHeight="40px" px="16px">
            gis 모니터링
          </Box>
        </Link>
        <Link to="/data-list">
          <Box w="100%" h="40px" lineHeight="40px" px="16px">
            데이터 리스트
          </Box>
        </Link>
        {/* <PerfectScrollbar
          ref={(ref) => {
            setScrollH(ref);
          }}
        >
          <Box minH="460px">
            <Link to={"/"}>
              <SideMenu name="Dashboard" path="/" />
            </Link>
            <SideMenu name="모니터링" monitoring={true} />
            <Link to={"/user-manage"}>
              <SideMenu name="이용자 관리" path="/user-manage" />
            </Link>
            <Link to={"/partner-manage"}>
              <SideMenu name="파트너사 관리" path="/partner-manage" />
            </Link>
          </Box>
        </PerfectScrollbar> */}
      </Box>
    </Box>
  );
};
