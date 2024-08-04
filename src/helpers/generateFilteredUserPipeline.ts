export function generateFilteredUserPipeline(
  queryParams: any
) {
  const page = queryParams.get("page") || 1;
  const limit = queryParams.get("limit") || 10;
  const offset = queryParams.get("offset") || 0;
  const sort = queryParams.get("sorting") || "inc_createdAt";

  const Admin = queryParams.get("isAdmin") || "false";
  const Moderator = queryParams.get("isModerator") || "false";

  const matchConditions : any = {};

  if (Admin=="true" && Moderator=="true") {
    matchConditions.isAdmin = true;
    matchConditions.isModerator = true;
  } else if (Admin=="true") {
    matchConditions.isAdmin = true;
  } else if (Moderator=="true") {
    matchConditions.isModerator = true;
  }


  const pipeline = [
    {
      $match: {
        isVerified: true,
      }
    },
    {
      $match: matchConditions
    },
    {
      $project: {
        username: 1,
        name : {
            $concat: [
                "$firstname",
                " ",
                { $ifNull: ["$lastname", ""] } 
              ]
        },
        email: 1,
        isAdmin : 1,
        isModerator : 1,
        createdAt : 1,
        updatedAt : 1
      },
    },
    {
        $sort : {
            createdAt : -1
        }
    }
  ];

  return pipeline;
}
