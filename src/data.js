export function initializeData() {
  if (!localStorage.getItem("students")) {
    const students = Array.from(
      { length: 30 },
      (_, i) => ({
        id: `STU${String(i + 1).padStart(3, "0")}`,
        name: `Student ${i + 1}`,
        department: ["CSE", "ECE", "IT", "EEE"][i % 4],
        year: (i % 4) + 1,
        email: `student${i + 1}@college.edu`,
        attendance: 80 + (i % 20)
      })
    );

    localStorage.setItem(
      "students",
      JSON.stringify(students)
    );
  }

  if (!localStorage.getItem("marks")) {
    localStorage.setItem("marks", JSON.stringify([
      {
        id: 1,
        studentId: "STU001",
        subject: "Mathematics",
        marks: 85,
        maxMarks: 100,
        remark: "Excellent"
      },
      {
        id: 2,
        studentId: "STU001",
        subject: "Programming",
        marks: 90,
        maxMarks: 100,
        remark: "Very Good"
      }
    ]));
  }

  if (!localStorage.getItem("attendance")) {
    localStorage.setItem("attendance", JSON.stringify([]));
  }
}

export const getData = key =>
  JSON.parse(localStorage.getItem(key) || "[]");

export const saveData = (key, data) =>
  localStorage.setItem(key, JSON.stringify(data));