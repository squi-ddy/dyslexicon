import { ArrowForwardIcon } from "@chakra-ui/icons"
import {
    Box,
    BoxProps,
    Card,
    CardBody,
    CardHeader,
    Divider,
    HStack,
    Heading,
    IconButton,
    Input,
    Text,
    VStack,
} from "@chakra-ui/react"
import { useState } from "react"
import { BsMic } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import { CustomTooltip } from "./CustomTooltip"
import { addComment, getLoggedInUser } from "./util/api"
import { ForumContentData } from "./util/types"

export function ForumCard(props: {
    styleProps?: BoxProps
    id: string
    hasLink?: true
    content: any
    cardWidth: "full" | number
    limitHeight?: true
    frontPage?: boolean 
    triggerReload: () => void
}) {
    const [commentText, setCommentText] = useState("")
    const navigate = useNavigate()
    if (props.content.comments === undefined) props.content.comments = []
    return (
        <Card
            {...props.styleProps}
            key={props.id}
            onClick={
                props.hasLink
                    ? () => {
                          navigate(props.id)
                      }
                    : undefined
            }
            w={
                props.cardWidth === "full"
                    ? props.cardWidth
                    : props.cardWidth + "px"
            }
            variant="clickable-card"
        >
            <CardHeader pb={0}>
                <Heading size={"md"} noOfLines={1}>
                    {props.content.title}
                </Heading>
                <Text fontSize="sm">Posted by {props.content.username}</Text>
            </CardHeader>
            <CardBody minH={0} display={"flex"} flexDir={"column"}>
                <VStack overflow="hidden"
                    w={"full"}
                    spacing={2}
                    align={"left"}
                    overflowX={"hidden"}
                >
                    <Text 
                        fontSize="sm"
                        whiteSpace={"pre-wrap"}
                        overflow={"hidden"}
                        w={"full"}
                        isTruncated={props.limitHeight}
                    >
                        {props.content.content}
                    </Text>
                    {props.content.audio && (
                        <Box as={"audio"} controls>
                            <source
                                src={URL.createObjectURL(
                                    new Blob([props.content.audio])
                                )}
                            />
                        </Box>
                    )}
                    {!props.frontPage && (<Divider borderWidth={2} />)}
                    {props.content.comments.length > 0 && !props.frontPage && (
                        <VStack
                            w={"full"}
                            spacing={2}
                            maxH={props.limitHeight ? 200 : undefined}
                            overflowY={"scroll"}
                            flexShrink={1}
                        >
                            {props.content.comments.map((comment: any) => (
                                <Text
                                    as={Box}
                                    borderWidth={2}
                                    borderColor={"themeColors.accent1"}
                                    borderRadius={"md"}
                                    p={2}
                                    w={"full"}
                                    fontSize={"sm"}
                                    whiteSpace={"pre-wrap"}
                                    display={"inline-block"}
                                    mb={0}
                                >
                                    {comment.content}
                                    {comment.audio ? (
                                        <Box
                                            as={"audio"}
                                            controls
                                            maxW={"full"}
                                        >
                                            <source
                                                src={URL.createObjectURL(
                                                    new Blob([comment.audio])
                                                )}
                                            />
                                        </Box>
                                    ) : (
                                        <>&nbsp;</>
                                    )}
                                    <Text
                                        fontSize="xs"
                                        display={"inline-block"}
                                    >
                                        ~{comment.username}
                                    </Text>
                                </Text>
                            ))}
                        </VStack>
                    )}
                    {!props.frontPage && (<HStack w={"full"}>
                            <Input
                                value={commentText}
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                }}
                                onChange={(e) => {
                                    setCommentText(e.target.value)
                                }}
                                placeholder="Add a comment..."
                            />
                            {/* <CustomTooltip label={"Add audio"} placement={"left"}>
                                <IconButton
                                    float={"right"}
                                    aria-label={"Add audio"}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                    }}
                                    icon={<BsMic boxSize={5} />}
                                ></IconButton>
                            </CustomTooltip> */}
                            {commentText.length > 0 && (
                                <CustomTooltip
                                    label={"Post comment"}
                                    placement={"left"}
                                >
                                    <IconButton
                                        onClick={async (e) => {
                                            await addComment(props.id, {
                                                body: commentText,
                                            })
                                            setCommentText("")
                                            await props.triggerReload()
                                            e.stopPropagation()
                                        }}
                                        float={"right"}
                                        aria-label={"Post comment"}
                                        icon={<ArrowForwardIcon boxSize={5} />}
                                    ></IconButton>
                                </CustomTooltip>
                            )}
                        </HStack>)}
                </VStack>
            </CardBody>
        </Card>
    )
}
