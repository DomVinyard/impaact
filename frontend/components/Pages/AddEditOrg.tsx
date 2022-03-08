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
  FormErrorMessage,
  FormLabel,
  Heading,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import AccessDeniedIndicator from "components/AccessDeniedIndicator";
import {
  useDeleteOrgMutation,
  useInsertOrgMutation,
  useUpdateOrgMutation,
} from "generated-graphql";
import { useSession } from "next-auth/client";
import React, { useState } from "react";
import Content from "components/Content";
import { useFetchOrgQuery } from "generated-graphql";
import router, { useRouter } from "next/router";
import { DeleteIcon } from "@chakra-ui/icons";
import slugify from "../../lib/slugify";
import Loader from "components/Loader";
import { useForm } from "react-hook-form";
import FIELDS from "./AddEditOrg.form";

const AddEditOrgForm = ({ org }) => {
  const [timestamp] = useState(Date.now());
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    defaultValues: {
      ...org,
    },
  });
  const values = watch();
  console.log({ values });
  const [isSubmitted, setIsSubmitted] = useState("");
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [session] = useSession();
  const isEditMode = !!org;

  const [insertOrg, { loading: insertOrgFetching, error: insertOrgError }] =
    useInsertOrgMutation();
  const [updateOrg, { loading: updateOrgFetching, error: updateOrgError }] =
    useUpdateOrgMutation();
  const [deleteOrg, { loading: deleteOrgFetching, error: deleteOrgError }] =
    useDeleteOrgMutation({ variables: { id: org?.id } });

  if (!session) return <AccessDeniedIndicator message="Please sign in" />;

  const isFetching =
    insertOrgFetching || updateOrgFetching || deleteOrgFetching;

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this org?")) return;
    setIsSubmitted("deleting");
    await deleteOrg();
    router.push(`/orgs`);
  };

  const onSubmit = async (values) => {
    values.slug = slugify(values.name);
    setIsSubmitted(isEditMode ? "Updating report" : "Creating report");
    try {
      if (isEditMode) {
        await updateOrg({ variables: { id: org.id, ...values } });
      } else {
        await insertOrg({ variables: { author_id: session.id, ...values } });
      }
    } catch (e) {
      console.log(e);
    }
    router.push(`/${values.slug}`);
  };

  const errorNode = () => {
    if (!insertOrgError) return false;
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>{insertOrgError}</AlertTitle>
        <CloseButton position="absolute" right="8px" top="8px" />
      </Alert>
    );
  };

  if (isFetching || isSubmitted) return <Loader message={isSubmitted} />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        {errorNode()}
        <Box p={4} maxW={760}>
          <Stack spacing={4} my={12}>
            {/* <Heading mt={6} mb={12}>
              {isEditMode ? "Edit" : "Add"} Organisation
            </Heading> */}

            {/* Fields */}
            {FIELDS.map((field) => (
              <Box paddingBottom={8}>
                <FormControl isInvalid={errors[field.id]}>
                  {field.before && (
                    <field.before values={values} isEditMode={isEditMode} />
                  )}
                  <FormLabel
                    style={{ fontSize: 22 }}
                    htmlFor={errors[field.id]}
                  >
                    {field.label}
                  </FormLabel>
                  {field.custom ? (
                    <field.custom
                      id={field.id}
                      values={values}
                      isEditMode={isEditMode}
                      {...register(field.id, field.validation)}
                    />
                  ) : (
                    <field.element
                      autoComplate="off"
                      id={field.id}
                      placeholder={field.placeholder}
                      {...register(field.id, field.validation)}
                    />
                  )}
                  <FormErrorMessage>
                    {errors[field.id] && errors[field.id].message}
                  </FormErrorMessage>
                  {field.after && (
                    <field.after values={values} isEditMode={isEditMode} />
                  )}
                </FormControl>
              </Box>
            ))}

            {/* Buttons */}
            <FormControl>
              <Flex mt={6} justifyContent={"space-between"} mb={16}>
                {isEditMode && (
                  <Button
                    marginRight={"auto"}
                    colorScheme="red"
                    leftIcon={<DeleteIcon />}
                    onClick={handleDelete}
                  >
                    Delete{!isMobile && " Organisation"}
                  </Button>
                )}
                <ButtonGroup>
                  <Button onClick={() => router.back()}>
                    {isDirty ? "Cancel" : "Back"}
                  </Button>
                  <Button
                    loadingText="Posting..."
                    colorScheme={"blue"}
                    minW={150}
                    onClick={handleSubmit}
                    isLoading={
                      isEditMode ? updateOrgFetching : insertOrgFetching
                    }
                    isDisabled={isValid && !isDirty}
                    type={"submit"}
                  >
                    {isEditMode ? "Save" : "Add"}
                  </Button>
                </ButtonGroup>
              </Flex>
            </FormControl>
          </Stack>
        </Box>
      </Stack>
    </form>
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
