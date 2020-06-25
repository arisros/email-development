function sendEmail(project) {
	if (!project) {
		console.log('no projects choosed')
		return;
	}

	return gulp.src(`./${DIR_PATH.release}/${project}/template.html`)
		.pipe(mail(to));

}

gulp.task('mail', async () => {
	env({ file: '.env.json' });
	const readDir = promisify(fs.readdir);
	const files = await readDir('./src');
	return gulp.src(`./${DIR_PATH.release}/**/template.html`)
		.pipe(prompt.prompt({
			type: 'checkbox',
			name: 'projects',
			message: 'Which Project you will send email template?',
			choices: files
		}, (res) => {
			const projects = res['projects'];
			if (!projects.length) {
				console.log('You must choose project')
				return;
			}
			sendEmail(projects[0])
			// for (let index = 0; index < projects.length; index++) {
			// 	sendEmail(projects[index])
			// }
		}));
});


