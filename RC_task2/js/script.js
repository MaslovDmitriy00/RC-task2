
const pomodoroButtonEl = document.getElementById('pomodoro-button');
const shortBreakButtonEl = document.getElementById('short-break-button');
const longBreakButtonEl = document.getElementById('long-break-button');

const settingsButtonEl = document.getElementById('settings-button');
const playButtonEl = document.getElementById('play-button');
const resetButtonEl = document.getElementById('reset-button');

class App {
	timer = {
		min_tens: document.getElementById('min_tens'),
		min: document.getElementById('min'),
		sec_tens: document.getElementById('sec_tens'),
		sec: document.getElementById('sec'),
	};
	#interval;

	submit(event) {
		event.preventDefault();

		const time = 25*60;
        this.#clearTimer();
		this.#startTimer(time);
	}

	#clearTimer() {
		if (this.#interval) {
			clearInterval(this.#interval);
		}
		this.#setTimer({
			min_tens: 0,
			min: 0,
			sec_tens: 0,
			sec: 0
		})
	}

	#startTimer(time) {
		const end = Date.now() + time * 1000 * 60;
		this.#interval = setInterval(() => {
			const now = Date.now();
			const delta = end - now;
			if (delta < 0) {
				clearInterval(this.#interval);
				return;
			}
			this.#setTimer({
				min_tens: Math.floor(delta / 1000 / 60 / 10),
				min: Math.floor((delta / 1000 / 60) % 10),
				sec_tens: Math.floor((delta % 60000) / 10000),
				sec: Math.floor(((delta % 60000) / 1000) % 10)
			})
		}, 500);
	}

	#setTimer({ min_tens, min, sec_tens, sec }) {
		this.timer.min_tens.innerText = min_tens;
		this.timer.min.innerText = min;
		this.timer.sec_tens.innerText = sec_tens;
		this.timer.sec.innerText = sec;
	}
}

const app = new App();