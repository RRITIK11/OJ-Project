export function generateFilteredProblemPipeline(
  queryParams: any,
  providedFields: any = [],
  Verified : any = null
) {
  const page = queryParams.get("page") || 1;
  const limit = queryParams.get("limit") || 10;
  const offset = queryParams.get("offset") || 0;
  const sort = queryParams.get("sorting") || "inc_createdAt";
  const topicSlugs = queryParams.get("topicSlugs")?.toLowerCase() || null;
  const companySlugs = queryParams.get("companySlugs")?.toLowerCase() || null;
  //   const status = queryParams.get("status");
  const difficulty = queryParams.get("difficulty");

  const topicArray = topicSlugs?.split(",");
  const companyArray = companySlugs?.split(",");

  const pipeline = [
    {
      $match: {
        ...(Verified != null ? {isVerified : Verified} : {})
      }
    },
    {
      $match: {
        ...(difficulty ? { difficulty: difficulty } : {}),
      },
    },
    {
      $match: {
        ...(topicArray ? { topics: { $all: topicArray } } : {}),
      },
    },
    {
      $match: {
        ...(companyArray ? { companies: { $in: companyArray } } : {}),
      },
    },
    // {
    //     $match: {
    //         ...(status ? {status: status } : {}),
    //     }
    // },
    {
      $project:
        providedFields.length > 0
          ? providedFields.reduce((acc : any, field : any) => {
              acc[field] = 1; 
              return acc;
            }, {})
          : {
            createdAt : 0,
          },
    },
  ];

  return pipeline;
}
