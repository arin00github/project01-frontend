import { Icon, IconButton, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React from "react";
import { BsSearch } from "react-icons/bs";

interface ISearchFilter {
  stringFilter: string | undefined;
  setStringFilter: (input?: string) => void;
  handleSearch: (word?: string) => void;
}

export const SearchFilter = ({ stringFilter, setStringFilter, handleSearch }: ISearchFilter): JSX.Element => {
  //const [value, setValue] = useState<string | undefined>(stringFilter);
  // const onChange = useAsyncDebounce((value) => {
  //   setGlobalFilter(value || undefined);
  // }, 200);
  const onChange = (value: string | undefined) => {
    if (value !== undefined) {
      //setValue(value);
      setStringFilter(value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(stringFilter || undefined);
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup w="240px" size="md">
        <Input
          border="none"
          variant="outline"
          value={stringFilter}
          color="white"
          placeholder="상세검색"
          _focus={{ borderColor: "gray.500" }}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.code === "Enter" || e.code === "NumpadEnter") {
              // eslint-disable-next-line no-console
              e.preventDefault();
              handleSearch(stringFilter || undefined);
            }
          }}
        />
        <InputRightElement _hover={{ bg: "gray.500", color: "white" }} zIndex={0}>
          <IconButton
            type="submit"
            icon={<Icon as={BsSearch} />}
            size="xs"
            bg="none"
            borderStartRadius="none"
            color="gray.300"
            _hover={{ bg: "transparent", color: "white" }}
            _focus={{ boxShadow: "none" }}
            _active={{ color: "white" }}
            // _hover={{ bg: "gray.500", color: "white" }}
            aria-label="search-detail"
          />
        </InputRightElement>
      </InputGroup>
    </form>
  );
};
