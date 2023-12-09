import { ForumCommentData, ForumContentData, UserContentData } from "./types"
import helloUrl from "/hello.mp3"
import hello2Url from "/hello2.mp3"
import { generateClient, get } from 'aws-amplify/api';
import { uploadData, downloadData, remove  } from 'aws-amplify/storage';
import { Predictions } from '@aws-amplify/predictions';
import { v4 as uuidv4 } from 'uuid';
import { getUser, audionotesByUserID, getAudionotes, listPosts, getPosts, commentsByPostsID } from '../graphql/queries';
import { createAudionotes, updateAudionotes, deleteAudionotes, createUser, updateUser, deleteUser } from '../graphql/mutations';
import axios from 'axios';
import { signUp, confirmSignUp, type ConfirmSignUpInput, signIn, type SignInInput, signOut, getCurrentUser  } from 'aws-amplify/auth';
// TODO: use firestore

const client = generateClient();

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

export let loggedInUser = ""
export let user_name = ""
let input : any;
const reviseWords: { [username: string]: string[] } = {
    "4a64f2f7-704c-4f0d-a47a-89b57d8a4962": ["hello", "world", "goodbye", "goodnight", "pronunciation"],
}

const audioContext = new AudioContext();

const users: { [username: string]: string } = {
    user1: "user1",
    user2: "user2",
    user3: "user3",
    user4: "user4",
    johndoe: "password123",
}

export async function getForumContent() {
    const result = await client.graphql({
        query: listPosts
    })
    
    const lists = result.data.listPosts.items
    lists.forEach(async (element: any) => {
        const user = await client.graphql({ 
            query: getUser,
            variables: {
                id: element.userID
            },
            authMode: 'userPool'
        })
        const comments = await client.graphql({
            query: commentsByPostsID,
            variables: {
                postsID: element.id
            }
        })
        element.username = user.data.getUser!.username
        if (element.audioID) {
            const downloadResult = await downloadData({ 
                key: element.audioID, options: {
                accessLevel: 'private',
            } }).result;
            const text = await downloadResult.body.blob();
            element.audio = text;
        }
        element.comments = comments.data.commentsByPostsID.items
        element.comments.forEach(async (comment: any) => {
            const user = await client.graphql({ 
                query: getUser,
                variables: {
                    id: comment.userID
                },
                authMode: 'userPool'
            })
            comment.by = user.data.getUser!.username
            if (comment.audioID) {
                const downloadResult = await downloadData({ 
                    key: element.audioID, options: {
                    accessLevel: 'private',
                } }).result;
                const text = await downloadResult.body.blob();
                comment.audio = text;
            }
        })
    })
    return lists
}

export async function getUserContent() {

    const result = await client.graphql({
        query: audionotesByUserID,
        variables: {
            userID: loggedInUser,
        },
        authMode: 'userPool'
    })

    return result.data.audionotesByUserID.items
}

export async function getUserContentById(id: string) {
    const result = await client.graphql({
        query: getAudionotes,
        variables: {
            id: id
        },
        authMode: 'userPool'
    })
    
    return result.data.getAudionotes
}

export async function getForumContentById(id: string) {
    const result = await client.graphql({
        query: getPosts,
        variables: {
            id: id
        },
        authMode: 'userPool'
    })
    const result2: any = result.data.getPosts;
    const user = await client.graphql({ 
        query: getUser,
        variables: {
            id: result2.userID
        },
        authMode: 'userPool'
    })
    const comments = await client.graphql({
        query: commentsByPostsID,
        variables: {
            postsID: result2.id
        }
    })
    result2.username = user.data.getUser!.username
    if (result2.audioID) {
        const downloadResult = await downloadData({ 
            key: result2.audioID, options: {
            accessLevel: 'private',
        } }).result;
        const text = await downloadResult.body.blob();
        result2.audio = text;
    }
    result2.comments = comments.data.commentsByPostsID.items
    return result2!
}

export function addComment(contentId: string, comment: ForumCommentData) {
    forumContent[contentId].comments.push(comment)
}

export function addForumPost(content: ForumContentData) {
    forumContent[crypto.randomUUID()] = content
}
export async function deleteUserContent(id: string, filename: string) {
    await remove({key: filename});
    const result = await client.graphql({
        query: deleteAudionotes,
        variables: {
            input: {
                id: id
            }
        },
        authMode: 'userPool'
    })
    return result.data.deleteAudionotes
}
export async function addUserContent(content: UserContentData): Promise<boolean> {
    // userContent[getLoggedInUser()][crypto.randomUUID()] = content
    const user = await currentAuthenticatedUser();
    Predictions.convert({
    textToSpeech: {
        source: {
        text: content.body
        },
        voiceId: "Amy"
    }
    })
    .then(async (audio) => {
        try {
            const result = await uploadData({
                key: `${user!.id}/audio/audionotes/${uuidv4()}.wav`,
                data: audio.audioStream,
                options: {
                    accessLevel: 'private',
                }
            }).result;
            let bufferToBase64 = function (buffer : any) {
                let bytes = new Uint8Array(buffer);
                let len = buffer.byteLength;
                let binary = "";
                for (let i = 0; i < len; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                return btoa(binary);
            };
            axios.post("http://18.136.208.218:8080/align", 
            {"instances": [{"text": content.body, "speech": bufferToBase64(audio.audioStream)}]}).then(async (res) => {
                const audionote = await client.graphql({
                    
                    query: createAudionotes,
                    variables: {
                      input: {
                        content: content.body,
                        title: content.title,
                        userID: user!.id!,
                        audioID: result.key,
                        align: JSON.stringify(res.data.predictions.fragments),
                      }  
                    },
                    authMode: 'userPool' 
                  });
                  
             })
             .catch((err) => {
                console.log(err);
                return false;
             });
            
        } catch (error) {
            console.log('Error : ', error);
            return false;
        }
    })
    .catch(err => {console.log(err); return false;});
    return true;
}

export function getLoggedInUser() {
    return loggedInUser
}

export function getNextReviseWord() {
    return reviseWords[getLoggedInUser()][0]
}

export async function downloadAudio(audioID: string) {
    const downloadResult = await downloadData({ 
        key: audioID, options: {
        accessLevel: 'private',
    } }).result;
    const text = await downloadResult.body.blob();
    const arrayBuffer = await text.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    return audioBuffer;
}

export async function editUserContent(id: string, content: UserContentData, audio: boolean, filename: string) {
    if (audio) {
        const user = await currentAuthenticatedUser();
        await remove({key: filename});
        Predictions.convert({
        textToSpeech: {
            source: {
            text: content.body
            },
            voiceId: "Amy"
        }
        })
        .then(async (audio) => {
            try {
                const result = await uploadData({
                    key: `${user!.id}/audio/audionotes/${uuidv4()}.wav`,
                    data: audio.audioStream,
                    options: {
                        accessLevel: 'private',
                    }
                }).result;
                let bufferToBase64 = function (buffer : any) {
                    let bytes = new Uint8Array(buffer);
                    let len = buffer.byteLength;
                    let binary = "";
                    for (let i = 0; i < len; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }
                    return btoa(binary);
                };
                axios.post("http://18.136.208.218:8080/align", 
                {"instances": [{"text": content.body, "speech": bufferToBase64(audio.audioStream)}]}).then(async (res) => {
                    const audionote = await client.graphql({
                        
                        query: updateAudionotes,
                        variables: {
                            input: {
                                id: id,
                                content: content.body,
                                title: content.title,
                                audioID: result.key,
                                align: JSON.stringify(res.data.predictions.fragments),
                            }  
                        },
                        authMode: 'userPool' 
                    });
                    
                })
                .catch((err) => {
                    console.log(err);
                    return false;
                });
                
            } catch (error) {
                console.log('Error : ', error);
                return false;
            }
        })
        .catch(err => {console.log(err); return false;});}
    else {
        const result = await client.graphql({
        query: updateAudionotes,
        variables: {
            input: {
                id: id,
                title: content.title,
                content: content.body
            }
        },
        authMode: 'userPool'
    })}
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
            userAttributes: {email: email, preferred_username: username},
            validationData: {Name: "username", Value: username},
            autoSignIn: true
    }})
    loggedInUser = userId!;
    user_name = password;
    input = {
        id: loggedInUser!,
        email: email,
        username: username,
    }

    if (nextStep.signUpStep === "CONFIRM_SIGN_UP") {
        return true
    } else if (nextStep.signUpStep === "DONE") {
        return false
    } else {
        // auto sign in stuff
    }
  } catch (error : any) {
    console.log(error)
    if (error.code === "UserLambdaValidationException" && error.message == "PreSignUp failed with error Username already exists!.") {    
        error.message = "Username already exists";  
    }    
    throw error;  
  }
}

export async function handleSignIn({ username, password }: SignInInput) {
  try {

    const { isSignedIn, nextStep } = await signIn({ username, password });
    const user = await currentAuthenticatedUser();
    loggedInUser = user!.id;
    let details = await getUserDetails();
    user_name = details!.username;
    return isSignedIn;
  } catch (error) {

        throw error;

  }

}

export async function handleSignUpConfirmation({
    username,
    confirmationCode
  }: ConfirmSignUpInput) {
    try {
        await confirmSignUp({
        username,
        confirmationCode
      }).then(async () => {
        await signIn({username: loggedInUser, password: user_name}).then(async () => {
            user_name = input.username;
            await client.graphql({
                query: createUser,
                variables: {
                    input: input
                },
                authMode: 'userPool'
            });})
        });
      
    } catch (error) {
      console.log(error);
    }
  }


  

export async function handleSignOut() {
    try {
      await signOut(); 
      loggedInUser = "";
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }

export async function currentAuthenticatedUser() {
  try {
    const { username, userId, signInDetails } = await getCurrentUser();
    return { username: username, id: userId};
  } catch (err) {
    console.log(err);
  }
}

export async function getUserDetails() { 
  try {
    const result = await client.graphql({
        query: getUser,
        variables: {
            id: loggedInUser
        },
        authMode: 'userPool'
    })
    return result.data.getUser;
  } catch (error) {
    throw error;
  }
}

