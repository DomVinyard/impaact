import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";
import fs from "fs";
const slugify: any = require("../../frontend/lib/slugify");

// INSERT INTO public.accounts (id, compound_id, user_id, provider_type, provider_id, provider_account_id, refresh_token, access_token, access_token_expires, created_at, updated_at) VALUES ('4a250393-1aa8-4fbc-a349-672609d7ce79', '758a69951dd3f2a6b93662db4c55b22f2333216c5c2079ddf95f557185696af8', '72ad01dc-9c5e-4844-a60d-6b653c75a363', 'oauth', 'google', '110127495875220400815', NULL, 'ya29.a0AfH6SMCyjCqi1qMu1dqQu0DWDJ-DUketNL7oRrJklZdl67lgUPSLj3sqb7Wil72G9IBCY5L3iSipakAOtPyvDu1Vbu9eCSYmmjitLoKtbBIpdl2Ypfg4_8NDmGgWfl-sJJbyNn7RKMEn4x1wF8U5YpMiA5fn3ZVVrd9f', NULL, '2020-07-30 15:38:05.270128+00', '2020-07-30 15:38:05.270128+00');
// INSERT INTO public.orgs (id, author_id, name, created_at, updated_at, slug, description) VALUES ('bfa5a42d-1fe9-4fd7-a47c-6bc6e074fc51', '72ad01dc-9c5e-4844-a60d-6b653c75a363', 'Lorem ipsum orci', '2020-07-30 19:00:44.107312+00', '2020-07-30 19:00:44.107312+00', 'Lorem', 'We need to build empathy and understanding, and educate ourselves to celebrate our differences rather than berate and fear them. ');
// INSERT INTO public.orgs (id, author_id, name, created_at, updated_at, slug, description) VALUES ('07b160d8-8cf3-48be-8bef-aa73f6e459c4', '72ad01dc-9c5e-4844-a60d-6b653c75a363', 'Morbi mollis tristique', '2020-07-30 19:38:50.639452+00', '2020-07-30 19:38:50.639452+00', 'Morbi', 'expand the use of education and training and occupational programs, rebuild our infrastructure, support workingempathy');
// INSERT INTO public.orgs (id, author_id, name, created_at, updated_at, slug, description) VALUES ('15364138-6591-413f-b6db-7dd34e354c45', '72ad01dc-9c5e-4844-a60d-6b653c75a363', 'Nam condimentum mollis mollis', '2020-07-30 19:47:30.427743+00', '2020-07-30 19:47:30.427743+00', 'Nam', 'criminal justice system that locks up people, expand the use of education and health care and just get out of other peoples business');
// INSERT INTO public.orgs (id, author_id, name, created_at, updated_at, slug, description) VALUES ('8ae90763-9746-4a0c-b952-71c9bda6cab8', '72ad01dc-9c5e-4844-a60d-6b653c75a363', 'Nulla mollis', '2020-07-30 19:50:28.129349+00', '2020-07-30 19:50:28.129349+00', 'Nulla', 'But we can agree that, today, not tomorrow, not this decade, but understanding');
// INSERT INTO public.users (id, name, email, email_verified, image, created_at, updated_at) VALUES ('72ad01dc-9c5e-4844-a60d-6b653c75a363', 'John Doe', 'john@doe.com', NULL, '', '2020-07-30 15:38:05.240549+00', '2020-07-30 19:40:53.634539+00');

const runSeed = async () => {
  const generateDrop = () => {
    return `TRUNCATE public.accounts CASCADE;
        TRUNCATE public.orgs CASCADE;
        TRUNCATE public.users CASCADE;
        TRUNCATE public.impact CASCADE;
    `;
  };
  let userIDs: any = [];
  let orgIDs: any = [];
  const date = new Date().toISOString();
  const generateUsers = (number = 10) =>
    [...Array(number)]
      .map((i) => {
        const userID = uuidv4();
        userIDs.push(userID);
        return `INSERT INTO public.accounts (id, compound_id, user_id, provider_type, provider_id, provider_account_id, refresh_token, access_token, access_token_expires, created_at, updated_at) VALUES ('${uuidv4()}','${uuidv4()}', '${userID}', 'oauth', 'google', '110127495875220400815', NULL, '${uuidv4()}', NULL, '${date}', '${date}');
                INSERT INTO public.users (id, name, email, email_verified, image, created_at, updated_at) VALUES ('${userID}', '${faker.name
          .findName()
          .replace(
            /["']/g,
            ""
          )}', '${faker.internet.email()}', NULL, '${faker.image.avatar()}', '${date}', '${date}');
                `;
      })
      .join("\n");
  const generateOrgs = (number = 10) => {
    return [...Array(number)]
      .map((i) => {
        const orgID = uuidv4();
        const randomUser = userIDs[Math.floor(Math.random() * userIDs.length)];
        const name = faker.company.companyName().replace(/["']/g, "");
        const slug = slugify(name);
        const geography =
          `${faker.address.country()}, ${faker.address.country()}`.replace(
            /["']/g,
            ""
          );
        const image = faker.image.people(1020, 800, true);
        const founded_at = faker.datatype.number({ min: 1980, max: 2022 });
        const long_description = faker.lorem.paragraphs(6);
        orgIDs.push(orgID);
        return `INSERT INTO public.orgs 
            (id, author_id, name, created_at, updated_at, slug, description, long_description, main_image, geography, size, founded_at, link_processes, link_financials, is_test_data)
            VALUES
            ('${orgID}', '${randomUser}', '${name}', '${date}', '${date}', '${slug}', '${faker.lorem.paragraph()}', '${long_description}', '${image}', '${geography}', '${faker.datatype.number(
          100
        )}', '${founded_at}', '${faker.internet.url()}', '${faker.internet.url()}', TRUE);`;
      })
      .join("\n");
  };
  const generateImpacts = (number = 10) => {
    const image = faker.image.people(1020, 800, true);
    return [...Array(number)]
      .map((i) => {
        const impactID = uuidv4();
        const indicator = faker.lorem.words(5);
        const value = faker.datatype.number({ min: 0, max: 100 });
        const randomOrg = orgIDs[Math.floor(Math.random() * orgIDs.length)];
        const sdg = `${faker.random.number({ min: 1, max: 6 })}`.padStart(
          2,
          "0"
        );
        return `INSERT INTO public.impact 
            (id, org, indicator, value, sdg, image)
            VALUES
            ('${impactID}', '${randomOrg}', '${indicator}', '${value}', '${sdg}', '${image}');`;
      })
      .join("\n");
  };
  const seedScript = `
    ${generateDrop()}
    ${generateUsers(10)}
    ${generateOrgs(100)}
    ${generateImpacts(200)}
    `;
  fs.writeFile("./default/seed.sql", seedScript, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    //file written successfully
  });

  console.log(seedScript);
};

export default runSeed();
