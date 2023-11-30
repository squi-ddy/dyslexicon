/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getComments = /* GraphQL */ `
  query GetComments($id: ID!) {
    getComments(id: $id) {
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
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
        postedAt
        userID
        postsID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const commentsByUserID = /* GraphQL */ `
  query CommentsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCommentsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        content
        postedAt
        userID
        postsID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const commentsByPostsID = /* GraphQL */ `
  query CommentsByPostsID(
    $postsID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCommentsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsByPostsID(
      postsID: $postsID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        content
        postedAt
        userID
        postsID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        username
        imageID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const findEmail = /* GraphQL */ `
  query FindEmail(
    $email: AWSEmail!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    findEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        username
        imageID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const findUsername = /* GraphQL */ `
  query FindUsername(
    $username: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    findUsername(
      username: $username
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        username
        imageID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPosts = /* GraphQL */ `
  query GetPosts($id: ID!) {
    getPosts(id: $id) {
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
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const postsByUserID = /* GraphQL */ `
  query PostsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPostsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getRevisionCard = /* GraphQL */ `
  query GetRevisionCard($id: ID!) {
    getRevisionCard(id: $id) {
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
export const listRevisionCards = /* GraphQL */ `
  query ListRevisionCards(
    $filter: ModelRevisionCardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRevisionCards(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        front
        back
        userID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const revisionCardsByUserID = /* GraphQL */ `
  query RevisionCardsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRevisionCardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    revisionCardsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        front
        back
        userID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getAudionotes = /* GraphQL */ `
  query GetAudionotes($id: ID!) {
    getAudionotes(id: $id) {
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
export const listAudionotes = /* GraphQL */ `
  query ListAudionotes(
    $filter: ModelAudionotesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAudionotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        content
        audioID
        userID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const audionotesByUserID = /* GraphQL */ `
  query AudionotesByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelAudionotesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    audionotesByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        content
        audioID
        userID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
