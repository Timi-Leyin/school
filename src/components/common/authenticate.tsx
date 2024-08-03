import axios from "axios";

const Authenticate = () => {
	const startAuthentication = async () => {
		const options = await axios.post("/api/auth/start").then((res) => res.data);
		const credential = await navigator.credentials.get({ publicKey: options });

		const verification = await axios.post("/auth/verify", { credential });
		if (verification.data.verified) {
			alert("Authentication successful!");
		} else {
			alert("Authentication failed.");
		}
	};
	return <button onClick={startAuthentication}>Authenticate</button>;
};
