import { useRequest } from '../../hooks/use-request';

function SignUpVisitor() {
	const {} = useRequest();

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div>
			<form onSubmit={handleSubmit}></form>
		</div>
	);
}

export default SignUpVisitor;
