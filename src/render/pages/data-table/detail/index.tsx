import { Box, CloseButton, Heading, Image } from "@chakra-ui/react";
import React from "react";
import { AppState } from "Store/index";
import { useAppSelector } from "Store/hooks";
import { useCallback } from "react";
import { NewAPICall } from "Api/api-interface";
import { useEffect } from "react";
import { useState } from "react";
import { ICountryEconomy } from "Types/deplomacy-interface";

interface IThisPage {
  onClose: () => void;
}

const DetailIndex = ({ onClose }: IThisPage): JSX.Element => {
  const country = useAppSelector((state: AppState) => state.deplomacy);

  const [dataInfo, setDataInfo] = useState<ICountryEconomy | undefined>(undefined);

  const [flagUrl, setFlagUrl] = useState<string | undefined>(undefined);

  const GetDetailEconomyAPI = useCallback(() => {
    if (country && country.selCountry) {
      const service = NewAPICall();
      service.GetDetailEconomy(country.selCountry).then((res) => {
        console.log(res?.data);
        if (res && res.data) {
          const result = res.data[0];
          setDataInfo({ ...result });
        }
      });
      service
        .GetCountryFlag(country.selCountry)
        .then((res) => {
          console.log("flag", res);
          if (res && res.data) {
            const result = res.data[0];
            setFlagUrl(result.download_url);
          }
        })
        .catch((err) => console.log("country flag api fail", err));
    }
  }, [country]);

  useEffect(() => {
    GetDetailEconomyAPI();
  }, [GetDetailEconomyAPI]);

  return (
    <Box w="50%" h="100vh" pos="absolute" top="0" right={0} bg="gray.800">
      <CloseButton onClick={() => onClose()}></CloseButton>
      {dataInfo && (
        <Box p={10}>
          <Heading>{dataInfo.country_nm}</Heading>
          {flagUrl && <Image src={flagUrl} />}
        </Box>
      )}
    </Box>
  );
};

export default DetailIndex;
