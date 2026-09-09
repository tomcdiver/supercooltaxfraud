document.addEventListener("DOMContentLoaded", () => {
  const dutyNote = document.querySelector(".duties-note");

  if (dutyNote) {
    const duties = [
      "Duties are subject to change in the near future.",
      "Roles are currently in motion.",
      "Expect reorganizations soon."
    ];

    let index = 0;
    setInterval(() => {
      index = (index + 1) % duties.length;
      dutyNote.textContent = duties[index];
    }, 2600);
  }
});
