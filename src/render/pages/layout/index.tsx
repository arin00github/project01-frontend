import { Box } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router";
import { SideBar } from "./side-bar";
export const Layout = (): JSX.Element => {
  return (
    <>
      <Box w="100%" display="flex">
        <SideBar />
        <Box
          w="calc(100% - 240px)"
          h="100vh"
          pos="relative"
          // pos="fixed"
          //  top="0"
          //  left={{ base: "240px", "2xl": "300px" }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
};
