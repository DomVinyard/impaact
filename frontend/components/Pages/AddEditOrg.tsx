import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  ButtonGroup,
  CloseButton,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
  useBreakpointValue,
} from "@chakra-ui/react";
import AccessDeniedIndicator from "components/AccessDeniedIndicator";
import {
  useDeleteOrgMutation,
  useInsertOrgMutation,
  useUpdateOrgMutation,
} from "generated-graphql";
import { useSession } from "next-auth/client";
import React, { ChangeEvent, useState } from "react";
import Content from "components/Content";
import { useFetchOrgQuery } from "generated-graphql";
import router, { useRouter } from "next/router";
import { DeleteIcon } from "@chakra-ui/icons";
import slugify from "../../lib/slugify";
import Loader from "components/Loader";

const AddEditOrgForm = ({ org }) => {
  const [name, setName] = useState(org?.name || "");
  const [slug, setSlug] = useState(org?.slug || "");
  const [isSubmitted, setIsSubmitted] = useState("");
  const isMobile = useBreakpointValue({ base: true, md: false });
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

  const isFetching =
    insertOrgFetching || updateOrgFetching || deleteOrgFetching;

  const handleDelete = async () => {
    setIsSubmitted("deleting");
    await deleteOrg();
    router.push(`/orgs`);
  };

  const handleSubmit = async () => {
    const fields = {
      name,
      slug,
      description,
    };
    setIsSubmitted(isEditMode ? "Editing" : "Adding");
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
    router.push(`/${slug}`);
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

  if (isFetching || isSubmitted) return <Loader message={isSubmitted} />;
  const linkText = isEditMode ? "Link: " : "Your report will be at: ";

  return (
    <Stack spacing={4}>
      {errorNode()}
      <Box p={4} shadow="lg" rounded="lg">
        <Stack spacing={4}>
          <FormControl isRequired>
            <Heading mt={6} mb={12}>
              {isEditMode ? "Edit" : "Add"} Organisation
            </Heading>
            <Box>
              <FormLabel>Name</FormLabel>
              <Input
                id="name"
                value={name}
                placeholder="My organisation"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setName(e.currentTarget.value);
                  setSlug(slugify(e.currentTarget.value));
                }}
                isDisabled={isEditMode ? updateOrgFetching : insertOrgFetching}
              />
            </Box>
            <Text color={"blue"} fontSize={12} pt={1}>
              <strong>{linkText}</strong>
              <span>
                https://impact.ooo/{slugify(`${name}`, { lower: true })}
              </span>
            </Text>
            <Box my={6}>
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
            {/* <ButtonGroup> */}
            <Flex mt={6} justifyContent={"space-between"}>
              <ButtonGroup>
                <Button
                  onClick={() => {
                    router.push(`/${slug}`);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  loadingText="Posting..."
                  colorScheme={"blue"}
                  onClick={handleSubmit}
                  isLoading={isEditMode ? updateOrgFetching : insertOrgFetching}
                  isDisabled={!name.trim()}
                >
                  {isEditMode ? "Save" : "Add"}
                </Button>
              </ButtonGroup>
              {isEditMode && (
                <Button
                  marginLeft={"auto"}
                  colorScheme="red"
                  leftIcon={<DeleteIcon />}
                  onClick={handleDelete}
                >
                  Delete{!isMobile && " Organisation"}
                </Button>
              )}
            </Flex>
            {/* </ButtonGroup> */}
          </FormControl>
        </Stack>
      </Box>
    </Stack>
  );
};

const AddEditOrgPage = () => {
  const router = useRouter();
  const { data, error, loading } = useFetchOrgQuery({
    variables: { slug: `${router?.query.slug}` },
  });
  const [org] = data?.orgs || [];

  if (loading) {
    return <Loader />;
  }
  return (
    <Content>
      <AddEditOrgForm org={org} />
    </Content>
  );
};

export default AddEditOrgPage;
