import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { AudioProvider } from "./providers/AudioProvider.tsx";
import { Toaster } from "react-hot-toast";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <Provider store={store}>
            <AudioProvider>
                <App />
                <Toaster 
                    position="bottom-right"
                    toastOptions={{
                        style: {
                            backgroundImage: "linear-gradient(to right, #ee862b, #d95326)",
                            color: "#fbfaf8",
                        },
                        iconTheme: {
                            primary: "white",
                            secondary: "#FE621D",
                        }
                    }}
                />
            </AudioProvider>
        </Provider>
    </BrowserRouter>
);
