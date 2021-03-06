const styleCanvas = (canvas, imageLocation, color = '#fff') => {
	const ctx = canvas.getContext('2d');

	//Resizing
	let background = new Image();
	background.src = imageLocation;
	canvas.height = background.height;
	canvas.width = background.width;

	background.onload = function () {
		ctx.drawImage(background, 0, 0);
	};
	//variables
	let painting = false;

	function startPosition(e) {
		painting = true;
		draw(e);
	}
	function finishedPosition() {
		painting = false;
		ctx.beginPath();
	}
	function draw(e) {
		if (!painting) return;
		ctx.lineWidth = 2;
		ctx.lineCap = 'round';
		ctx.lineTo(e.layerX, e.layerY);
		ctx.strokeStyle = color;
		ctx.stroke();
		ctx.moveTo(e.layerX, e.layerY);
	}

	canvas.addEventListener('mousedown', startPosition);
	window.addEventListener('mouseup', finishedPosition);
	canvas.addEventListener('mousemove', draw);
};

window.addEventListener('load', () => {
	const lab = document.querySelector('#lab');
	const crowd = document.querySelector('#crowd');
	const train = document.querySelector('#train');
	const impostor = document.querySelector('#impostor');
	const dinner = document.querySelector('#dinner');
	const find = document.querySelector('#find');
	const poster = document.querySelector('#poster');
	const code = document.querySelector('#code');
	const suitcase = document.querySelector('#suitcase');
	const safe = document.querySelector('#safe');
	const whiteboard = document.querySelector('#whiteboard');
	const bedroom = document.querySelector('#bedroom');
	const puzzle = document.querySelector('#puzzle');
	const trains = document.querySelector('#trains');
	const found = document.querySelector('#found');

	styleCanvas(lab, './images/image--003.webp', '#000');
	styleCanvas(crowd, './images/image--004.webp', '#000');
	styleCanvas(train, './images/image--005.webp', '#000');
	styleCanvas(impostor, './images/image--006.webp');
	styleCanvas(dinner, './images/image--008.webp');
	styleCanvas(find, './images/image--009.webp');
	styleCanvas(poster, './images/image--010.webp');
	styleCanvas(code, './images/image--011.webp', '#000');
	styleCanvas(suitcase, './images/image--012.webp', '#000');
	styleCanvas(safe, './images/image--013.webp', '#000');
	styleCanvas(whiteboard, './images/image--014.webp', '#000');
	styleCanvas(bedroom, './images/image--015.webp', '#000');
	styleCanvas(puzzle, './images/image--016.webp', '#000');
	styleCanvas(trains, './images/image--017.webp', '#000');
	styleCanvas(found, './images/image--018.webp', '#000');
});
const draggables = document.querySelectorAll('.answer');
const containers = document.querySelectorAll('.drag');

draggables.forEach(draggable => {
	draggable.addEventListener('dragstart', () => {
		draggable.classList.add('dragging');
	});
	draggable.addEventListener('dragend', () => {
		draggable.classList.remove('dragging');
	});
});
containers.forEach(container => {
	container.addEventListener('dragover', e => {
		if (container.classList.contains('drag-into-div')) {
			if (container.childElementCount >= 6) {
				return;
			}
		}
		container.classList.add('drag-outline');
		const draggable = document.querySelector('.dragging');
		container.appendChild(draggable);
	});
	container.addEventListener('dragleave', () => {
		container.classList.remove('drag-outline');
	});
});
const downloadBtn = document.querySelector('.download-button');
downloadBtn.href = 'https://drive.google.com/u/0/uc?id=13nUhxM8xrkanlva9xfTpbisOD-pfvJzw&export=download';
downloadBtn.download = 'answers';
