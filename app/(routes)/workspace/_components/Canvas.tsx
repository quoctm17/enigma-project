import React from 'react'
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";

function Canvas() {
    return (
        <div style={{ height: "700px" }}>
            <Excalidraw
                theme='light'
                onChange={((excalidrawElements, appState, files) => console.log(excalidrawElements))}
                UIOptions={{
                    canvasActions: {
                        saveToActiveFile: false,
                        loadScene: false,
                        export: false,
                        toggleTheme: false
                    }
                }}
            >
                <MainMenu>
                    <MainMenu.DefaultItems.ClearCanvas />
                    <MainMenu.DefaultItems.SaveAsImage />
                    <MainMenu.DefaultItems.ChangeCanvasBackground />
                </MainMenu>
                <WelcomeScreen>
                    <WelcomeScreen.Hints.MenuHint />
                    <WelcomeScreen.Hints.ToolbarHint />
                    <WelcomeScreen.Center>
                        <WelcomeScreen.Center.Heading>
                            Welcome to Enigma Canvas!
                        </WelcomeScreen.Center.Heading>
                    </WelcomeScreen.Center>
                </WelcomeScreen>

            </Excalidraw>
        </div>
    )
}

export default Canvas
