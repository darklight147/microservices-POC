import Link from 'next/link';

export default function Navbar() {
	return (
		<nav className="navbar">
			<div className="navbar-brand">
				<Link href="/">
					<a className="navbar-item">
						<img
							src={
								'https://images.pexels.com/photos/1337380/pexels-photo-1337380.jpeg?auto=compress&cs=tinysrgb&w=100&h=260&dpr=1'
							}
							alt="logo"
						/>
					</a>
				</Link>
				<div className="navbar-burger burger" data-target="navMenu">
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
			<div id="navMenu" className="navbar-menu">
				<div className="navbar-end">
					<div className="navbar-item">
						<div className="field is-grouped">
							<p className="control">
								<Link href="/auth/signin">
									<a className="button is-primary">
										<span>Login</span>
									</a>
								</Link>
							</p>
							<p className="control">
								<Link href="/">
									<a className="button is-primary">
										<span>Register</span>
									</a>
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
