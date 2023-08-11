import React, { useEffect, useState } from "react";
import Video from "./Video";
import VideoList from "./VideoList";
import useStore from "../lib/store";
import Login from "./Login";

export default function Main() {
	const { path, newPath } = useStore();
	const allowedExtensions = [".mp4", ".avi", ".mov"];
	const pass = "7884";
	const [password, setPassword] = useState("");
	useEffect(() => {
		newPath();
	}, [newPath]);

	useEffect(() => {
		const passwd = localStorage.getItem("password");
		setPassword(passwd);
	}, []);
	if (password !== pass) {
		return <Login />;
	}
	if (allowedExtensions.some((ext) => path.endsWith(ext))) {
		return <Video />;
	} else {
		return <VideoList />;
	}
}
