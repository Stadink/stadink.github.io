const repo = require('./repository')
module.exports = async ({ id }) => {
	const record = await repo.findById(id)
	return `
	<div>
	<form method='POST'>
		<div>
		<div>
			<label id='email'>Username</label>
		</div>
		<input type='text' name='email'
			value=${record.email} for='email'>
		</div>
		<div>
		<div>
			<label id='password'>Password</label>
		</div>
		<input type='password' name='password'
			value=${record.password}
		for='password'>
		</div>
		<div>
		<div>
			<label id='name'>Name</label>
		</div>
		<input type='text' name='name'
			value=${record.name} for='name'>
		</div>
		<button>Update</button>
		</div>
	</form>
</div>
`
}
