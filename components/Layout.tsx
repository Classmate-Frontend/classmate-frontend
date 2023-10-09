// @ts-nocheck
import Navbar from "./Navbar";
import Head from "next/head";

export default function Layout({ children }) {
	return (
		<>
			<Head>
				<link rel="shortcut icon" href="/static/favicon.ico" />
				<title>Classmate</title>
				<link
					rel="apple-touch-icon"
					href="/static/android-chrome-512x512.png"
				/>
				<meta
					name="description"
					content="Easily discover top professors and enhance your academic experience."
					data-rh="true"
				/>
				<meta property="og:image" content="/static/cover.png" />
				<meta name="twitter:image" content="/static/cover.png" />
			</Head>
			<Navbar />
			{children}
		</>
	);
}
