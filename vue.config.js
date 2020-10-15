module.exports = {
	pluginOptions: {
		electronBuilder: {
			preload: "src/preload.js",
			builderOptions: {
				protocols: {
					name: "questions_answers-protocol",
					schemes: ["questions-answers"]
				}
			}
		}
	}
};
