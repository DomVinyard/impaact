import { SearchIcon } from "@chakra-ui/icons";
import {
  InputGroup,
  InputLeftElement,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useSearchOrgsLazyQuery } from "generated-graphql";
import React, { useEffect } from "react";
import { AsyncSelect } from "chakra-react-select";
import router, { useRouter } from "next/router";
import Loader from "components/Loader";

export const SearchBar = ({
  value,
  onChange,
  mini,
  onFocus,
  onBlur,
  isSearchFocusMobile,
}: any) => {
  const [searchOrgs] = useSearchOrgsLazyQuery({ fetchPolicy: "network-only" });
  const [inputValue, setInputValue] = React.useState(`${value}`);
  const [isSelected, setIsSelected] = React.useState<any>();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const router = useRouter();
  useEffect(() => setIsSelected(false), [value]);

  const getAsyncOptions = async (inputValue) => {
    const { data, error } = await searchOrgs({
      variables: { q: `%${inputValue}%` },
    });
    if (error) return await [];
    return await [
      {
        label: `Search for "${inputValue}"`,
        value: "@search",
      },
      ...data?.orgs?.map((org) => ({
        label: org.name,
        value: org.slug,
      })),
    ];
  };

  const formatOptionLabel = ({ value, label }) => {
    return (
      <div style={{ display: "flex" }}>
        <div>{label}</div>
      </div>
    );
  };

  // if (isSelected)
  //   return (
  //     <Loader
  //       message={
  //         isSelected?.value === "@search" ? "Searching" : isSelected?.label
  //       }
  //     />
  //   );

  return (
    <InputGroup
      alignSelf={{ base: "center", md: "left" }}
      maxW={{ base: 400, md: 800 }}
      margin={{ base: "auto", md: 0 }}
    >
      {!mini && (
        <InputLeftElement
          pointerEvents="none"
          top={1}
          children={<SearchIcon color="gray.300" />}
        />
      )}
      <AsyncSelect
        formatOptionLabel={formatOptionLabel}
        instanceId={mini ? "nav" : "splash"}
        inputValue={value}
        tagVariant={mini ? "solid" : "outline"}
        onChange={(option) => {
          setIsSelected(option);
          if (option.value === "@search") {
            router.push(`/search?q=${value}`);
          } else {
            router.push(`/${option.value}`);
          }
        }}
        onInputChange={(inputValue) => {
          setInputValue(inputValue);
          onChange(inputValue);
        }}
        loadOptions={(inputValue) => {
          onChange(inputValue);
          return getAsyncOptions(inputValue);
        }}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
        chakraStyles={{
          input: (provided) => ({
            width: "100%",
            background: "none",
            marginLeft: mini ? 0 : "1.5rem",
            outline: "none",
            type: "search",
            enterKeyHint: "search",
            role: "search",
          }),
          inputContainer: (provided) => ({
            width: "100%",
            maxW: "440px",
            marginLeft: mini ? 0 : 0,
          }),
          container: (provided) => ({
            width: "100%",
            maxWidth: 440,
            marginLeft: mini ? 2 : 0,
            border: mini ? "0px solid rgba(0,0,0,0) !important" : "auto",
            background: mini ? "rgb(67, 58, 87) !important" : "auto",
          }),
          placeholder: (provided) => ({
            ...provided,
            marginLeft: mini ? 0 : "1.5rem",
          }),
          menu: (provided) => ({
            ...provided,
            width: "100%",
            maxW: "440px",
            color: "black",
            display: !value?.length ? "none" : "block",
          }),
        }}
        size={mini ? "sm" : "lg"}
        placeholder={
          mini || (isMobile && isSearchFocusMobile)
            ? "Search"
            : "Search charity or org"
        }
        // autoFocus={!mini && !isMobile}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </InputGroup>
  );
};

export default SearchBar;
