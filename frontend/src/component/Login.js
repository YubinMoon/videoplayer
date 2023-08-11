import { useEffect, useState } from "react";
import "./Login.css";

function Button({ add, number }) {
	return (
		<div className="btn_box">
			<button
				className="btn_number"
				onClick={() => {
					add(number);
					console.log(number);
				}}>
				{number}
			</button>
		</div>
	);
}

export default function Login() {
	const [password, setPassword] = useState("");

	function addNumber(n) {
		setPassword(password + n);
	}

	useEffect(() => {
		if (password.length == 4) {
			console.log("asdf");
			localStorage.setItem("password", password);
			window.location.reload();
		}
	}, [password]);

	return (
		<div className="login_main">
			<div className="login_box">
				<span className="login_passwd">{password.padEnd(4, "*")}</span>
				<ul className="btn_container">
					<li>
						<Button add={addNumber} number="1" />
						<Button add={addNumber} number="2" />
						<Button add={addNumber} number="3" />
					</li>
					<li>
						<Button add={addNumber} number="4" />
						<Button add={addNumber} number="5" />
						<Button add={addNumber} number="6" />
					</li>
					<li>
						<Button add={addNumber} number="7" />
						<Button add={addNumber} number="8" />
						<Button add={addNumber} number="9" />
					</li>
					<li>
						<Button add={addNumber} number="" />
						<Button add={addNumber} number="0" />
						<Button add={addNumber} number="" />
					</li>
				</ul>
			</div>
		</div>
	);
}
