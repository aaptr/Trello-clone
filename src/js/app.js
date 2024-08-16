import { Modal } from 'bootstrap'

// const instanceModal = new Modal('#exampleModal')
// instanceModal.show()

// clock script
window.onload = function () {
  setInterval(function () {
    // Seconds
    const seconds = new Date().getSeconds();
    document.getElementById("seconds").innerHTML = (seconds < 10 ? '0' : '') + seconds;

    // Minutes
    const minutes = new Date().getMinutes();
    document.getElementById("minutes").innerHTML = (minutes < 10 ? '0' : '') + minutes;

    // Hours
    const hours = new Date().getHours();
    document.getElementById("hours").innerHTML = (hours < 10 ? '0' : '') + hours;
  }, 1000);
}