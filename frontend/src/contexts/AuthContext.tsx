import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api";

interface User {
	email: string;
	role: string;
}

interface AuthContextType {
	user: User | null;
	token: string | null;
	login: (email: string, password: string) => Promise<void>;
	register: (email: string, password: string) => Promise<void>;
	logout: () => void;
	isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (token) {
			try {
				const payload = JSON.parse(atob(token.split(".")[1]));
				setUser({ email: payload.sub, role: payload.role });
			} catch (e) {
				console.error("Invalid token", e);
				localStorage.removeItem("token");
				setToken(null);
			}
		}
		setIsLoading(false);
	}, [token]);

	const login = async (email: string, password: string) => {
		const response = await api.post("auth/login", { json: { email, password } }).json<any>();
		localStorage.setItem("token", response.token);
		setToken(response.token);
		setUser({ email: response.email, role: response.role });
	};

	const register = async (email: string, password: string) => {
		const response = await api.post("auth/register", { json: { email, password } }).json<any>();
		localStorage.setItem("token", response.token);
		setToken(response.token);
		setUser({ email: response.email, role: response.role });
	};

	const logout = () => {
		localStorage.removeItem("token");
		setToken(null);
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
