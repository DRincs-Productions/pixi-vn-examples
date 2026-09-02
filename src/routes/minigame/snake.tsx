import BackButton from "@/components/narration/BackButton";
import useMinigame from "@/lib/hooks/minigame-hooks";
import { canvas, Game, type Layer, newLabel } from "@drincs/pixi-vn";
import { Graphics, Ticker } from "@drincs/pixi-vn/pixi.js";
import { useHotkeys } from "@tanstack/react-hotkeys";
import { createRoute } from "@tanstack/react-router";
import { useCallback, useMemo, useRef, useState } from "react";
import { rootRoute } from "../__root";

const GRID_SIZE = 20;
const MOVE_INTERVAL = 150;

export const startLabel = newLabel("minigame/snake", [() => {}]);

export const minigameSnakeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/minigame/snake",
    loader: async () => {
        await Game.start(startLabel, {});
    },
    component: () => (
        <>
            <SnakeGame />
            <div className="absolute top-3 left-3 z-10">
                <BackButton />
            </div>
        </>
    ),
});

function SnakeGame() {
    const [displayScore, setDisplayScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const directionRef = useRef({ x: 1, y: 0 });
    const setDirection = (x: number, y: number) => {
        if (
            (x !== 0 && directionRef.current.x === 0) ||
            (y !== 0 && directionRef.current.y === 0)
        ) {
            directionRef.current = { x, y };
        }
    };

    useHotkeys([
        { hotkey: "ArrowUp", callback: () => setDirection(0, -1), options: { enabled: !gameOver } },
        {
            hotkey: "ArrowDown",
            callback: () => setDirection(0, 1),
            options: { enabled: !gameOver },
        },
        {
            hotkey: "ArrowLeft",
            callback: () => setDirection(-1, 0),
            options: { enabled: !gameOver },
        },
        {
            hotkey: "ArrowRight",
            callback: () => setDirection(1, 0),
            options: { enabled: !gameOver },
        },
    ]);

    // Populated by `game(layer)` once the minigame layer is created
    const layerRef = useRef<Layer>(null!);
    const snakeRef = useRef<Graphics[]>([]);
    const appleRef = useRef<Graphics>(null!);

    const placeApple = useCallback(() => {
        const apple = appleRef.current;
        const cols = Math.floor(canvas.width / GRID_SIZE);
        const rows = Math.floor(canvas.height / GRID_SIZE);
        apple.x = Math.floor(Math.random() * cols) * GRID_SIZE;
        apple.y = Math.floor(Math.random() * rows) * GRID_SIZE;

        // Avoid placing the apple on top of the snake
        for (const segment of snakeRef.current) {
            if (segment.x === apple.x && segment.y === apple.y) {
                placeApple();
                return;
            }
        }
    }, []);

    const ticker = useMemo(() => {
        const ticker = new Ticker();
        let elapsed = 0;

        const endGame = () => {
            ticker.stop();
            setGameOver(true);
        };

        ticker.add(({ deltaMS }) => {
            const snake = snakeRef.current;
            const apple = appleRef.current;
            const head = snake[0];

            elapsed += deltaMS;
            if (elapsed < MOVE_INTERVAL) return;
            elapsed = 0;

            // Move the body
            for (let i = snake.length - 1; i > 0; i--) {
                snake[i].position.set(snake[i - 1].x, snake[i - 1].y);
            }

            // Move the head
            head.x += directionRef.current.x * GRID_SIZE;
            head.y += directionRef.current.y * GRID_SIZE;

            // Collision with the wall
            if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height) {
                endGame();
                return;
            }

            // Collision with the body
            for (let i = 1; i < snake.length; i++) {
                if (head.x === snake[i].x && head.y === snake[i].y) {
                    endGame();
                    return;
                }
            }

            // Eat the apple
            if (head.x === apple.x && head.y === apple.y) {
                const newSegment = new Graphics();
                newSegment.rect(0, 0, GRID_SIZE, GRID_SIZE).fill({ color: 0x00ff00 });
                newSegment.position.set(head.x, head.y);
                layerRef.current.addChild(newSegment);
                snake.push(newSegment);

                setDisplayScore((prev) => prev + 1);
                placeApple();
            }
        });

        return ticker;
    }, [placeApple]);

    const game = useCallback(
        (layer: Layer) => {
            layerRef.current = layer;

            const head = new Graphics();
            head.rect(0, 0, GRID_SIZE, GRID_SIZE).fill({ color: 0x00ff00 });
            head.x = 200;
            head.y = 200;
            layer.addChild(head);
            snakeRef.current = [head];

            const apple = new Graphics();
            apple.rect(0, 0, GRID_SIZE, GRID_SIZE).fill({ color: 0xff0000 });
            layer.addChild(apple);
            appleRef.current = apple;
            placeApple();

            ticker.start();
        },
        [ticker, placeApple],
    );

    const options = useMemo(
        () => ({
            // Only stop the ticker here, don't destroy() it: React StrictMode
            // double-invokes this mount/cleanup pair against the same `ticker`
            // instance, and a destroyed Ticker can't be started again.
            onExit() {
                ticker.stop();
            },
        }),
        [ticker],
    );

    useMinigame(game, options);

    return (
        <>
            <div
                style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    color: "white",
                    fontSize: "24px",
                    background: "rgba(0,0,0,0.5)",
                    padding: "5px 10px",
                    borderRadius: "5px",
                }}
            >
                Score: {displayScore}
            </div>

            {gameOver && (
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "red",
                        fontSize: "48px",
                        background: "rgba(0,0,0,0.7)",
                        padding: "20px 40px",
                        borderRadius: "10px",
                    }}
                >
                    GAME OVER
                </div>
            )}

            {/* Direction buttons, for touch/mouse input */}
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    textAlign: "center",
                    pointerEvents: "auto",
                }}
            >
                <div style={{ marginTop: "10px" }}>
                    <button
                        type="button"
                        style={{ fontSize: "30px" }}
                        onClick={() => setDirection(0, -1)}
                    >
                        ⬆️
                    </button>
                </div>
                <div>
                    <button
                        type="button"
                        style={{ fontSize: "30px", marginRight: "50px" }}
                        onClick={() => setDirection(-1, 0)}
                    >
                        ⬅️
                    </button>
                    <button
                        type="button"
                        style={{ fontSize: "30px" }}
                        onClick={() => setDirection(1, 0)}
                    >
                        ➡️
                    </button>
                </div>
                <div>
                    <button
                        type="button"
                        style={{ fontSize: "30px" }}
                        onClick={() => setDirection(0, 1)}
                    >
                        ⬇️
                    </button>
                </div>
            </div>
        </>
    );
}
