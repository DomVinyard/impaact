// import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
// import { signIn, signOut, useSession } from "next-auth/client";
// import Link from "next/link";
// import React from "react";
// import { Canvas } from "react-three-fiber";
// import Lights from "../3d/Light";
// import Model from "../3d/Model";

// const IndexPageComponent = () => {
//   const [session] = useSession();
//   const heightOfNavbar: string = "74px";
//   const containerPadding: string = "1rem";

//   return (
//     <Stack>
//       <Flex
//         minH={`calc(100vh - ${heightOfNavbar} - ${containerPadding}*2)`}
//         justifyContent="center"
//         alignItems="center"
//       >
//         <Stack spacing={4} maxW="xl" mx="auto">
//           <>
//             <Canvas colorManagement camera={{ position: [0, 0, 5] }}>
//               <Lights />
//               <Model />
//             </Canvas>
//           </>
//           test
//         </Stack>
//       </Flex>
//     </Stack>
//   );
// };

// export default IndexPageComponent;

import React from "react";
import Head from "next/head";
import Page from "components/Pages/Index/index";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/client";
import AccessDeniedIndicator from "components/AccessDeniedIndicator";
import ISession from "types/session";

interface IProps {
  session: ISession;
}

const IndexPage: NextPage<IProps> = ({ session }) => {
  if (!session) {
    return <AccessDeniedIndicator />;
  }

  return (
    <>
      <Head>
        <title>Index Page</title>
      </Head>
      <Page />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  return {
    props: {
      session,
    },
  };
};

export default IndexPage;
