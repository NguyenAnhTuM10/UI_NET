// Mảng chứa danh sách câu hỏi và câu trả lời
const questions = [
    {
        question:
            "Phần của đường bộ được sử dụng cho các phương tiện giao thông qua lại là gì?",
        answers: [
            "1- Phần mặt đường và lề đường.",
            "2- Phần đường xe chạy.",
            "3- Phần đường xe cơ giới.",
        ],
    },
    {
        question:
            "Tốc độ tối đa cho phép đối với xe ô tô trên đường cao tốc là bao nhiêu?",
        answers: ["1- 80 km/h.", "2- 90 km/h.", "3- 120 km/h."],
    },
    {
        question: "Người điều khiển xe cần làm gì khi có tín hiệu đèn đỏ?",
        answers: [
            "1- Tăng tốc vượt qua trước khi đèn đỏ sáng.",
            "2- Dừng xe trước vạch dừng.",
            "3- Dừng xe, kiểm tra an toàn rồi đi tiếp.",
        ],
    },
    // Thêm các câu hỏi khác vào đây (tương tự)
];

// Tạo thêm các câu hỏi còn lại để đủ 25 câu
for (let i = 4; i <= 25; i++) {
    questions.push({
        question: `Câu hỏi ${i}: Đây là câu hỏi mẫu ${i}`,
        answers: [
            `1- Đáp án 1 cho câu ${i}.`,
            `2- Đáp án 2 cho câu ${i}.`,
            `3- Đáp án 3 cho câu ${i}.`,
        ],
    });
}

// Khởi tạo câu hỏi ban đầu
window.onload = function () {
    renderQuestionList();
    updateQuestion();
};

// Hiển thị danh sách câu hỏi trong sidebar
function renderQuestionList() {
    const questionList = document.getElementById("question-list");
    questionList.innerHTML = ""; // Xóa nội dung cũ của question-list

    questions.forEach((_, index) => {
        const button = document.createElement("button");
        button.textContent = index + 1;
        button.classList.add("question-button"); // Thêm class 'question-button'
        button.onclick = function () {
            selectQuestion(index + 1); // Khi nhấn vào nút câu hỏi, chọn câu hỏi đó
        };
        questionList.appendChild(button); // Thêm nút câu hỏi vào trong danh sách
    });
}

// Cập nhật nội dung câu hỏi và câu trả lời
function updateQuestion() {
    const question = questions[currentQuestion - 1];
    document.getElementById(
        "question-title"
    ).textContent = `Câu hỏi ${currentQuestion}:`;
    document.getElementById("question-text").textContent = question.question;

    const answersContainer = document.getElementById("answers");
    answersContainer.innerHTML = "";
    question.answers.forEach((answer, index) => {
        const label = document.createElement("label");
        label.innerHTML = `<input type="radio" name="answer" value="${
            index + 1
        }"> ${answer}`;
        answersContainer.appendChild(label);
        answersContainer.appendChild(document.createElement("br"));
    });

    // Tô màu nút câu hỏi hiện tại
    highlightSelectedButton();
}

// Chọn câu hỏi cụ thể
function selectQuestion(questionNumber) {
    currentQuestion = questionNumber; // Cập nhật câu hỏi hiện tại
    updateQuestion(); // Cập nhật nội dung câu hỏi

    // Loại bỏ class 'selected' khỏi tất cả các nút
    document.querySelectorAll(".question-button").forEach((button) => {
        button.classList.remove("selected");
    });

    // Thêm class 'selected' cho nút câu hỏi được chọn
    const selectedButton =
        document.querySelectorAll(".question-button")[questionNumber - 1];
    selectedButton.classList.add("selected"); // Đánh dấu nút câu hỏi được chọn
}

// Chuyển về câu hỏi trước
function previousQuestion() {
    if (currentQuestion > 1) {
        currentQuestion--;
        updateQuestion();
        highlightSelectedButton(); // Đảm bảo nút câu hỏi hiện tại được tô màu
    }
}

// Chuyển sang câu hỏi tiếp theo
function nextQuestion() {
    if (currentQuestion < questions.length) {
        currentQuestion++;
        updateQuestion();
        highlightSelectedButton(); // Đảm bảo nút câu hỏi hiện tại được tô màu
    }
}

// Kết thúc bài thi
function submitQuiz() {
    alert("Bạn đã hoàn thành bài thi!");
}

// Hàm tô màu cho nút câu hỏi hiện tại
function highlightSelectedButton() {
    // Loại bỏ class 'selected' khỏi tất cả các nút câu hỏi
    document.querySelectorAll(".question-button").forEach((button) => {
        button.classList.remove("selected");
    });

    // Tô màu cho nút câu hỏi hiện tại
    const selectedButton =
        document.querySelectorAll(".question-button")[currentQuestion - 1];
    selectedButton.classList.add("selected"); // Tô màu nút câu hỏi đang được chọn
}

// Thời gian đếm ngược (đơn vị: giây)
let countdownTime = 20 * 60; // 20 phút

// Hàm định dạng thời gian (phút:giây)
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
}

// Hàm cập nhật đồng hồ đếm ngược
function updateCountdown() {
    const countdownElement = document.getElementById("countdown");
    if (countdownTime > 0) {
        countdownTime--; // Giảm thời gian mỗi giây
        countdownElement.textContent = `Thời gian còn lại: ${formatTime(
            countdownTime
        )}`;
    } else {
        // Hết giờ, có thể thực hiện thêm hành động như nộp bài tự động
        countdownElement.textContent = "Hết thời gian!";
        clearInterval(timer); // Dừng đếm ngược
        alert("Hết giờ! Hãy kiểm tra lại bài thi.");
    }
}

// Bắt đầu đồng hồ đếm ngược khi tải trang
const timer = setInterval(updateCountdown, 1000); // Cập nhật mỗi giây
