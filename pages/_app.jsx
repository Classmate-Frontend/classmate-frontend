// @ts-nocheck
import { useEffect } from "react";
import CookieHandler from "../components/CookieHandler";
import Layout from "../components/Layout";
import { Provider } from "react-redux";
import "../styles/globals.scss";
import { wrapper } from "../redux/store";
import axios from "axios";
import { PersistGate } from "redux-persist/integration/react";
import Script from "next/script";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";

axios.defaults.baseURL =
	process.env.NODE_ENV == "production"
		? "https://cyan-dibbler-wig.cyclic.app"
		: "http://localhost:5000";

export default function MyApp({ Component, pageProps }) {
	const { store } = wrapper.useWrappedStore(pageProps);

	const router = useRouter();
	useEffect(() => {
		const handleRouteChange = (url) => {
			gtag.pageview(url);
		};
		router.events.on("routeChangeComplete", handleRouteChange);
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [router.events]);

	return (
		<>
			{/* Global Site Tag (gtag.js) - Google Analytics */}
			<Script
				strategy="afterInteractive"
				src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
			/>
			<Script
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
				}}
			/>
			<Provider store={store}>
				<PersistGate persistor={store.__PERSISTOR} loading={null}>
					<CookieHandler />
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</PersistGate>
			</Provider>
		</>
	);
}
