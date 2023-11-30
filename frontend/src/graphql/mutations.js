/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createComments = /* GraphQL */ `
  mutation CreateComments(
    $input: CreateCommentsInput!
    $condition: ModelCommentsConditionInput
  ) {
    createComments(input: $input, condition: $condition) {
      id
      content
      postedAt
      userID
      postsID
      Posts {
        id
        title
        content
        postedAt
        likes
        audioID
        userID
        createdAt
        updatedAt
        __typename
      }
      User {
        id
        email
        username
        imageID
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateComments = /* GraphQL */ `
  mutation UpdateComments(
    $input: UpdateCommentsInput!
    $condition: ModelCommentsConditionInput
  ) {
    updateComments(input: $input, condition: $condition) {
      id
      content
      postedAt
      userID
      postsID
      Posts {
        id
        title
        content
        postedAt
        likes
        audioID
        userID
        createdAt
        updatedAt
        __typename
      }
      User {
        id
        email
        username
        imageID
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteComments = /* GraphQL */ `
  mutation DeleteComments(
    $input: DeleteCommentsInput!
    $condition: ModelCommentsConditionInput
  ) {
    deleteComments(input: $input, condition: $condition) {
      id
      content
      postedAt
      userID
      postsID
      Posts {
        id
        title
        content
        postedAt
        likes
        audioID
        userID
        createdAt
        updatedAt
        __typename
      }
      User {
        id
        email
        username
        imageID
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      Posts {
        nextToken
        __typename
      }
      RevisionCards {
        nextToken
        __typename
      }
      Audionotes {
        nextToken
        __typename
      }
      email
      username
      imageID
      Comments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      Posts {
        nextToken
        __typename
      }
      RevisionCards {
        nextToken
        __typename
      }
      Audionotes {
        nextToken
        __typename
      }
      email
      username
      imageID
      Comments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      Posts {
        nextToken
        __typename
      }
      RevisionCards {
        nextToken
        __typename
      }
      Audionotes {
        nextToken
        __typename
      }
      email
      username
      imageID
      Comments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createPosts = /* GraphQL */ `
  mutation CreatePosts(
    $input: CreatePostsInput!
    $condition: ModelPostsConditionInput
  ) {
    createPosts(input: $input, condition: $condition) {
      id
      title
      content
      postedAt
      likes
      audioID
      User {
        id
        email
        username
        imageID
        createdAt
        updatedAt
        __typename
      }
      userID
      Comments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updatePosts = /* GraphQL */ `
  mutation UpdatePosts(
    $input: UpdatePostsInput!
    $condition: ModelPostsConditionInput
  ) {
    updatePosts(input: $input, condition: $condition) {
      id
      title
      content
      postedAt
      likes
      audioID
      User {
        id
        email
        username
        imageID
        createdAt
        updatedAt
        __typename
      }
      userID
      Comments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deletePosts = /* GraphQL */ `
  mutation DeletePosts(
    $input: DeletePostsInput!
    $condition: ModelPostsConditionInput
  ) {
    deletePosts(input: $input, condition: $condition) {
      id
      title
      content
      postedAt
      likes
      audioID
      User {
        id
        email
        username
        imageID
        createdAt
        updatedAt
        __typename
      }
      userID
      Comments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createRevisionCard = /* GraphQL */ `
  mutation CreateRevisionCard(
    $input: CreateRevisionCardInput!
    $condition: ModelRevisionCardConditionInput
  ) {
    createRevisionCard(input: $input, condition: $condition) {
      id
      front
      back
      userID
      User {
        id
        email
        username
        imageID
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateRevisionCard = /* GraphQL */ `
  mutation UpdateRevisionCard(
    $input: UpdateRevisionCardInput!
    $condition: ModelRevisionCardConditionInput
  ) {
    updateRevisionCard(input: $input, condition: $condition) {
      id
      front
      back
      userID
      User {
        id
        email
        username
        imageID
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteRevisionCard = /* GraphQL */ `
  mutation DeleteRevisionCard(
    $input: DeleteRevisionCardInput!
    $condition: ModelRevisionCardConditionInput
  ) {
    deleteRevisionCard(input: $input, condition: $condition) {
      id
      front
      back
      userID
      User {
        id
        email
        username
        imageID
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createAudionotes = /* GraphQL */ `
  mutation CreateAudionotes(
    $input: CreateAudionotesInput!
    $condition: ModelAudionotesConditionInput
  ) {
    createAudionotes(input: $input, condition: $condition) {
      id
      title
      content
      audioID
      userID
      User {
        id
        email
        username
        imageID
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateAudionotes = /* GraphQL */ `
  mutation UpdateAudionotes(
    $input: UpdateAudionotesInput!
    $condition: ModelAudionotesConditionInput
  ) {
    updateAudionotes(input: $input, condition: $condition) {
      id
      title
      content
      audioID
      userID
      User {
        id
        email
        username
        imageID
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteAudionotes = /* GraphQL */ `
  mutation DeleteAudionotes(
    $input: DeleteAudionotesInput!
    $condition: ModelAudionotesConditionInput
  ) {
    deleteAudionotes(input: $input, condition: $condition) {
      id
      title
      content
      audioID
      userID
      User {
        id
        email
        username
        imageID
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
