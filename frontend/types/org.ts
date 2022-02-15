import IUser from "types/user";

export default interface IOrg {
  id: string;
  created_at: string;
  name: string;
  author: IUser;
  slug: string;
  description: string;
}
