import { ArrowBackIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Content from "components/Layout/Content";
import OrgsList from "components/OrgList";
import { useFetchOrgsQuery, useSearchOrgsLazyQuery } from "generated-graphql";
import { useSession } from "next-auth/client";
import Link from "next/link";
import React, { useEffect } from "react";
import { Canvas } from "react-three-fiber";
import {
  AsyncCreatableSelect,
  AsyncSelect,
  CreatableSelect,
  Select,
} from "chakra-react-select";
import { Query } from "@apollo/client/react/components";

export const SearchBar = ({
  value,
  onChange,
  onSubmit,
  mini,
  onFocus,
  onBlur,
  isSearchFocusMobile,
}: any) => {
  const [searchOrgs] = useSearchOrgsLazyQuery();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const getAsyncOptions = async (inputValue) => {
    try {
      console.log("get async", inputValue);
      const { data, error } = await searchOrgs({
        variables: { q: `%${inputValue}%` },
      });
      console.log({ data, error });

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
    } catch (error) {
      console.log({ error });
    }
  };
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
        defaultInputValue={value}
        tagVariant={mini ? "solid" : "outline"}
        onChange={(option) => {
          if (option.value === "@search") {
            location.href = `/search?q=${value}`;
          } else {
            location.href = `/${option.value}`;
          }
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
          // dropdownIndicator: (provided) => ({
          //   ...provided,
          //   background: "none",
          //   display: "none",
          // }),
          menu: (provided) => ({
            ...provided,
            width: "100%",
            maxW: "440px",
            color: "black",
            display: !value?.length ? "none" : "block",
          }),
        }}
        // width={{ input: "100%", inputContainer: "100%" }}
        size={mini ? "sm" : "lg"}
        placeholder={
          mini || (isMobile && isSearchFocusMobile)
            ? "Search"
            : "Search charity or organisation"
        }
        autoFocus={!mini && !isMobile}
        // maxWidth={{ input: 440, inputContainer: 440 }}
        value={value}
        // onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}

        // type="search"
        // enterKeyHint="search"
      />
      {/* <Button
        display={{ base: "none", md: "block" }}
        marginLeft={mini ? 1 : 4}
        size={mini ? "sm" : "lg"}
        backgroundColor={mini ? "#222" : "#8f17c7"}
        _hover={{ backgroundColor: "#cc2def" }}
        _disabled={{ opacity: 0 }}
        disabled={value?.length === 0}
        onClick={onSubmit}
      >
        {!mini && "Search"}
        {mini && <SearchIcon color="white" />}
      </Button> */}
    </InputGroup>
  );
};

export default SearchBar;
