import IUser from "types/user";

export default interface IOrg {
  id: string;
  created_at: string;
  body: string;
  author: IUser;
}
