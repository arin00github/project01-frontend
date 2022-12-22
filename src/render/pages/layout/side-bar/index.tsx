import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const SideBar = (): JSX.Element => {
  return (
    <Box h="100vh" w="240px" borderRight="1px solid" borderColor="gray.500">
      <Box h="70px" bg="linear-gradient(to left, #463ABB, #1B8EDB)">
        <Text textColor="white" padding="7%">
          W O R L D - S E R V I C E
        </Text>
      </Box>
      <Flex flexDirection="column" margin={{ base: "10%", "2xl": "13%" }}></Flex>
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
        <Link to="/gis-monitoring2">
          <Box w="100%" h="40px" lineHeight="40px" px="16px">
            gis 모니터링2
          </Box>
        </Link>
        <Link to="/naver-map">
          <Box w="100%" h="40px" lineHeight="40px" px="16px">
            네이버 지도
          </Box>
        </Link>
        <Link to="/data-list">
          <Box w="100%" h="40px" lineHeight="40px" px="16px">
            데이터 리스트
          </Box>
        </Link>
        <Link to="/world-map">
          <Box w="100%" h="40px" lineHeight="40px" px="16px">
            세계지도
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
