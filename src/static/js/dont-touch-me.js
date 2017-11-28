window.onload = () => {
	const elems = [
		document.getElementById('nav-wrapper'),
		document.getElementById('nav-img'),
		document.getElementById('nav-title')
	];
	elems[0].addEventListener('mouseover', () => {
		elems[1].className = 'bounce';
		elems[2].className = 'wobble';
	});
	elems[0].addEventListener('mouseleave', () => {
		elems[1].className = '';
		elems[2].className = '';
	});
};
