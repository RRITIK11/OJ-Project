import jwt from "jsonwebtoken";
export async function checkIfUserIsAdmin(token: any) {
  try {
    const decoded : any = await jwt.verify(
      token,
      process.env.TOKEN_SECRET!);
    if(!decoded){
      return false;
    }else{
      return decoded?.isAdmin;
    }
  } catch (error : any) {
    return false;
  }
}
export async function checkIfUserIsModerator(token: any) {
  try {
    const decoded : any = await jwt.verify(
      token,
      process.env.TOKEN_SECRET!);
    if(!decoded){
      return false;
    }else{
      return decoded?.isModerator;
    }
  } catch (error : any) {
    return false;
  }
}

export async function getUserId(token: any){
  try {
    const decoded : any = await jwt.verify(
      token,
      process.env.TOKEN_SECRET!);
    if(!decoded){
      return null;
    }else{
      return decoded?._id;
    }
  } catch (error : any) {
    return null;
  }
}
export async function getUsername(token: any){
  try {
    const decoded : any = await jwt.verify(
      token,
      process.env.TOKEN_SECRET!);
    if(!decoded){
      return "";
    }else{
      return decoded["username"];
    }
  } catch (error : any) {
    return "";
  }
}
