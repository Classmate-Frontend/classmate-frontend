import { Html, Head, Main, NextScript } from "next/document";
import { useEffect } from "react";

const GTM_ID = "GTM-5BBS944F";
const HOTJAR_ID = 3689018;

const Document = () => {
	useEffect(() => {
		// Google Tag Manager script
		(function (w, d, s, l, i) {
			w[l] = w[l] || [];
			w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
			var f = d.getElementsByTagName(s)[0],
				j = d.createElement(s),
				dl = l != "dataLayer" ? "&l=" + l : "";
			j.async = true;
			j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
			f.parentNode.insertBefore(j, f);
		})(window, document, "script", "dataLayer", GTM_ID);

		// Hotjar script
		(function (h, o, t, j, a, r) {
			h.hj =
				h.hj ||
				function () {
					(h.hj.q = h.hj.q || []).push(arguments);
				};
			h._hjSettings = { hjid: HOTJAR_ID, hjsv: 6 };
			a = o.getElementsByTagName("head")[0];
			r = o.createElement("script");
			r.async = 1;
			r.src =
				t +
				"static.hotjar.com/c/hotjar-" +
				h._hjSettings.hjid +
				".js?sv=" +
				h._hjSettings.hjsv;
			a.appendChild(r);
		})(window, document, "https://", ".js?sv=");
	}, []);

	return (
		<Html lang="en">
			<Head>{/* Place other head elements here */}</Head>
			<body>
				<noscript>
					<iframe
						src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
						height="0"
						width="0"
						style={{ display: "none", visibility: "hidden" }}
					/>
				</noscript>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default Document;
