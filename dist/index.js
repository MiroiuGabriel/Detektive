const styleCanvas = (canvas, imageLocation, color = '#fff') => {
	const ctx = canvas.getContext('2d');

	const background = new Image();

	background.onload = function () {
		//Resizing
		canvas.height = background.height;
		canvas.width = background.width;
		ctx.drawImage(background, 0, 0);
	};

	background.src = imageLocation;

	//variables
	let painting = false;

	function onDrawingStarted(e) {
		painting = true;
		const { x, y } = getCanvasCoordinates(e);
		ctx.beginPath();
		draw(x, y);
	}

	function onDrawingFinished() {
		painting = false;
	}

	function onDrawing(e) {
		if (!painting) return;

		const { x, y } = getCanvasCoordinates(e);
		draw(x, y);
	}

	function getCanvasCoordinates(e) {
		const bbox = e.target.getBoundingClientRect();
		const x = e.clientX - bbox.left;
		const y = e.clientY - bbox.top;

		return { x, y };
	}

	function draw(x, y) {
		ctx.lineWidth = 2;
		ctx.lineCap = 'round';
		ctx.lineTo(x, y);
		ctx.strokeStyle = color;
		ctx.stroke();
		ctx.moveTo(x, y);
	}

	// replacement for mousedown and touchstart
	canvas.addEventListener('pointerdown', onDrawingStarted);
	// replacement for mouseup and touchend
	window.addEventListener('pointerup', onDrawingFinished);
	canvas.addEventListener('mousemove', onDrawing);

	canvas.addEventListener('touchmove', e => {
		e.preventDefault();
		onDrawing(e.touches[0]);
	});
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

const MAX_ANSWERS_PER_CONTAINER = 8;

draggables.forEach(draggable => {
	draggable.addEventListener('dragstart', () => {
		draggable.classList.add('dragging');
	});
	draggable.addEventListener('dragend', () => {
		draggable.classList.remove('dragging');
	});
	draggable.addEventListener('pointerup', () => {
		draggable.classList.remove('dragging');

		const targetContainer = containers[0].contains(draggable) ? containers[1] : containers[0];
		if (targetContainer.childElementCount < MAX_ANSWERS_PER_CONTAINER) {
			targetContainer.appendChild(draggable);
		}
	});
});

containers.forEach(container => {
	container.addEventListener('dragover', e => {
		container.classList.add('drag-outline');
		const draggable = document.querySelector('.dragging');

		if (container.childElementCount < MAX_ANSWERS_PER_CONTAINER) {
			container.appendChild(draggable);
		}
	});
	container.addEventListener('dragleave', () => {
		container.classList.remove('drag-outline');
	});
});
