import { Box } from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";

const NaverMapIndex = () => {
  const map = useRef<naver.maps.Map>();
  const initMap = useCallback(() => {
    const center: naver.maps.LatLng = new naver.maps.LatLng(37.3595704, 127.105399);
    const minPoint: naver.maps.Point = new naver.maps.Point(36, 125);
    const maxPoint: naver.maps.Point = new naver.maps.Point(38, 128);
    const pointBoundsArray = new naver.maps.PointBounds(minPoint, maxPoint);

    map.current = new naver.maps.Map("naver-map", {
      center: center,
      zoom: 16,
    });
    //map.current.setCenter({ lat: 37.5666103, lng: 126.9783882 });
    //map.current.fitBounds(pointBoundsArray);
    //실패
    //map.current.setCenterPoint(point);
  }, [map]);

  useEffect(() => {
    initMap();
  }, [initMap]);

  return (
    <>
      <Box w="100%" h="100vh" id="naver-map"></Box>
    </>
  );
};

export default NaverMapIndex;
