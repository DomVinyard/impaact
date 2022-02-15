import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  ButtonGroup,
  CloseButton,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import AccessDeniedIndicator from "components/AccessDeniedIndicator";
import {
  useDeleteOrgMutation,
  useInsertOrgMutation,
  useUpdateOrgMutation,
} from "generated-graphql";
import { useSession } from "next-auth/client";
import React, { ChangeEvent, useState } from "react";
import Content from "components/Layout/Content";
import { useFetchOrgQuery } from "generated-graphql";
import { useRouter } from "next/router";
import { DeleteIcon } from "@chakra-ui/icons";

const AddEditOrgForm = ({ org }) => {
  const [name, setName] = useState(org?.name || "");
  const [slug, setSlug] = useState(org?.slug || "");
  const [description, setDescription] = useState(org?.description || "");
  const [session] = useSession();
  const isEditMode = !!org;
  const [insertOrg, { loading: insertOrgFetching, error: insertOrgError }] =
    useInsertOrgMutation();
  const [updateOrg, { loading: updateOrgFetching, error: updateOrgError }] =
    useUpdateOrgMutation();
  const [deleteOrg, { loading: deleteOrgFetching, error: deleteOrgError }] =
    useDeleteOrgMutation({ variables: { id: org?.id } });

  if (!session) {
    return (
      <AccessDeniedIndicator message="You need to be signed in to add a new org!" />
    );
  }

  const handleSubmit = async () => {
    const fields = {
      name,
      slug,
      description,
    };
    if (isEditMode) {
      await updateOrg({
        variables: {
          id: org.id,
          ...fields,
        },
      });
    } else {
      await insertOrg({
        variables: {
          author_id: session.id,
          ...fields,
        },
      });
    }
    setName("");
    window.location.href = "/orgs";
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
            <Heading mt={6} mb={6}>
              {org ? "Edit Organisation" : "Add Organisation"}
            </Heading>
            <Box>
              <FormLabel>Name</FormLabel>
              <Input
                id="name"
                value={name}
                placeholder="My organisation"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setName(e.currentTarget.value)
                }
                isDisabled={isEditMode ? updateOrgFetching : insertOrgFetching}
              />
            </Box>
            <Box>
              <FormLabel>Slug</FormLabel>
              <Input
                id="slug"
                value={slug}
                placeholder="short-name"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSlug(e.currentTarget.value)
                }
                isDisabled={isEditMode ? updateOrgFetching : insertOrgFetching}
              />
            </Box>
            <Box>
              <FormLabel>Description</FormLabel>
              <Textarea
                id="description"
                value={description}
                placeholder="A short description of this organsiation"
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setDescription(e.currentTarget.value)
                }
                isDisabled={isEditMode ? updateOrgFetching : insertOrgFetching}
              />
            </Box>
          </FormControl>
          <FormControl>
            <ButtonGroup>
              <Button
                loadingText="Posting..."
                onClick={handleSubmit}
                isLoading={isEditMode ? updateOrgFetching : insertOrgFetching}
                isDisabled={!name.trim()}
              >
                {isEditMode ? "Save" : "Add"}
              </Button>
              {isEditMode && (
                <Button
                  colorScheme="red"
                  leftIcon={<DeleteIcon />}
                  onClick={async () => {
                    await deleteOrg();
                    window.location.href = "/orgs";
                  }}
                >
                  Delete
                </Button>
              )}
            </ButtonGroup>
          </FormControl>
        </Stack>
      </Box>
    </Stack>
  );
};

const AddEditOrgPage = () => {
  const router = useRouter();
  const { data, error, loading } = useFetchOrgQuery({
    variables: { slug: router?.query.slug },
  });
  const [org] = data?.orgs || [];

  if (loading) {
    return <div>loading</div>;
  }
  return (
    <Content>
      <AddEditOrgForm org={org} />
    </Content>
  );
};

export default AddEditOrgPage;
