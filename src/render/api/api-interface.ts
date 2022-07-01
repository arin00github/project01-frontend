import { IOneFilter, IOptions } from "Types/table-inteface";
import { IResultCode, IDeplomacyList } from "../types/deplomacy-interface";
import { ApiCollection } from "./api-definition";

export interface IApiCollection {
  GetTotalCountry(pageNo: number, numOfRow?: number): Promise<IResultCode<IDeplomacyList> | undefined>;
  GetCountryInfo(options: IOneFilter): Promise<IResultCode<IDeplomacyList> | undefined>;
}

export const NewAPICall = (bearerToken?: string): IApiCollection => {
  return new ApiCollection();
};
