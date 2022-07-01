/* eslint-disable no-console */

export default class TableUtils {
  // static updateOptions = (columnId: string, sortValue: boolean | undefined, originOptions: IFilterOption) => {
  //   const orderValue = sortValue === undefined ? "" : columnId;
  //   const sortResult = sortValue === undefined ? false : sortValue;
  //   const resultOption = {
  //     ...originOptions,
  //     asc: sortResult,
  //     order: originOptions.order === columnId ? orderValue : columnId,
  //   };
  //   return resultOption;
  // };

  /**
   * Pagination 생성
   * @param totalData 데이터 전체 수
   * @returns pagination 배열
   */
  static createPagination = (totalData: number, perPageCount?: number) => {
    const count = perPageCount || 10;
    const arrayLength = Math.ceil(totalData / count);
    const newIndexBox: number[] = [];
    for (let i = 0; i < arrayLength; i++) {
      newIndexBox.push(i);
    }
    return newIndexBox;
  };

  static displayPagination = (totalPagesLength: number[], pageIndex: number) => {
    const lastNumber = totalPagesLength.length;
    let newArray;

    if (pageIndex > 0 && pageIndex <= 3) {
      newArray = totalPagesLength.slice(0, 5);
    } else if (pageIndex > 3 && pageIndex < lastNumber - 2) {
      newArray = totalPagesLength.slice(pageIndex - 3, pageIndex + 2);
    } else if (pageIndex >= lastNumber - 2) {
      if (totalPagesLength.length >= 5) {
        newArray = totalPagesLength.slice(lastNumber - 5, lastNumber);
      } else {
        newArray = totalPagesLength.slice(0, 5);
      }
    }

    return newArray;
  };
}
