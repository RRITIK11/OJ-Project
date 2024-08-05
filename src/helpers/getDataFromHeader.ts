import { parse } from "querystring";

export async function getDataFromHeader(request : any){
    const contentType = request.headers.get("content-type");
    console.log(contentType);
    let body;
    if (contentType === "application/json") {
      body = await request.json();
      console.log(body);
    } else if (contentType === "application/x-www-form-urlencoded") {
      const rawBody = await request.text();
      body = Object(parse(rawBody));
      console.log(body);
    }else{
       throw new Error("Sent data or sent it in correct form")
    }
    return body;
}