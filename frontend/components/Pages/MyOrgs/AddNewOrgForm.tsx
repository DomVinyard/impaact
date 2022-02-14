import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  FormControl,
  FormLabel,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import AccessDeniedIndicator from "components/AccessDeniedIndicator";
import { useInsertOrgMutation } from "generated-graphql";
import { useSession } from "next-auth/client";
import React, { ChangeEvent, useState } from "react";

const AddNewOrgForm = () => {
  const [name, setName] = useState("");
  const [session] = useSession();
  const [insertOrg, { loading: insertOrgFetching, error: insertOrgError }] =
    useInsertOrgMutation();

  if (!session) {
    return (
      <AccessDeniedIndicator message="You need to be signed in to add a new org!" />
    );
  }

  const handleSubmit = async () => {
    await insertOrg({
      variables: {
        author_id: session.id,
        name,
      },
    });

    setName("");
    window.location.reload();
  };

  const errorNode = () => {
    if (!insertOrgError) {
      return false;
    }

    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>{insertOrgError}</AlertTitle>
        <CloseButton position="absolute" right="8px" top="8px" />
      </Alert>
    );
  };

  return (
    <Stack spacing={4}>
      {errorNode()}
      <Box p={4} shadow="lg" rounded="lg">
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel htmlFor="name">Add org</FormLabel>
            <Textarea
              id="name"
              value={name}
              placeholder="Name"
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setName(e.currentTarget.value)
              }
              isDisabled={insertOrgFetching}
            />
          </FormControl>
          <FormControl>
            <Button
              loadingText="Posting..."
              onClick={handleSubmit}
              isLoading={insertOrgFetching}
              isDisabled={!name.trim()}
            >
              Add
            </Button>
          </FormControl>
        </Stack>
      </Box>
    </Stack>
  );
};

export default AddNewOrgForm;
