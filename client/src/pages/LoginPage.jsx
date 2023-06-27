import { Link } from "react-router-dom";

function LoginPage() {
	return (
		<div className="mt-4 grow flex items-center justify-around font-semibold">
			<div className="mb-64">
				<h1 className="text-4xl text-center mb-4">Login</h1>
				<form action="" className="max-w-md mx-auto">
					<input type="email" placeholder="mike@email.com" />
					<input type="password" placeholder="password" />
					<button className="primary">Login</button>
					<div className="text-center py-2 text-gray-500">
						<div>
							Don&apos;t have an account yet?{" "}
							<Link className="hover:underline text-black" to="/signup">
								Sign up
							</Link>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default LoginPage;
