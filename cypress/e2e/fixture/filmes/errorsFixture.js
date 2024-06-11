export const filmesErrorsFixture = {
  type: {
    badRequest: "Bad Request",
    unauthorized: "Unauthorized",
    forbidden: "Forbidden",
    notFound: "Movie not found",
  },
  code: {
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
  },
  messages: {
    unauthorized: "Access denied.",
    title: {
      empty: "title should not be empty",
      minLength: "title must be longer than or equal to 1 characters",
      maxLength: "title must be shorter than or equal to 100 characters",
    },
    genre: {
      empty: "genre should not be empty",
      minLength: "genre must be longer than or equal to 1 characters",
      maxLength: "genre must be shorter than or equal to 100 characters",
    },
    description: {
      empty: "description should not be empty",
      minLength: "description must be longer than or equal to 1 characters",
      maxLength: "description must be shorter than or equal to 500 characters",
    },
    releaseYear: {
      min: "releaseYear must not be less than 1895",
      max: "releaseYear must not be greater than 2024",
    },
    durationInMinutes: {
      min: "durationInMinutes must not be less than 1",
      max: "durationInMinutes must not be greater than 43200",
    },
  },
};
