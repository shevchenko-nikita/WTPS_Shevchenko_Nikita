var modal = document.getElementById("myModal");
var modalTeacher = document.getElementById("modalTeacher");

var span = document.getElementsByClassName("close");

document.querySelectorAll(".modal-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    modal.style.display = "block";
  });
});

document.querySelectorAll(".modal-teacher-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    modalTeacher.style.display = "block";
  });
});

span[0].onclick = function () {
  modal.style.display = "none";
  modalTeacher.style.display = "none";
};

span[1].onclick = function () {
  modal.style.display = "none";
  modalTeacher.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    modalTeacher.style.display = "none";
  }
};
