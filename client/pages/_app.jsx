import { buildClient } from '../api/build-client';
import '../styles/globals.css';
import niceTry from 'nice-try';

function MyApp({ Component, pageProps, currentUser }) {
	return <Component {...pageProps} />;
}

MyApp.getInitialProps = async (appContext) => {
	const client = buildClient(appContext.ctx);

	const { data } = await client.get('/api/auth/me');

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
