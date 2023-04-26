export default class Timer {
  constructor(root) {
    root.innerHTML = Timer.getHTML();

    this.el = {
      minutes: document.querySelector(".timer__part--minutes"),
      seconds: document.querySelector(".timer__part--seconds"),
      control: document.querySelector(".timer__part--control"),
      reset: document.querySelector(".timer__part--reset"),
    };

    this.interval = null;
    this.remainingSeconds = 10;

    this.el.control.addEventListener("click", () => {
      if (this.interval === null) {
        this.start();
      } else {
        this.stop();
      }
    });

    this.el.reset.addEventListener("click", () => {
      const inputMinutes = prompt("sure you have minutes");
      if(inputMinutes < 60){
          this.stop();
          this.remainingSeconds = inputMinutes * 60;
          this.updateInterFaceTime();
        }
    });
  }

  updateInterFaceTime() {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;

    this.el.minutes.textContent = minutes.toString().padStart(2, "0");
    this.el.seconds.textContent = seconds.toString().padStart(2, "0");
  }

  updateInterFaceControl() {
    if (this.interval === null) {
        this.el.control.innerHTML = `<i class="fas fa-play timer__part--start"><i>`
        this.el.control.classList.add("timer__part--start");
        this.el.control.classList.remove("timer__part--stop");
    } else {
        this.el.control.innerHTML = `<i class="fas fa-pause timer__part--start"></i>`
        this.el.control.classList.add("timer__part--stop")
        this.el.control.classList.remove("timer__part--start")
    }
  }

  start() {
    if (this.remainingSeconds === null) return;

    this.interval = setInterval(() => {
      
        this.remainingSeconds--;
      this.updateInterFaceTime();

      if (this.remainingSeconds === 0) {
        this.stop();
      }
    }, 1000);

    this.updateInterFaceControl();
  }

  stop() {
    clearInterval(this.interval);

    this.interval = null;

    this.updateInterFaceControl();
  }

  static getHTML() {
    return `
        <span class="timer__part timer__part--minutes">00</span>
        <span class="timer__part">:</span>
        <span class="timer__part timer__part--seconds">00</span>
        <div class="timer__container">
        <button class="timer__part timer__part--control">
          <i class="fas fa-play timer__part--control timer__part--start"></i>
          </button>
        <button class="timer__part timer__part--reset">
          <i class="fas fa-stopwatch"></i>
          </button>
          </div>
           `;
  }
}   
new Timer(document.querySelector(".timer"));
