import { Route, Routes } from "react-router-dom";
import "./App.css";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import SignupPage from "./pages/SignupPage";
import axios from "axios";
import { UserContext, UserContextProvider } from "./UserContext";
import AccountPage from "./pages/AccountPage";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;
function App() {
	return (
		<UserContextProvider>
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<IndexPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignupPage />} />
				<Route path="/account/:subpage?" element={<AccountPage />} />
				<Route path="/account/:subpage/:action" element={<AccountPage />} />
			</Route>
		</Routes>
		</UserContextProvider>
	);
}

export default App;
