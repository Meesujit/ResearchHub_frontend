import { createContext, useContext, useState } from "react";

// ✅ Define the structure of the context with a generic type
interface GlobalContextProps<T extends Record<string, unknown>> {
    value: T;
    setValue: (key: string, value: unknown) => void;
    setData: (data: T) => void;
}

// ✅ Create a generic Context
const GlobalContext = createContext<GlobalContextProps<any> |null>(null);

// ✅ Custom Hook: Initializes state with `defaultValue` or overrides it with `data`
export function useValue<T>(defaultValue: T, data?: T) {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useValue must be used within a GlobalContextProvider");
    }

    const { value, setValue, setData } = context as GlobalContextProps<any>;

    // ✅ Initialize the state only once when the component mounts
    if (Object.keys(value).length === 0) {
        setData(data || defaultValue);
    }

    return { value, setValue, setData };
}

// ✅ Context Provider
export function GlobalContextProvider<T>({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<T>({} as T); // ✅ Ensure state matches type `T`

    // ✅ Function to update a specific field dynamically
    const setValue = (key: string, value: unknown) => {
        setState((prev) => ({ ...prev, [key]: value }));
    };

    // ✅ Function to update the entire state
    const setData = (data: T) => {
        setState(() => data);
    };

    return (
        <GlobalContext.Provider value={{ value: state, setValue, setData }}>
            {children}
        </GlobalContext.Provider>
    );
}
