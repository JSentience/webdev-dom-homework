export const getFormattedDate = dateString => {
	const date = new Date(dateString);
	return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1)
		.toString()
		.padStart(2, '0')}.${date.getFullYear().toString().slice(-2)} ${date
		.getHours()
		.toString()
		.padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

export const secureHtml = text => {
	const div = document.createElement('div');
	div.textContent = text;
	return div.innerHTML;
};
