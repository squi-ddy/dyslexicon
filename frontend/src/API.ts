/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateCommentsInput = {
  id?: string | null,
  content?: string | null,
  audioID?: string | null,
  postedAt?: string | null,
  username?: string | null,
  userID: string,
  postsID: string,
};

export type ModelCommentsConditionInput = {
  content?: ModelStringInput | null,
  audioID?: ModelStringInput | null,
  postedAt?: ModelStringInput | null,
  username?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  postsID?: ModelIDInput | null,
  and?: Array< ModelCommentsConditionInput | null > | null,
  or?: Array< ModelCommentsConditionInput | null > | null,
  not?: ModelCommentsConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type Comments = {
  __typename: "Comments",
  id: string,
  content?: string | null,
  audioID?: string | null,
  postedAt?: string | null,
  username?: string | null,
  userID: string,
  postsID: string,
  Posts?: Posts | null,
  User?: User | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type Posts = {
  __typename: "Posts",
  id: string,
  title?: string | null,
  content?: string | null,
  postedAt?: string | null,
  likes?: number | null,
  audioID?: string | null,
  username?: string | null,
  User?: User | null,
  userID: string,
  Comments?: ModelCommentsConnection | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type User = {
  __typename: "User",
  id: string,
  Posts?: ModelPostsConnection | null,
  RevisionCards?: ModelRevisionCardConnection | null,
  Audionotes?: ModelAudionotesConnection | null,
  email: string,
  username: string,
  imageID?: string | null,
  Comments?: ModelCommentsConnection | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type ModelPostsConnection = {
  __typename: "ModelPostsConnection",
  items:  Array<Posts | null >,
  nextToken?: string | null,
};

export type ModelRevisionCardConnection = {
  __typename: "ModelRevisionCardConnection",
  items:  Array<RevisionCard | null >,
  nextToken?: string | null,
};

export type RevisionCard = {
  __typename: "RevisionCard",
  id: string,
  front?: string | null,
  meaning?: string | null,
  audioID?: string | null,
  userID: string,
  User?: User | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type ModelAudionotesConnection = {
  __typename: "ModelAudionotesConnection",
  items:  Array<Audionotes | null >,
  nextToken?: string | null,
};

export type Audionotes = {
  __typename: "Audionotes",
  id: string,
  title?: string | null,
  content?: string | null,
  audioID?: string | null,
  align?: string | null,
  userID: string,
  User?: User | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type ModelCommentsConnection = {
  __typename: "ModelCommentsConnection",
  items:  Array<Comments | null >,
  nextToken?: string | null,
};

export type UpdateCommentsInput = {
  id: string,
  content?: string | null,
  audioID?: string | null,
  postedAt?: string | null,
  username?: string | null,
  userID?: string | null,
  postsID?: string | null,
};

export type DeleteCommentsInput = {
  id: string,
};

export type CreateUserInput = {
  id?: string | null,
  email: string,
  username: string,
  imageID?: string | null,
};

export type ModelUserConditionInput = {
  email?: ModelStringInput | null,
  username?: ModelStringInput | null,
  imageID?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type UpdateUserInput = {
  id: string,
  email?: string | null,
  username?: string | null,
  imageID?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreatePostsInput = {
  id?: string | null,
  title?: string | null,
  content?: string | null,
  postedAt?: string | null,
  likes?: number | null,
  audioID?: string | null,
  username?: string | null,
  userID: string,
};

export type ModelPostsConditionInput = {
  title?: ModelStringInput | null,
  content?: ModelStringInput | null,
  postedAt?: ModelStringInput | null,
  likes?: ModelIntInput | null,
  audioID?: ModelStringInput | null,
  username?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelPostsConditionInput | null > | null,
  or?: Array< ModelPostsConditionInput | null > | null,
  not?: ModelPostsConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdatePostsInput = {
  id: string,
  title?: string | null,
  content?: string | null,
  postedAt?: string | null,
  likes?: number | null,
  audioID?: string | null,
  username?: string | null,
  userID?: string | null,
};

export type DeletePostsInput = {
  id: string,
};

export type CreateRevisionCardInput = {
  id?: string | null,
  front?: string | null,
  meaning?: string | null,
  audioID?: string | null,
  userID: string,
};

export type ModelRevisionCardConditionInput = {
  front?: ModelStringInput | null,
  meaning?: ModelStringInput | null,
  audioID?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelRevisionCardConditionInput | null > | null,
  or?: Array< ModelRevisionCardConditionInput | null > | null,
  not?: ModelRevisionCardConditionInput | null,
};

export type UpdateRevisionCardInput = {
  id: string,
  front?: string | null,
  meaning?: string | null,
  audioID?: string | null,
  userID?: string | null,
};

export type DeleteRevisionCardInput = {
  id: string,
};

export type CreateAudionotesInput = {
  id?: string | null,
  title?: string | null,
  content?: string | null,
  audioID?: string | null,
  align?: string | null,
  userID: string,
};

export type ModelAudionotesConditionInput = {
  title?: ModelStringInput | null,
  content?: ModelStringInput | null,
  audioID?: ModelStringInput | null,
  align?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelAudionotesConditionInput | null > | null,
  or?: Array< ModelAudionotesConditionInput | null > | null,
  not?: ModelAudionotesConditionInput | null,
};

export type UpdateAudionotesInput = {
  id: string,
  title?: string | null,
  content?: string | null,
  audioID?: string | null,
  align?: string | null,
  userID?: string | null,
};

export type DeleteAudionotesInput = {
  id: string,
};

export type ModelCommentsFilterInput = {
  id?: ModelIDInput | null,
  content?: ModelStringInput | null,
  audioID?: ModelStringInput | null,
  postedAt?: ModelStringInput | null,
  username?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  postsID?: ModelIDInput | null,
  and?: Array< ModelCommentsFilterInput | null > | null,
  or?: Array< ModelCommentsFilterInput | null > | null,
  not?: ModelCommentsFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  email?: ModelStringInput | null,
  username?: ModelStringInput | null,
  imageID?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelPostsFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  content?: ModelStringInput | null,
  postedAt?: ModelStringInput | null,
  likes?: ModelIntInput | null,
  audioID?: ModelStringInput | null,
  username?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelPostsFilterInput | null > | null,
  or?: Array< ModelPostsFilterInput | null > | null,
  not?: ModelPostsFilterInput | null,
};

export type ModelRevisionCardFilterInput = {
  id?: ModelIDInput | null,
  front?: ModelStringInput | null,
  meaning?: ModelStringInput | null,
  audioID?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelRevisionCardFilterInput | null > | null,
  or?: Array< ModelRevisionCardFilterInput | null > | null,
  not?: ModelRevisionCardFilterInput | null,
};

export type ModelAudionotesFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  content?: ModelStringInput | null,
  audioID?: ModelStringInput | null,
  align?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelAudionotesFilterInput | null > | null,
  or?: Array< ModelAudionotesFilterInput | null > | null,
  not?: ModelAudionotesFilterInput | null,
};

export type ModelSubscriptionCommentsFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  content?: ModelSubscriptionStringInput | null,
  audioID?: ModelSubscriptionStringInput | null,
  postedAt?: ModelSubscriptionStringInput | null,
  username?: ModelSubscriptionStringInput | null,
  userID?: ModelSubscriptionIDInput | null,
  postsID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionCommentsFilterInput | null > | null,
  or?: Array< ModelSubscriptionCommentsFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  email?: ModelSubscriptionStringInput | null,
  username?: ModelSubscriptionStringInput | null,
  imageID?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionPostsFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  content?: ModelSubscriptionStringInput | null,
  postedAt?: ModelSubscriptionStringInput | null,
  likes?: ModelSubscriptionIntInput | null,
  audioID?: ModelSubscriptionStringInput | null,
  username?: ModelSubscriptionStringInput | null,
  userID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionPostsFilterInput | null > | null,
  or?: Array< ModelSubscriptionPostsFilterInput | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionRevisionCardFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  front?: ModelSubscriptionStringInput | null,
  meaning?: ModelSubscriptionStringInput | null,
  audioID?: ModelSubscriptionStringInput | null,
  userID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionRevisionCardFilterInput | null > | null,
  or?: Array< ModelSubscriptionRevisionCardFilterInput | null > | null,
};

export type ModelSubscriptionAudionotesFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  content?: ModelSubscriptionStringInput | null,
  audioID?: ModelSubscriptionStringInput | null,
  align?: ModelSubscriptionStringInput | null,
  userID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionAudionotesFilterInput | null > | null,
  or?: Array< ModelSubscriptionAudionotesFilterInput | null > | null,
};

export type CreateCommentsMutationVariables = {
  input: CreateCommentsInput,
  condition?: ModelCommentsConditionInput | null,
};

export type CreateCommentsMutation = {
  createComments?:  {
    __typename: "Comments",
    id: string,
    content?: string | null,
    audioID?: string | null,
    postedAt?: string | null,
    username?: string | null,
    userID: string,
    postsID: string,
    Posts?:  {
      __typename: "Posts",
      id: string,
      title?: string | null,
      content?: string | null,
      postedAt?: string | null,
      likes?: number | null,
      audioID?: string | null,
      username?: string | null,
      userID: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      imageID?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateCommentsMutationVariables = {
  input: UpdateCommentsInput,
  condition?: ModelCommentsConditionInput | null,
};

export type UpdateCommentsMutation = {
  updateComments?:  {
    __typename: "Comments",
    id: string,
    content?: string | null,
    audioID?: string | null,
    postedAt?: string | null,
    username?: string | null,
    userID: string,
    postsID: string,
    Posts?:  {
      __typename: "Posts",
      id: string,
      title?: string | null,
      content?: string | null,
      postedAt?: string | null,
      likes?: number | null,
      audioID?: string | null,
      username?: string | null,
      userID: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      imageID?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteCommentsMutationVariables = {
  input: DeleteCommentsInput,
  condition?: ModelCommentsConditionInput | null,
};

export type DeleteCommentsMutation = {
  deleteComments?:  {
    __typename: "Comments",
    id: string,
    content?: string | null,
    audioID?: string | null,
    postedAt?: string | null,
    username?: string | null,
    userID: string,
    postsID: string,
    Posts?:  {
      __typename: "Posts",
      id: string,
      title?: string | null,
      content?: string | null,
      postedAt?: string | null,
      likes?: number | null,
      audioID?: string | null,
      username?: string | null,
      userID: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      imageID?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    Posts?:  {
      __typename: "ModelPostsConnection",
      nextToken?: string | null,
    } | null,
    RevisionCards?:  {
      __typename: "ModelRevisionCardConnection",
      nextToken?: string | null,
    } | null,
    Audionotes?:  {
      __typename: "ModelAudionotesConnection",
      nextToken?: string | null,
    } | null,
    email: string,
    username: string,
    imageID?: string | null,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    Posts?:  {
      __typename: "ModelPostsConnection",
      nextToken?: string | null,
    } | null,
    RevisionCards?:  {
      __typename: "ModelRevisionCardConnection",
      nextToken?: string | null,
    } | null,
    Audionotes?:  {
      __typename: "ModelAudionotesConnection",
      nextToken?: string | null,
    } | null,
    email: string,
    username: string,
    imageID?: string | null,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    Posts?:  {
      __typename: "ModelPostsConnection",
      nextToken?: string | null,
    } | null,
    RevisionCards?:  {
      __typename: "ModelRevisionCardConnection",
      nextToken?: string | null,
    } | null,
    Audionotes?:  {
      __typename: "ModelAudionotesConnection",
      nextToken?: string | null,
    } | null,
    email: string,
    username: string,
    imageID?: string | null,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreatePostsMutationVariables = {
  input: CreatePostsInput,
  condition?: ModelPostsConditionInput | null,
};

export type CreatePostsMutation = {
  createPosts?:  {
    __typename: "Posts",
    id: string,
    title?: string | null,
    content?: string | null,
    postedAt?: string | null,
    likes?: number | null,
    audioID?: string | null,
    username?: string | null,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      imageID?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    userID: string,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdatePostsMutationVariables = {
  input: UpdatePostsInput,
  condition?: ModelPostsConditionInput | null,
};

export type UpdatePostsMutation = {
  updatePosts?:  {
    __typename: "Posts",
    id: string,
    title?: string | null,
    content?: string | null,
    postedAt?: string | null,
    likes?: number | null,
    audioID?: string | null,
    username?: string | null,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      imageID?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    userID: string,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeletePostsMutationVariables = {
  input: DeletePostsInput,
  condition?: ModelPostsConditionInput | null,
};

export type DeletePostsMutation = {
  deletePosts?:  {
    __typename: "Posts",
    id: string,
    title?: string | null,
    content?: string | null,
    postedAt?: string | null,
    likes?: number | null,
    audioID?: string | null,
    username?: string | null,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      imageID?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    userID: string,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateRevisionCardMutationVariables = {
  input: CreateRevisionCardInput,
  condition?: ModelRevisionCardConditionInput | null,
};

export type CreateRevisionCardMutation = {
  createRevisionCard?:  {
    __typename: "RevisionCard",
    id: string,
    front?: string | null,
    meaning?: string | null,
    audioID?: string | null,
    userID: string,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      imageID?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateRevisionCardMutationVariables = {
  input: UpdateRevisionCardInput,
  condition?: ModelRevisionCardConditionInput | null,
};

export type UpdateRevisionCardMutation = {
  updateRevisionCard?:  {
    __typename: "RevisionCard",
    id: string,
    front?: string | null,
    meaning?: string | null,
    audioID?: string | null,
    userID: string,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      imageID?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteRevisionCardMutationVariables = {
  input: DeleteRevisionCardInput,
  condition?: ModelRevisionCardConditionInput | null,
};

export type DeleteRevisionCardMutation = {
  deleteRevisionCard?:  {
    __typename: "RevisionCard",
    id: string,
    front?: string | null,
    meaning?: string | null,
    audioID?: string | null,
    userID: string,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      imageID?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateAudionotesMutationVariables = {
  input: CreateAudionotesInput,
  condition?: ModelAudionotesConditionInput | null,
};

export type CreateAudionotesMutation = {
  createAudionotes?:  {
    __typename: "Audionotes",
    id: string,
    title?: string | null,
    content?: string | null,
    audioID?: string | null,
    align?: string | null,
    userID: string,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      imageID?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateAudionotesMutationVariables = {
  input: UpdateAudionotesInput,
  condition?: ModelAudionotesConditionInput | null,
};

export type UpdateAudionotesMutation = {
  updateAudionotes?:  {
    __typename: "Audionotes",
    id: string,
    title?: string | null,
    content?: string | null,
    audioID?: string | null,
    align?: string | null,
    userID: string,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      imageID?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteAudionotesMutationVariables = {
  input: DeleteAudionotesInput,
  condition?: ModelAudionotesConditionInput | null,
};

export type DeleteAudionotesMutation = {
  deleteAudionotes?:  {
    __typename: "Audionotes",
    id: string,
    title?: string | null,
    content?: string | null,
    audioID?: string | null,
    align?: string | null,
    userID: string,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      imageID?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetCommentsQueryVariables = {
  id: string,
};

export type GetCommentsQuery = {
  getComments?:  {
    __typename: "Comments",
    id: string,
    content?: string | null,
    audioID?: string | null,
    postedAt?: string | null,
    username?: string | null,
    userID: string,
    postsID: string,
    Posts?:  {
      __typename: "Posts",
      id: string,
      title?: string | null,
      content?: string | null,
      postedAt?: string | null,
      likes?: number | null,
      audioID?: string | null,
      username?: string | null,
      userID: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      imageID?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListCommentsQueryVariables = {
  filter?: ModelCommentsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCommentsQuery = {
  listComments?:  {
    __typename: "ModelCommentsConnection",
    items:  Array< {
      __typename: "Comments",
      id: string,
      content?: string | null,
      audioID?: string | null,
      postedAt?: string | null,
      username?: string | null,
      userID: string,
      postsID: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CommentsByUserIDQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCommentsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CommentsByUserIDQuery = {
  commentsByUserID?:  {
    __typename: "ModelCommentsConnection",
    items:  Array< {
      __typename: "Comments",
      id: string,
      content?: string | null,
      audioID?: string | null,
      postedAt?: string | null,
      username?: string | null,
      userID: string,
      postsID: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CommentsByPostsIDQueryVariables = {
  postsID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCommentsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CommentsByPostsIDQuery = {
  commentsByPostsID?:  {
    __typename: "ModelCommentsConnection",
    items:  Array< {
      __typename: "Comments",
      id: string,
      content?: string | null,
      audioID?: string | null,
      postedAt?: string | null,
      username?: string | null,
      userID: string,
      postsID: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    Posts?:  {
      __typename: "ModelPostsConnection",
      nextToken?: string | null,
    } | null,
    RevisionCards?:  {
      __typename: "ModelRevisionCardConnection",
      nextToken?: string | null,
    } | null,
    Audionotes?:  {
      __typename: "ModelAudionotesConnection",
      nextToken?: string | null,
    } | null,
    email: string,
    username: string,
    imageID?: string | null,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      imageID?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type FindEmailQueryVariables = {
  email: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type FindEmailQuery = {
  findEmail?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      imageID?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type FindUsernameQueryVariables = {
  username: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type FindUsernameQuery = {
  findUsername?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      imageID?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPostsQueryVariables = {
  id: string,
};

export type GetPostsQuery = {
  getPosts?:  {
    __typename: "Posts",
    id: string,
    title?: string | null,
    content?: string | null,
    postedAt?: string | null,
    likes?: number | null,
    audioID?: string | null,
    username?: string | null,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      imageID?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    userID: string,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListPostsQueryVariables = {
  filter?: ModelPostsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostsQuery = {
  listPosts?:  {
    __typename: "ModelPostsConnection",
    items:  Array< {
      __typename: "Posts",
      id: string,
      title?: string | null,
      content?: string | null,
      postedAt?: string | null,
      likes?: number | null,
      audioID?: string | null,
      username?: string | null,
      userID: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PostsByUserIDQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPostsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PostsByUserIDQuery = {
  postsByUserID?:  {
    __typename: "ModelPostsConnection",
    items:  Array< {
      __typename: "Posts",
      id: string,
      title?: string | null,
      content?: string | null,
      postedAt?: string | null,
      likes?: number | null,
      audioID?: string | null,
      username?: string | null,
      userID: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetRevisionCardQueryVariables = {
  id: string,
};

export type GetRevisionCardQuery = {
  getRevisionCard?:  {
    __typename: "RevisionCard",
    id: string,
    front?: string | null,
    meaning?: string | null,
    audioID?: string | null,
    userID: string,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      imageID?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListRevisionCardsQueryVariables = {
  filter?: ModelRevisionCardFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRevisionCardsQuery = {
  listRevisionCards?:  {
    __typename: "ModelRevisionCardConnection",
    items:  Array< {
      __typename: "RevisionCard",
      id: string,
      front?: string | null,
      meaning?: string | null,
      audioID?: string | null,
      userID: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type RevisionCardsByUserIDQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelRevisionCardFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type RevisionCardsByUserIDQuery = {
  revisionCardsByUserID?:  {
    __typename: "ModelRevisionCardConnection",
    items:  Array< {
      __typename: "RevisionCard",
      id: string,
      front?: string | null,
      meaning?: string | null,
      audioID?: string | null,
      userID: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetAudionotesQueryVariables = {
  id: string,
};

export type GetAudionotesQuery = {
  getAudionotes?:  {
    __typename: "Audionotes",
    id: string,
    title?: string | null,
    content?: string | null,
    audioID?: string | null,
    align?: string | null,
    userID: string,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      imageID?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListAudionotesQueryVariables = {
  filter?: ModelAudionotesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAudionotesQuery = {
  listAudionotes?:  {
    __typename: "ModelAudionotesConnection",
    items:  Array< {
      __typename: "Audionotes",
      id: string,
      title?: string | null,
      content?: string | null,
      audioID?: string | null,
      align?: string | null,
      userID: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type AudionotesByUserIDQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelAudionotesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type AudionotesByUserIDQuery = {
  audionotesByUserID?:  {
    __typename: "ModelAudionotesConnection",
    items:  Array< {
      __typename: "Audionotes",
      id: string,
      title?: string | null,
      content?: string | null,
      audioID?: string | null,
      align?: string | null,
      userID: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateCommentsSubscriptionVariables = {
  filter?: ModelSubscriptionCommentsFilterInput | null,
  owner?: string | null,
};

export type OnCreateCommentsSubscription = {
  onCreateComments?:  {
    __typename: "Comments",
    id: string,
    content?: string | null,
    audioID?: string | null,
    postedAt?: string | null,
    username?: string | null,
    userID: string,
    postsID: string,
    Posts?:  {
      __typename: "Posts",
      id: string,
      title?: string | null,
      content?: string | null,
      postedAt?: string | null,
      likes?: number | null,
      audioID?: string | null,
      username?: string | null,
      userID: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      imageID?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateCommentsSubscriptionVariables = {
  filter?: ModelSubscriptionCommentsFilterInput | null,
  owner?: string | null,
};

export type OnUpdateCommentsSubscription = {
  onUpdateComments?:  {
    __typename: "Comments",
    id: string,
    content?: string | null,
    audioID?: string | null,
    postedAt?: string | null,
    username?: string | null,
    userID: string,
    postsID: string,
    Posts?:  {
      __typename: "Posts",
      id: string,
      title?: string | null,
      content?: string | null,
      postedAt?: string | null,
      likes?: number | null,
      audioID?: string | null,
      username?: string | null,
      userID: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      imageID?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteCommentsSubscriptionVariables = {
  filter?: ModelSubscriptionCommentsFilterInput | null,
  owner?: string | null,
};

export type OnDeleteCommentsSubscription = {
  onDeleteComments?:  {
    __typename: "Comments",
    id: string,
    content?: string | null,
    audioID?: string | null,
    postedAt?: string | null,
    username?: string | null,
    userID: string,
    postsID: string,
    Posts?:  {
      __typename: "Posts",
      id: string,
      title?: string | null,
      content?: string | null,
      postedAt?: string | null,
      likes?: number | null,
      audioID?: string | null,
      username?: string | null,
      userID: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      imageID?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    Posts?:  {
      __typename: "ModelPostsConnection",
      nextToken?: string | null,
    } | null,
    RevisionCards?:  {
      __typename: "ModelRevisionCardConnection",
      nextToken?: string | null,
    } | null,
    Audionotes?:  {
      __typename: "ModelAudionotesConnection",
      nextToken?: string | null,
    } | null,
    email: string,
    username: string,
    imageID?: string | null,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    Posts?:  {
      __typename: "ModelPostsConnection",
      nextToken?: string | null,
    } | null,
    RevisionCards?:  {
      __typename: "ModelRevisionCardConnection",
      nextToken?: string | null,
    } | null,
    Audionotes?:  {
      __typename: "ModelAudionotesConnection",
      nextToken?: string | null,
    } | null,
    email: string,
    username: string,
    imageID?: string | null,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    Posts?:  {
      __typename: "ModelPostsConnection",
      nextToken?: string | null,
    } | null,
    RevisionCards?:  {
      __typename: "ModelRevisionCardConnection",
      nextToken?: string | null,
    } | null,
    Audionotes?:  {
      __typename: "ModelAudionotesConnection",
      nextToken?: string | null,
    } | null,
    email: string,
    username: string,
    imageID?: string | null,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreatePostsSubscriptionVariables = {
  filter?: ModelSubscriptionPostsFilterInput | null,
  owner?: string | null,
};

export type OnCreatePostsSubscription = {
  onCreatePosts?:  {
    __typename: "Posts",
    id: string,
    title?: string | null,
    content?: string | null,
    postedAt?: string | null,
    likes?: number | null,
    audioID?: string | null,
    username?: string | null,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      imageID?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    userID: string,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdatePostsSubscriptionVariables = {
  filter?: ModelSubscriptionPostsFilterInput | null,
  owner?: string | null,
};

export type OnUpdatePostsSubscription = {
  onUpdatePosts?:  {
    __typename: "Posts",
    id: string,
    title?: string | null,
    content?: string | null,
    postedAt?: string | null,
    likes?: number | null,
    audioID?: string | null,
    username?: string | null,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      imageID?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    userID: string,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeletePostsSubscriptionVariables = {
  filter?: ModelSubscriptionPostsFilterInput | null,
  owner?: string | null,
};

export type OnDeletePostsSubscription = {
  onDeletePosts?:  {
    __typename: "Posts",
    id: string,
    title?: string | null,
    content?: string | null,
    postedAt?: string | null,
    likes?: number | null,
    audioID?: string | null,
    username?: string | null,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      imageID?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    userID: string,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateRevisionCardSubscriptionVariables = {
  filter?: ModelSubscriptionRevisionCardFilterInput | null,
  owner?: string | null,
};

export type OnCreateRevisionCardSubscription = {
  onCreateRevisionCard?:  {
    __typename: "RevisionCard",
    id: string,
    front?: string | null,
    meaning?: string | null,
    audioID?: string | null,
    userID: string,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      imageID?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateRevisionCardSubscriptionVariables = {
  filter?: ModelSubscriptionRevisionCardFilterInput | null,
  owner?: string | null,
};

export type OnUpdateRevisionCardSubscription = {
  onUpdateRevisionCard?:  {
    __typename: "RevisionCard",
    id: string,
    front?: string | null,
    meaning?: string | null,
    audioID?: string | null,
    userID: string,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      imageID?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteRevisionCardSubscriptionVariables = {
  filter?: ModelSubscriptionRevisionCardFilterInput | null,
  owner?: string | null,
};

export type OnDeleteRevisionCardSubscription = {
  onDeleteRevisionCard?:  {
    __typename: "RevisionCard",
    id: string,
    front?: string | null,
    meaning?: string | null,
    audioID?: string | null,
    userID: string,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      imageID?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateAudionotesSubscriptionVariables = {
  filter?: ModelSubscriptionAudionotesFilterInput | null,
  owner?: string | null,
};

export type OnCreateAudionotesSubscription = {
  onCreateAudionotes?:  {
    __typename: "Audionotes",
    id: string,
    title?: string | null,
    content?: string | null,
    audioID?: string | null,
    align?: string | null,
    userID: string,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      imageID?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateAudionotesSubscriptionVariables = {
  filter?: ModelSubscriptionAudionotesFilterInput | null,
  owner?: string | null,
};

export type OnUpdateAudionotesSubscription = {
  onUpdateAudionotes?:  {
    __typename: "Audionotes",
    id: string,
    title?: string | null,
    content?: string | null,
    audioID?: string | null,
    align?: string | null,
    userID: string,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      imageID?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteAudionotesSubscriptionVariables = {
  filter?: ModelSubscriptionAudionotesFilterInput | null,
  owner?: string | null,
};

export type OnDeleteAudionotesSubscription = {
  onDeleteAudionotes?:  {
    __typename: "Audionotes",
    id: string,
    title?: string | null,
    content?: string | null,
    audioID?: string | null,
    align?: string | null,
    userID: string,
    User?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      imageID?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
