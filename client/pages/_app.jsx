import { buildClient } from '../api/build-client';
import '../styles/globals.css';
import Navbar from '../components/navbar';
import Head from 'next/head';

function MyApp({ Component, pageProps, currentUser }) {
	return (
		<div>
			<Head>
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"
				/>
			</Head>
			<Navbar />
			<Component {...pageProps} />
		</div>
	);
}

MyApp.getInitialProps = async (appContext) => {
	const client = buildClient(appContext.ctx);

	const response = await client.get('/api/auth/me');

	// Forward Cookies from response to client
	const cookies = response.headers['set-cookie'];
	if (cookies) {
		cookies.forEach((cookie) => {
			appContext.ctx.res.setHeader('Set-Cookie', cookie);
		});
	}

	let pageProps = {};

	if (appContext.Component.getInitialProps) {
		pageProps = await appContext.Component.getInitialProps(
			appContext.ctx,
			client,
			response.data.currentUser
		);
	}

	return {
		pageProps,
		...response.data,
	};
};

export default MyApp;
