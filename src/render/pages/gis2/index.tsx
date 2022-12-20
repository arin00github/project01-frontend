import React, { useEffect } from "react";
import { register } from "ol/proj/proj4";
import GisEntry2 from "Component/gis2";
import axios from "axios";
import { Box } from "@chakra-ui/react";

const GisIndex = (): JSX.Element => {
  console.log("gis index page");

  // const getData = async () => {
  //   axios({
  //     method: "GET",
  //     url: "http://map.ngii.go.kr/openapi/wmts_ngiiMap_v6.4.3.js?apikey=B1012B4A6CF3C94B4C077DC24B447B7B",
  //   }).then((res) => {
  //     console.log("getData", res.data);
  //   });
  // };

  useEffect(() => {
    //getData();
    // const mapObject = new ngii_wmts();
  }, []);
  return (
    <>
      <Box w="100%" h="100vh" id="map22" display="none"></Box>
      <GisEntry2 />;
    </>
  );
};

export default GisIndex;
