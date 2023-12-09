/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API"
type GeneratedSubscription<InputType, OutputType> = string & {
    __generatedSubscriptionInput: InputType
    __generatedSubscriptionOutput: OutputType
}

export const onCreateComments = /* GraphQL */ `subscription OnCreateComments(
  $filter: ModelSubscriptionCommentsFilterInput
  $owner: String
) {
  onCreateComments(filter: $filter, owner: $owner) {
    id
    content
    audioID
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
` as GeneratedSubscription<
    APITypes.OnCreateCommentsSubscriptionVariables,
    APITypes.OnCreateCommentsSubscription
>
export const onUpdateComments = /* GraphQL */ `subscription OnUpdateComments(
  $filter: ModelSubscriptionCommentsFilterInput
  $owner: String
) {
  onUpdateComments(filter: $filter, owner: $owner) {
    id
    content
    audioID
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
` as GeneratedSubscription<
    APITypes.OnUpdateCommentsSubscriptionVariables,
    APITypes.OnUpdateCommentsSubscription
>
export const onDeleteComments = /* GraphQL */ `subscription OnDeleteComments(
  $filter: ModelSubscriptionCommentsFilterInput
  $owner: String
) {
  onDeleteComments(filter: $filter, owner: $owner) {
    id
    content
    audioID
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
` as GeneratedSubscription<
    APITypes.OnDeleteCommentsSubscriptionVariables,
    APITypes.OnDeleteCommentsSubscription
>
export const onCreateUser = /* GraphQL */ `subscription OnCreateUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onCreateUser(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
    APITypes.OnCreateUserSubscriptionVariables,
    APITypes.OnCreateUserSubscription
>
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onUpdateUser(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
    APITypes.OnUpdateUserSubscriptionVariables,
    APITypes.OnUpdateUserSubscription
>
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onDeleteUser(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
    APITypes.OnDeleteUserSubscriptionVariables,
    APITypes.OnDeleteUserSubscription
>
export const onCreatePosts = /* GraphQL */ `subscription OnCreatePosts(
  $filter: ModelSubscriptionPostsFilterInput
  $owner: String
) {
  onCreatePosts(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
    APITypes.OnCreatePostsSubscriptionVariables,
    APITypes.OnCreatePostsSubscription
>
export const onUpdatePosts = /* GraphQL */ `subscription OnUpdatePosts(
  $filter: ModelSubscriptionPostsFilterInput
  $owner: String
) {
  onUpdatePosts(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
    APITypes.OnUpdatePostsSubscriptionVariables,
    APITypes.OnUpdatePostsSubscription
>
export const onDeletePosts = /* GraphQL */ `subscription OnDeletePosts(
  $filter: ModelSubscriptionPostsFilterInput
  $owner: String
) {
  onDeletePosts(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
    APITypes.OnDeletePostsSubscriptionVariables,
    APITypes.OnDeletePostsSubscription
>
export const onCreateRevisionCard =
    /* GraphQL */ `subscription OnCreateRevisionCard(
  $filter: ModelSubscriptionRevisionCardFilterInput
  $owner: String
) {
  onCreateRevisionCard(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
        APITypes.OnCreateRevisionCardSubscriptionVariables,
        APITypes.OnCreateRevisionCardSubscription
    >
export const onUpdateRevisionCard =
    /* GraphQL */ `subscription OnUpdateRevisionCard(
  $filter: ModelSubscriptionRevisionCardFilterInput
  $owner: String
) {
  onUpdateRevisionCard(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
        APITypes.OnUpdateRevisionCardSubscriptionVariables,
        APITypes.OnUpdateRevisionCardSubscription
    >
export const onDeleteRevisionCard =
    /* GraphQL */ `subscription OnDeleteRevisionCard(
  $filter: ModelSubscriptionRevisionCardFilterInput
  $owner: String
) {
  onDeleteRevisionCard(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
        APITypes.OnDeleteRevisionCardSubscriptionVariables,
        APITypes.OnDeleteRevisionCardSubscription
    >
export const onCreateAudionotes =
    /* GraphQL */ `subscription OnCreateAudionotes(
  $filter: ModelSubscriptionAudionotesFilterInput
  $owner: String
) {
  onCreateAudionotes(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
        APITypes.OnCreateAudionotesSubscriptionVariables,
        APITypes.OnCreateAudionotesSubscription
    >
export const onUpdateAudionotes =
    /* GraphQL */ `subscription OnUpdateAudionotes(
  $filter: ModelSubscriptionAudionotesFilterInput
  $owner: String
) {
  onUpdateAudionotes(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
        APITypes.OnUpdateAudionotesSubscriptionVariables,
        APITypes.OnUpdateAudionotesSubscription
    >
export const onDeleteAudionotes =
    /* GraphQL */ `subscription OnDeleteAudionotes(
  $filter: ModelSubscriptionAudionotesFilterInput
  $owner: String
) {
  onDeleteAudionotes(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
        APITypes.OnDeleteAudionotesSubscriptionVariables,
        APITypes.OnDeleteAudionotesSubscription
    >
