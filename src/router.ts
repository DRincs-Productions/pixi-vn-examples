import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { addCanvasComponentsRoute } from "./routes/canvas/add-canvas-components";
import { addImageContainerRoute } from "./routes/canvas/add-image-container";
import { addListenerGivenEventRoute } from "./routes/canvas/add-listener-given-event";
import { alignRoute } from "./routes/canvas/align";
import { dissolveTransitionRoute } from "./routes/canvas/dissolve-transition";
import { fadeRoute } from "./routes/canvas/fade";
import { fadeTransitionRoute } from "./routes/canvas/fade-transition";
import { getCanvasComponentsRoute } from "./routes/canvas/get-canvas-components";
import { heredityFactorRoute } from "./routes/canvas/heredity-factor";
import { imageSpriteAddRoute } from "./routes/canvas/image-sprite-add";
import { imageSpriteShowRoute } from "./routes/canvas/image-sprite-show";
import { mirrorRoute } from "./routes/canvas/mirror";
import { motionSequenceRoute } from "./routes/canvas/motion-sequence";
import { moveRoute } from "./routes/canvas/move";
import { moveinTransitionRoute } from "./routes/canvas/movein-transition";
import { performanceRoute } from "./routes/canvas/performance";
import { positionWithPercentageRoute } from "./routes/canvas/position-with-percentage";
import { pushinTransitionRoute } from "./routes/canvas/pushin-transition";
import { removeAllCanvasComponentsRoute } from "./routes/canvas/remove-all-canvas-components";
import { removeCanvasComponentsRoute } from "./routes/canvas/remove-canvas-components";
import { rotateRoute } from "./routes/canvas/rotate";
import { sequenceRoute } from "./routes/canvas/sequence";
import { shakeRoute } from "./routes/canvas/shake";
import { showImageContainerRoute } from "./routes/canvas/show-image-container";
import { textCanvasRoute } from "./routes/canvas/text-canvas";
import { textCanvasStyleRoute } from "./routes/canvas/text-canvas-style";
import { zoomRoute } from "./routes/canvas/zoom";
import { zoominTransitionRoute } from "./routes/canvas/zoomin-transition";
import { choiceMenusRoute } from "./routes/narration/choice-menus";
import { live2dExpressionRoute } from "./routes/live2d/expression";
import { live2dMotionRoute } from "./routes/live2d/motion";
import { live2dMotionJsRoute } from "./routes/live2d/motion-js";
import { live2dShowRoute } from "./routes/live2d/show";
import { live2dStopMotionsRoute } from "./routes/live2d/stop-motions";
import { minigameSnakeRoute } from "./routes/minigame/snake";
import { spineAnimationRoute } from "./routes/spine/animation";
import { spineAnimationSequenceRoute } from "./routes/spine/animation-sequence";
import { spineClearTracksRoute } from "./routes/spine/clear-tracks";
import { spineIdleRoute } from "./routes/spine/idle";
import { spineMotionRoute } from "./routes/spine/motion";
import { spineSkinRoute } from "./routes/spine/skin";
import { choicesAlreadyMadeRoute } from "./routes/narration/choices-already-made";
import { currentDialogueRoute } from "./routes/narration/current-dialogue";
import { dialogueGlueRoute } from "./routes/narration/dialogue-glue";
import { inputPromptRoute } from "./routes/narration/input-prompt";
import { returningDifferentStepListsRoute } from "./routes/narration/returning-different-step-lists";
import { soundRoute } from "./routes/sound/sound";
import { videoSpriteAddRoute } from "./routes/video/video-sprite-add";
import { videoSpriteLoopingRoute } from "./routes/video/video-sprite-looping";
import { videoSpritePlayPauseRoute } from "./routes/video/video-sprite-play-pause";
import { videoSpriteRestartRoute } from "./routes/video/video-sprite-restart";
import { videoSpriteShowRoute } from "./routes/video/video-sprite-show";
import { rootRoute } from "./routes/__root";

export const queryClient = new QueryClient();

const routeTree = rootRoute.addChildren([
    // narration
    currentDialogueRoute,
    dialogueGlueRoute,
    returningDifferentStepListsRoute,
    choiceMenusRoute,
    inputPromptRoute,
    choicesAlreadyMadeRoute,
    // canvas
    performanceRoute,
    moveRoute,
    rotateRoute,
    fadeRoute,
    zoomRoute,
    mirrorRoute,
    sequenceRoute,
    motionSequenceRoute,
    heredityFactorRoute,
    dissolveTransitionRoute,
    fadeTransitionRoute,
    moveinTransitionRoute,
    pushinTransitionRoute,
    zoominTransitionRoute,
    positionWithPercentageRoute,
    alignRoute,
    imageSpriteShowRoute,
    imageSpriteAddRoute,
    showImageContainerRoute,
    addImageContainerRoute,
    addCanvasComponentsRoute,
    getCanvasComponentsRoute,
    removeCanvasComponentsRoute,
    removeAllCanvasComponentsRoute,
    addListenerGivenEventRoute,
    shakeRoute,
    textCanvasRoute,
    textCanvasStyleRoute,
    // video
    videoSpriteShowRoute,
    videoSpriteAddRoute,
    videoSpritePlayPauseRoute,
    videoSpriteLoopingRoute,
    videoSpriteRestartRoute,
    // sound
    soundRoute,
    // spine
    spineIdleRoute,
    spineSkinRoute,
    spineAnimationRoute,
    spineMotionRoute,
    spineAnimationSequenceRoute,
    spineClearTracksRoute,
    // live2d
    live2dShowRoute,
    live2dMotionRoute,
    live2dExpressionRoute,
    live2dMotionJsRoute,
    live2dStopMotionsRoute,
    // minigame
    minigameSnakeRoute,
]);

export const router = createRouter({
    routeTree,
    context: { queryClient },
});

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}
