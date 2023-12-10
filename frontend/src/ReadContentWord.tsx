import { AddIcon, Icon } from "@chakra-ui/icons"
import {
    Box,
    ButtonGroup,
    IconButton,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    useToken,
} from "@chakra-ui/react"
import {
    HiOutlineQuestionMarkCircle,
    HiOutlineSpeakerWave,
} from "react-icons/hi2"
import { CustomTooltip } from "./CustomTooltip"
import { addToRevision } from "./util/api"
import { Predictions } from '@aws-amplify/predictions';

export function ReadContentWord(props: {
    word: string
    idx: number
    highlighted: number
    selected: number
    triggerHighlight: (idx: number) => void
    triggerClick: (idx: number) => void
    clicked: boolean
}) {
    const highlightColor = useToken("colors", "themeColors.accent1") + "55"

    return (
        <Popover
            isOpen={props.selected === props.idx && props.clicked}
            autoFocus={false}
            isLazy
        >
            <PopoverTrigger>
                <Box
                    display={"inline-block"}
                    onMouseEnter={() => props.triggerHighlight(props.idx)}
                    onMouseLeave={() => props.triggerHighlight(-1)}
                    bgColor={
                        props.selected === props.idx
                            ? "themeColors.accent1"
                            : props.highlighted === props.idx
                            ? highlightColor
                            : "transparent"
                    }
                    borderRadius={"md"}
                    onMouseDown={(e) => {
                        props.triggerClick(props.idx)
                        e.stopPropagation()
                    }}
                >
                    {props.word}
                </Box>
            </PopoverTrigger>
            <PopoverContent
                bgColor={"themeColors.popoverBackground"}
                w={"fit-content"}
            >
                <PopoverArrow bgColor={"themeColors.popoverBackground"} />
                <PopoverBody>
                    <ButtonGroup spacing={2}>
                        <CustomTooltip
                            label={"Play audio"}
                            placement={"bottom"}
                        >
                            <IconButton
                                onClick={async () => {
                                    Predictions.convert({
                                        textToSpeech: {                                     
                                          source: {                                      
                                            text: props.word                                     
                                          },
                                          voiceId: "Amy" 
                                        }
                                      })
                                      .then(result => {
                                        const aud = new AudioContext();
                                        const source = aud.createBufferSource();
                                        aud.decodeAudioData(result.audioStream, (buffer) => {
                                            source.buffer = buffer;
                                            source.connect(aud.destination);
                                            source.start(0);
                                            
                                        })
                                      })
                                }}
                                aria-label="Play audio"
                                icon={
                                    <Icon
                                        as={HiOutlineSpeakerWave}
                                        boxSize={5}
                                    />
                                }
                            ></IconButton>
                        </CustomTooltip>
                        <CustomTooltip
                            label={"Show meaning"}
                            placement={"bottom"}
                        >
                            <IconButton
                                aria-label="Show meaning"
                                icon={
                                    <Icon
                                        as={HiOutlineQuestionMarkCircle}
                                        boxSize={5}
                                    />
                                }
                            ></IconButton>
                        </CustomTooltip>
                        <CustomTooltip
                            label={"Add to revision"}
                            placement={"bottom"}
                        >
                            <IconButton
                                aria-label="Add to revision"
                                onClick={() => {
                                    addToRevision(props.word)
                                }}
                                icon={<Icon as={AddIcon} boxSize={3} />}
                            ></IconButton>
                        </CustomTooltip>
                    </ButtonGroup>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}
