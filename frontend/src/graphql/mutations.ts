/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createComments = /* GraphQL */ `mutation CreateComments(
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
` as GeneratedMutation<
  APITypes.CreateCommentsMutationVariables,
  APITypes.CreateCommentsMutation
>;
export const updateComments = /* GraphQL */ `mutation UpdateComments(
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
` as GeneratedMutation<
  APITypes.UpdateCommentsMutationVariables,
  APITypes.UpdateCommentsMutation
>;
export const deleteComments = /* GraphQL */ `mutation DeleteComments(
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
` as GeneratedMutation<
  APITypes.DeleteCommentsMutationVariables,
  APITypes.DeleteCommentsMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser(
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
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
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
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
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
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const createPosts = /* GraphQL */ `mutation CreatePosts(
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
` as GeneratedMutation<
  APITypes.CreatePostsMutationVariables,
  APITypes.CreatePostsMutation
>;
export const updatePosts = /* GraphQL */ `mutation UpdatePosts(
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
` as GeneratedMutation<
  APITypes.UpdatePostsMutationVariables,
  APITypes.UpdatePostsMutation
>;
export const deletePosts = /* GraphQL */ `mutation DeletePosts(
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
` as GeneratedMutation<
  APITypes.DeletePostsMutationVariables,
  APITypes.DeletePostsMutation
>;
export const createRevisionCard = /* GraphQL */ `mutation CreateRevisionCard(
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
` as GeneratedMutation<
  APITypes.CreateRevisionCardMutationVariables,
  APITypes.CreateRevisionCardMutation
>;
export const updateRevisionCard = /* GraphQL */ `mutation UpdateRevisionCard(
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
` as GeneratedMutation<
  APITypes.UpdateRevisionCardMutationVariables,
  APITypes.UpdateRevisionCardMutation
>;
export const deleteRevisionCard = /* GraphQL */ `mutation DeleteRevisionCard(
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
` as GeneratedMutation<
  APITypes.DeleteRevisionCardMutationVariables,
  APITypes.DeleteRevisionCardMutation
>;
export const createAudionotes = /* GraphQL */ `mutation CreateAudionotes(
  $input: CreateAudionotesInput!
  $condition: ModelAudionotesConditionInput
) {
  createAudionotes(input: $input, condition: $condition) {
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
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateAudionotesMutationVariables,
  APITypes.CreateAudionotesMutation
>;
export const updateAudionotes = /* GraphQL */ `mutation UpdateAudionotes(
  $input: UpdateAudionotesInput!
  $condition: ModelAudionotesConditionInput
) {
  updateAudionotes(input: $input, condition: $condition) {
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
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateAudionotesMutationVariables,
  APITypes.UpdateAudionotesMutation
>;
export const deleteAudionotes = /* GraphQL */ `mutation DeleteAudionotes(
  $input: DeleteAudionotesInput!
  $condition: ModelAudionotesConditionInput
) {
  deleteAudionotes(input: $input, condition: $condition) {
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
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteAudionotesMutationVariables,
  APITypes.DeleteAudionotesMutation
>;
