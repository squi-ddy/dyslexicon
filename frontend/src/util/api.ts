import { ForumCommentData, ForumContentData, UserContentData } from "./types"
import helloUrl from "/hello.mp3"
import hello2Url from "/hello2.mp3"
import { signUp, confirmSignUp, type ConfirmSignUpInput } from 'aws-amplify/auth';


// TODO: use firestore

const userContent: { [username: string]: { [id: string]: UserContentData } } = {
    johndoe: {
        "1": {
            title: "Lorem Ipsum",
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        "1293": {
            title: "Test1",
            body: "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz\nhi",
        },
        "2977": {
            title: "Test",
            body: "The\nquick\nbrown\nfox\njumps\nover\nthe\nlazy\ndog",
        },
    },
}

const forumContent: { [id: string]: ForumContentData } = {
    "1": {
        title: "Help me with pronunciation",
        by: "user1",
        body: "I'm having trouble with the pronunciation of the word 'hello'. Can someone help me?",
        comments: [
            {
                body: "I think it should be like this:",
                by: "user2",
                audio: hello2Url,
            },
        ],
        audio: helloUrl,
    },
    "2": {
        title: "Hi!",
        by: "user2",
        body: "Hi everyone! I'm new here. Nice to meet you all!",
        comments: [
            {
                body: "Hi!",
                by: "user3",
            },
            {
                body: "Welcome!",
                by: "user4",
            },
        ],
    },
}

let loggedInUser = ""

const reviseWords: { [username: string]: string[] } = {
    johndoe: ["hello", "world", "goodbye", "goodnight", "pronunciation"],
}

const users: { [username: string]: string } = {
    user1: "user1",
    user2: "user2",
    user3: "user3",
    user4: "user4",
    johndoe: "password123",
}

export function getForumContent() {
    return forumContent
}

export function getUserContent() {
    return userContent[getLoggedInUser()]
}

export function getUserContentById(id: string) {
    return userContent[getLoggedInUser()][id]
}

export function getForumContentById(id: string) {
    return forumContent[id]
}

export function addComment(contentId: string, comment: ForumCommentData) {
    forumContent[contentId].comments.push(comment)
}

export function addForumPost(content: ForumContentData) {
    forumContent[crypto.randomUUID()] = content
}

export function addUserContent(content: UserContentData) {
    userContent[getLoggedInUser()][crypto.randomUUID()] = content
}

export function getLoggedInUser() {
    return loggedInUser
}

export function getNextReviseWord() {
    return reviseWords[getLoggedInUser()][0]
}

export function editUserContent(id: string, content: UserContentData) {
    userContent[getLoggedInUser()][id] = content
}

export function reviseFailure() {
    const insertIndex =
        Math.floor(
            Math.random() * reviseWords[getLoggedInUser()].length * 0.3
        ) + 2 // insert in first 30%, but never twice in a row
    reviseWords[getLoggedInUser()].splice(
        insertIndex,
        0,
        reviseWords[getLoggedInUser()][0]
    )
    reviseWords[getLoggedInUser()].shift()
}

export function reviseSuccess() {
    const word = reviseWords[getLoggedInUser()].shift()
    if (Math.random() < 0.3) {
        // 30% chance of reinsertion
        reviseWords[getLoggedInUser()].push(word!)
    }
}

export function addToRevision(word: string) {
    // push word to front of revision list
    reviseWords[getLoggedInUser()].unshift(word)
}

export function logOut() {
    loggedInUser = ""
}

export function isLoggedIn() {
    return loggedInUser !== ""
}

export function logIn(username: string, password: string): boolean {
    if (users[username] === password) {
        loggedInUser = username
        return true
    } else {
        return false
    }
}

// export function signUp(username: string, password: string): boolean {
//     if (users[username] === undefined) {
//         users[username] = password
//         reviseWords[username] = []
//         userContent[username] = {}
//         loggedInUser = username
//         return true
//     } else {
//         return false
//     }
// }


export type SignUpParameters = {
  username: string;
  password: string;
  email: string;
};

export async function handleSignUp({
  username,
  password,
  email,
}: SignUpParameters) {
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: email,
      password: password,
      options: {
            userAttributes: {email: email},
            validationData: {Name: "username", Value: username}
        }})

    console.log(userId);
  } catch (error : any) {
    if (error.code === "UserLambdaValidationException" && error.message == "PreSignUp failed with error Username already exists!.") {    
        error.message = "Username already exists";  
    }    
    throw error;  
  }
}

async function handleSignUpConfirmation({
  username,
  confirmationCode
}: ConfirmSignUpInput) {
  try {
    await confirmSignUp({
      username,
      confirmationCode
    });
  } catch (error) {
    console.log('error confirming sign up', error);
  }
}
