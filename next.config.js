module.exports = {
    async redirects() {
      return [
        {
          source: '/contribute/question',
          destination: '/contribute/question/background',
          permanent: true,
        },                  
        {
          source: '/problems/:problem',
          destination: '/problems/:problem/description',
          permanent: true,
        },                 
      ];
    },
    images: {
      domains: ['images.pexels.com','www.pexels.com'], // Replace 'example.com' with the domain of your image
    },
  };
  