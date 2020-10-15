/**
 * Supprime le dernier caractère d'une chaîne de caractères
 * @param {string} str
 * @return {string} Nouvelle chaîne sans le dernier caractère
 */
function removeLastChar(str) {
	return str.substring(0, str.length - 1);
}

/**
 * Generate a Nonce
 * @param {number} length - Length of nonce
 * @return {string}
 */
function nonce(length) {
	let text = "";
	const possible =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

function urlAddParams(url, params) {
	params.forEach(param => {
		url = url.concat(`${param.key}=${param.value}`);
	});

	return url;
}

/**
 * Formate une Date
 * @param {string} str La date
 * @return {string} Date formaté
 */
function formatDate(str) {
	const date = new Date(str);

	let month = (date.getUTCMonth() + 1).toLocaleString();
	month = month.length === 1 ? "0" + month : month;

	let day = date.getUTCDate().toLocaleString();
	day = day.length === 1 ? "0" + day : day;

	let hour = date.getHours().toString();
	hour = hour.length === 1 ? "0" + hour : hour;

	let minute = date.getMinutes().toString();
	minute = minute.length === 1 ? "0" + minute : minute;

	return `${date.getFullYear()}/${month}/${day} - ${hour}:${minute}`;
}

/**
 * Parse Auth Url
 * @param {string} hash
 * @return {boolean|(string|null)}
 */
function parseFragment(hash) {
	const hashMatch = function(expr) {
		const match = hash.match(expr);
		return match ? match[1] : null;
	};
	const state = hashMatch(/state=(\w+)/);
	if (sessionStorage.twitchOAuthState == state)
		return hashMatch(/access_token=(\w+)/);
	return false;
}

export { removeLastChar, formatDate, urlAddParams, nonce, parseFragment };
