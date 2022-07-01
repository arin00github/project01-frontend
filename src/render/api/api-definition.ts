import axios, { AxiosRequestConfig } from "axios";
import { IResultCode, IDeplomacyList, ICountryEconomy, ICountryFlag } from "Types/deplomacy-interface";
import { IOneFilter, IOptions } from "Types/table-inteface";
import { IApiCollection } from "./api-interface";

export class ApiCollection implements IApiCollection {
  static readonly baseUrl = "http://apis.data.go.kr/1262000/OverviewKorRelationService/getOverviewKorRelationList";
  static readonly economyUrl = "https://apis.data.go.kr/1262000/CountryEconomyService2/getCountryEconomyList2";
  static readonly flagUrl = "http://apis.data.go.kr/1262000/CountryMapService2/getCountryMapList2";
  static readonly API_KEY = process.env.REACT_APP_DEPLO_API_KEY;

  //constructor(private bearerToken: string) {}

  private static async executeRequest(path: string, config?: AxiosRequestConfig): Promise<Record<string, unknown>> {
    try {
      const result = axios(path, config);
      return result as object as Record<string, unknown>;
    } catch (err) {
      const anyResult = err as Record<string, unknown>;
      if (anyResult && anyResult.response) {
        return anyResult.response as object as Record<string, unknown>;
      }
    }
    return {};
  }

  async GetCountryInfo(options: IOneFilter): Promise<IResultCode<IDeplomacyList> | undefined> {
    const detailStrig = `cond[country_nm::EQ]=${options.name} &cond[country_iso_alp2::EQ]=${options.iso}`;

    const URL = `${ApiCollection.baseUrl}?serviceKey=${ApiCollection.API_KEY}&pageNo=1&numOfRows=10 ${detailStrig}`;

    const response = await ApiCollection.executeRequest(URL, {
      method: "GET",
    });

    if (response && response.data) {
      return response.data as IResultCode<IDeplomacyList>;
    }

    return undefined;
  }

  async GetTotalCountry(pageNo: number, numOfRow?: number): Promise<IResultCode<IDeplomacyList> | undefined> {
    const perPageRows = numOfRow || 10;

    const URL = `${ApiCollection.baseUrl}?serviceKey=${ApiCollection.API_KEY}&pageNo=${pageNo}&numOfRows=${perPageRows}`;

    const response = await ApiCollection.executeRequest(URL, {
      method: "GET",
    });

    if (response && response.data) {
      return response.data as IResultCode<IDeplomacyList>;
    }

    return undefined;
  }

  async GetDetailEconomy(country: { iso: string; name: string }): Promise<IResultCode<ICountryEconomy> | undefined> {
    const detailStrig = `cond[country_nm::EQ]=${country.name} &cond[country_iso_alp2::EQ]=${country.iso}`;

    const URL = `${ApiCollection.economyUrl}?serviceKey=${ApiCollection.API_KEY}&pageNo=1&numOfRows=10 ${detailStrig}`;

    const response = await ApiCollection.executeRequest(URL, {
      method: "GET",
    });

    if (response && response.data) {
      return response.data as IResultCode<ICountryEconomy>;
    }

    return undefined;
  }

  async GetCountryFlag(country: { iso: string; name: string }): Promise<IResultCode<ICountryFlag> | undefined> {
    const detailStrig = `cond[country_nm::EQ]=${country.name} &cond[country_iso_alp2::EQ]=${country.iso}`;

    const URL = `${ApiCollection.flagUrl}?serviceKey=${ApiCollection.API_KEY}&pageNo=1&numOfRows=10 ${detailStrig}`;

    const response = await ApiCollection.executeRequest(URL, {
      method: "GET",
    });

    if (response && response.data) {
      return response.data as IResultCode<ICountryFlag>;
    }

    return undefined;
  }
}
