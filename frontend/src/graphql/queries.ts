/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getComments = /* GraphQL */ `query GetComments($id: ID!) {
  getComments(id: $id) {
    id
    content
    audioID
    postedAt
    username
    userID
    postsID
    Posts {
      id
      title
      content
      postedAt
      likes
      audioID
      username
      userID
      createdAt
      updatedAt
      owner
      __typename
    }
    User {
      id
      email
      username
      imageID
      createdAt
      updatedAt
      owner
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCommentsQueryVariables,
  APITypes.GetCommentsQuery
>;
export const listComments = /* GraphQL */ `query ListComments(
  $filter: ModelCommentsFilterInput
  $limit: Int
  $nextToken: String
) {
  listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      content
      audioID
      postedAt
      username
      userID
      postsID
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCommentsQueryVariables,
  APITypes.ListCommentsQuery
>;
export const commentsByUserID = /* GraphQL */ `query CommentsByUserID(
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
      audioID
      postedAt
      username
      userID
      postsID
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.CommentsByUserIDQueryVariables,
  APITypes.CommentsByUserIDQuery
>;
export const commentsByPostsID = /* GraphQL */ `query CommentsByPostsID(
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
      audioID
      postedAt
      username
      userID
      postsID
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.CommentsByPostsIDQueryVariables,
  APITypes.CommentsByPostsIDQuery
>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
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
    owner
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
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
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const findEmail = /* GraphQL */ `query FindEmail(
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
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.FindEmailQueryVariables, APITypes.FindEmailQuery>;
export const findUsername = /* GraphQL */ `query FindUsername(
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
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.FindUsernameQueryVariables,
  APITypes.FindUsernameQuery
>;
export const getPosts = /* GraphQL */ `query GetPosts($id: ID!) {
  getPosts(id: $id) {
    id
    title
    content
    postedAt
    likes
    audioID
    username
    User {
      id
      email
      username
      imageID
      createdAt
      updatedAt
      owner
      __typename
    }
    userID
    Comments {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<APITypes.GetPostsQueryVariables, APITypes.GetPostsQuery>;
export const listPosts = /* GraphQL */ `query ListPosts(
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
      username
      userID
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListPostsQueryVariables, APITypes.ListPostsQuery>;
export const postsByUserID = /* GraphQL */ `query PostsByUserID(
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
      username
      userID
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.PostsByUserIDQueryVariables,
  APITypes.PostsByUserIDQuery
>;
export const getRevisionCard = /* GraphQL */ `query GetRevisionCard($id: ID!) {
  getRevisionCard(id: $id) {
    id
    front
    meaning
    audioID
    userID
    User {
      id
      email
      username
      imageID
      createdAt
      updatedAt
      owner
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetRevisionCardQueryVariables,
  APITypes.GetRevisionCardQuery
>;
export const listRevisionCards = /* GraphQL */ `query ListRevisionCards(
  $filter: ModelRevisionCardFilterInput
  $limit: Int
  $nextToken: String
) {
  listRevisionCards(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      front
      meaning
      audioID
      userID
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListRevisionCardsQueryVariables,
  APITypes.ListRevisionCardsQuery
>;
export const revisionCardsByUserID = /* GraphQL */ `query RevisionCardsByUserID(
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
      meaning
      audioID
      userID
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.RevisionCardsByUserIDQueryVariables,
  APITypes.RevisionCardsByUserIDQuery
>;
export const getAudionotes = /* GraphQL */ `query GetAudionotes($id: ID!) {
  getAudionotes(id: $id) {
    id
    title
    content
    audioID
    align
    userID
    User {
      id
      email
      username
      imageID
      createdAt
      updatedAt
      owner
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAudionotesQueryVariables,
  APITypes.GetAudionotesQuery
>;
export const listAudionotes = /* GraphQL */ `query ListAudionotes(
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
      align
      userID
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAudionotesQueryVariables,
  APITypes.ListAudionotesQuery
>;
export const audionotesByUserID = /* GraphQL */ `query AudionotesByUserID(
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
      align
      userID
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.AudionotesByUserIDQueryVariables,
  APITypes.AudionotesByUserIDQuery
>;
