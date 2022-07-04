import { buildClient } from '../api/build-client';
import '../styles/globals.css';
import niceTry from 'nice-try';

function MyApp({ Component, pageProps, currentUser }) {
	return <Component {...pageProps} />;
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
			data.currentUser
		);
	}

	return {
		pageProps,
		...data,
	};
};

export default MyApp;
