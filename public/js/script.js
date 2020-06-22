const menu = document.querySelector('#menu-trigger');
const menuDOM = document.querySelector('.menu');
const menuOverlay = document.querySelector('.menu-overlay');
const closeMenu = document.querySelector('#close');
menu.addEventListener('click', () => {
	showMenu();
});
closeMenu.addEventListener('click', () => {
	hideMenu();
});

function showMenu() {
	menuOverlay.classList.add('transparentBcg');
	menuDOM.classList.add('showMenu');
}
function hideMenu() {
	menuOverlay.classList.remove('transparentBcg');
	menuDOM.classList.remove('showMenu');
}
