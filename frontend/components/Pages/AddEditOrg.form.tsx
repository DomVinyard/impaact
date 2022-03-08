import { Box, Button, Flex, Input, Text, Textarea } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import slugify from "../../lib/slugify";

type Field = {
  id: string;
  label?: string;
  validation?: any;
  element: any;
  placeholder?: string;
  before?: any;
  after?: any;
  custom?: any;
};

const FIELDS: Field[] = [
  {
    id: "name",
    label: "Organisation Name",
    validation: {
      required: "This is required",
      minLength: {
        value: 4,
        message: "Minimum length should be 4 characters",
      },
    },
    element: Input,
    after: ({ values, isEditMode }) => {
      const linkText = isEditMode
        ? "Share Link: "
        : "Your report will be created at: ";
      const linkURL = `https://impact.ooo/${slugify(`${values.name}`, {
        lower: true,
      })}`;

      return (
        <Text color={"blue"} fontSize={12} mt={1}>
          <strong>{linkText}</strong>
          <Link href={linkURL}>{linkURL}</Link>
        </Text>
      );
    },
  },
  {
    id: "main_image",
    label: "Main Image",
    element: Input,
    validation: {},
    custom: ({ values, isEditMode, onChange, ...others }) => {
      return (
        <Flex
          backgroundImage={`url(${values.main_image})`}
          backgroundSize="cover"
          backgroundPosition={"center center"}
          minHeight={{ base: 32, md: 28 }}
          justifyContent="center"
          alignItems="center"
        >
          <Button
            name="main_image"
            size="sm"
            colorScheme="blue"
            mt={2}
            onClick={async (e) => {
              const prompt = window.prompt(
                "Paste image URL here",
                values.main_image
              );
              if (!prompt) return;
              e.target.value = prompt;
              await onChange(e);
            }}
          >
            Edit
          </Button>
        </Flex>
      );
    },
  },
  {
    id: "description",
    label: "Short description",
    element: Textarea,
    validation: {
      required: "This is required",
      minLength: {
        value: 60,
        message: "Minimum length should be 60 characters",
      },
      maxLength: {
        value: 240,
        message: "Maximum length should be 240 characters",
      },
    },
  },
  {
    id: "locations",
    label: "Geography",
    element: Textarea,
    validation: {},
  },
];

export default FIELDS;
