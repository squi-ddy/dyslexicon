/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateComments = /* GraphQL */ `
  subscription OnCreateComments(
    $filter: ModelSubscriptionCommentsFilterInput
    $id: String
  ) {
    onCreateComments(filter: $filter, id: $id) {
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
export const onUpdateComments = /* GraphQL */ `
  subscription OnUpdateComments(
    $filter: ModelSubscriptionCommentsFilterInput
    $id: String
  ) {
    onUpdateComments(filter: $filter, id: $id) {
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
export const onDeleteComments = /* GraphQL */ `
  subscription OnDeleteComments(
    $filter: ModelSubscriptionCommentsFilterInput
    $id: String
  ) {
    onDeleteComments(filter: $filter, id: $id) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $id: String
  ) {
    onCreateUser(filter: $filter, id: $id) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $id: String
  ) {
    onUpdateUser(filter: $filter, id: $id) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $id: String
  ) {
    onDeleteUser(filter: $filter, id: $id) {
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
export const onCreatePosts = /* GraphQL */ `
  subscription OnCreatePosts(
    $filter: ModelSubscriptionPostsFilterInput
    $id: String
  ) {
    onCreatePosts(filter: $filter, id: $id) {
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
export const onUpdatePosts = /* GraphQL */ `
  subscription OnUpdatePosts(
    $filter: ModelSubscriptionPostsFilterInput
    $id: String
  ) {
    onUpdatePosts(filter: $filter, id: $id) {
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
export const onDeletePosts = /* GraphQL */ `
  subscription OnDeletePosts(
    $filter: ModelSubscriptionPostsFilterInput
    $id: String
  ) {
    onDeletePosts(filter: $filter, id: $id) {
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
export const onCreateRevisionCard = /* GraphQL */ `
  subscription OnCreateRevisionCard(
    $filter: ModelSubscriptionRevisionCardFilterInput
    $id: String
  ) {
    onCreateRevisionCard(filter: $filter, id: $id) {
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
export const onUpdateRevisionCard = /* GraphQL */ `
  subscription OnUpdateRevisionCard(
    $filter: ModelSubscriptionRevisionCardFilterInput
    $id: String
  ) {
    onUpdateRevisionCard(filter: $filter, id: $id) {
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
export const onDeleteRevisionCard = /* GraphQL */ `
  subscription OnDeleteRevisionCard(
    $filter: ModelSubscriptionRevisionCardFilterInput
    $id: String
  ) {
    onDeleteRevisionCard(filter: $filter, id: $id) {
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
export const onCreateAudionotes = /* GraphQL */ `
  subscription OnCreateAudionotes(
    $filter: ModelSubscriptionAudionotesFilterInput
    $id: String
  ) {
    onCreateAudionotes(filter: $filter, id: $id) {
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
export const onUpdateAudionotes = /* GraphQL */ `
  subscription OnUpdateAudionotes(
    $filter: ModelSubscriptionAudionotesFilterInput
    $id: String
  ) {
    onUpdateAudionotes(filter: $filter, id: $id) {
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
export const onDeleteAudionotes = /* GraphQL */ `
  subscription OnDeleteAudionotes(
    $filter: ModelSubscriptionAudionotesFilterInput
    $id: String
  ) {
    onDeleteAudionotes(filter: $filter, id: $id) {
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
