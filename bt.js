

let articles = [
    {
        id: 1,
        title: "AI đang thay đổi ngành giáo dục...",
        author: "Nguyễn Lan Anh",
        date: "24 Thg 6, 09:20",
        priority: "Cao",
        status: "Chờ duyệt",
        category: "Công nghệ",
        tab: "draft"
    },
    {
        id: 2,
        title: "Du lịch xanh trở thành xu hướng...",
        author: "Trần Minh Khoa",
        date: "24 Thg 6, 08:45",
        priority: "Trung bình",
        status: "Bản nháp",
        category: "Du lịch",
        tab: "draft"
    },
    {
        id: 3,
        title: "Thị trường bán lẻ nửa cuối năm",
        author: "Hoàng Phương",
        date: "23 Thg 6, 16:30",
        priority: "Cao",
        status: "Chờ fact-check",
        category: "Kinh tế",
        tab: "draft"
    },
    {
        id: 4,
        title: "Giao thông công cộng sau một năm",
        author: "Lê Quang Huy",
        date: "23 Thg 6, 14:12",
        priority: "Thấp",
        status: "Chờ đăng",
        category: "Xã hội",
        tab: "draft"
    },
    {
        id: 5,
        title: "Xu hướng phát triển trí tuệ nhân tạo",
        author: "Nguyễn Lan Anh",
        date: "22 Thg 6, 10:30",
        priority: "Cao",
        status: "Bản nháp",
        category: "Công nghệ",
        tab: "draft"
    },
    {
        id: 6,
        title: "Kinh tế số và tương lai doanh nghiệp",
        author: "Trần Minh Khoa",
        date: "21 Thg 6, 15:20",
        priority: "Trung bình",
        status: "Chờ duyệt",
        category: "Kinh tế",
        tab: "draft"
    },
    {
        id: 7,
        title: "Chuyển đổi số trong trường học",
        author: "Hoàng Phương",
        date: "20 Thg 6, 11:00",
        priority: "Thấp",
        status: "Bản nháp",
        category: "Công nghệ",
        tab: "draft"
    },
    {
        id: 8,
        title: "Giải pháp bảo vệ môi trường đô thị",
        author: "Lê Quang Huy",
        date: "19 Thg 6, 09:00",
        priority: "Cao",
        status: "Chờ đăng",
        category: "Xã hội",
        tab: "draft"
    },
    {
        id: 9,
        title: "Ý tưởng phóng sự về thành phố thông minh",
        author: "Nguyễn Lan Anh",
        date: "18 Thg 6, 08:30",
        priority: "Trung bình",
        status: "Chờ duyệt",
        category: "Công nghệ",
        tab: "pitch"
    },
    {
        id: 10,
        title: "Đề xuất chuyên mục du lịch cộng đồng",
        author: "Trần Minh Khoa",
        date: "17 Thg 6, 13:00",
        priority: "Thấp",
        status: "Chờ duyệt",
        category: "Du lịch",
        tab: "pitch"
    },
    {
        id: 11,
        title: "Ý tưởng bài viết kinh tế tuần hoàn",
        author: "Hoàng Phương",
        date: "16 Thg 6, 14:00",
        priority: "Cao",
        status: "Chờ duyệt",
        category: "Kinh tế",
        tab: "pitch"
    }
];


let currentTab = "draft";
let currentPage = 1;
const pageSize = 4;


const articleBody = document.getElementById("articleBody");
const searchInput = document.getElementById("searchInput");
const globalSearch = document.getElementById("globalSearch");

const statusFilter = document.getElementById("statusFilter");
const priorityFilter = document.getElementById("priorityFilter");
const categoryFilter = document.getElementById("categoryFilter");

const paginationInfo = document.getElementById("paginationInfo");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");



function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }[char]));
}



function getPriorityClass(priority) {
    switch (priority) {
        case "Cao":
            return "priority-high";
        case "Trung bình":
            return "priority-medium";
        default:
            return "priority-low";
    }
}


function getStatusClass(status) {
    switch (status) {
        case "Chờ duyệt":
            return "status-review";
        case "Bản nháp":
            return "status-draft";
        case "Chờ fact-check":
            return "status-factcheck";
        default:
            return "status-publish";
    }
}


function getFilteredArticles() {
    const keyword = searchInput.value.trim().toLowerCase();
    const globalKeyword = globalSearch.value.trim().toLowerCase();

    return articles.filter(article => {
        const text = (
            article.title + " " +
            article.author + " " +
            article.category
        ).toLowerCase();

        const matchTab = article.tab === currentTab;
        const matchSearch = text.includes(keyword);
        const matchGlobal = text.includes(globalKeyword);

        const matchStatus =
            !statusFilter.value ||
            article.status === statusFilter.value;

        const matchPriority =
            !priorityFilter.value ||
            article.priority === priorityFilter.value;

        const matchCategory =
            !categoryFilter.value ||
            article.category === categoryFilter.value;

        return (
            matchTab &&
            matchSearch &&
            matchGlobal &&
            matchStatus &&
            matchPriority &&
            matchCategory
        );
    });
}


function renderArticles() {
    const filtered = getFilteredArticles();

    const totalPages = Math.max(
        1,
        Math.ceil(filtered.length / pageSize)
    );

    currentPage = Math.min(currentPage, totalPages);

    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;

    const pageArticles = filtered.slice(start, end);

    articleBody.innerHTML = "";

    if (pageArticles.length === 0) {
        articleBody.innerHTML = `
            <tr>
                <td colspan="6" class="empty-row">
                    Không tìm thấy bài viết phù hợp
                </td>
            </tr>
        `;
    }

    pageArticles.forEach(article => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <div class="article-title">
                    ${escapeHTML(article.title)}
                </div>
                <div class="article-subtitle">
                    ${escapeHTML(article.category)} · 1.240 từ
                </div>
            </td>

            <td>${escapeHTML(article.author)}</td>

            <td>${escapeHTML(article.date)}</td>

            <td>
                <span class="badge ${getPriorityClass(article.priority)}">
                    ${escapeHTML(article.priority)}
                </span>
            </td>

            <td>
                <span class="badge ${getStatusClass(article.status)}">
                    ${escapeHTML(article.status)}
                </span>
            </td>

            <td>
                <button class="view-btn" data-id="${article.id}">
                    Xem bài
                </button>
            </td>
        `;

        articleBody.appendChild(row);
    });


    const from = filtered.length ? start + 1 : 0;
    const to = Math.min(end, filtered.length);

    paginationInfo.textContent =
        `Hiển thị ${from}-${to} trong ${filtered.length} bài`;

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage >= totalPages;
}


[
    searchInput,
    globalSearch,
    statusFilter,
    priorityFilter,
    categoryFilter
].forEach(element => {
    element.addEventListener("input", () => {
        currentPage = 1;
        renderArticles();
    });
});


document.querySelectorAll(".tabs button").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".tabs button").forEach(tab => {
            tab.classList.remove("active");
        });

        button.classList.add("active");

        currentTab = button.dataset.tab;
        currentPage = 1;

        renderArticles();
    });
});


prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderArticles();
    }
});

nextBtn.addEventListener("click", () => {
    const total = getFilteredArticles().length;

    if (currentPage * pageSize < total) {
        currentPage++;
        renderArticles();
    }
});


function openModal(title, html) {
    modalTitle.textContent = title;
    modalBody.innerHTML = html;
    modal.classList.add("show");
}

function closeModal() {
    modal.classList.remove("show");
}

document.getElementById("closeModal")
    .addEventListener("click", closeModal);

modal.addEventListener("click", event => {
    if (event.target === modal) {
        closeModal();
    }
});


articleBody.addEventListener("click", event => {
    const button = event.target.closest(".view-btn");

    if (!button) return;

    const id = Number(button.dataset.id);
    const article = articles.find(item => item.id === id);

    if (!article) return;

    openModal("Chi tiết bài viết", `
        <h3>${escapeHTML(article.title)}</h3>
        <p><b>Tác giả:</b> ${escapeHTML(article.author)}</p>
        <p><b>Ngày tạo:</b> ${escapeHTML(article.date)}</p>
        <p><b>Danh mục:</b> ${escapeHTML(article.category)}</p>
        <p><b>Ưu tiên:</b> ${escapeHTML(article.priority)}</p>

        <label for="articleStatus">Trạng thái</label>

        <select id="articleStatus">
            ${["Chờ duyệt", "Bản nháp", "Chờ fact-check", "Chờ đăng"]
                .map(status => `
                    <option value="${status}"
                        ${article.status === status ? "selected" : ""}>
                        ${status}
                    </option>
                `).join("")}
        </select>

        <button class="btn-primary" id="saveStatus">
            Lưu thay đổi
        </button>
    `);

    document.getElementById("saveStatus")
        .addEventListener("click", () => {
            article.status =
                document.getElementById("articleStatus").value;

            closeModal();
            renderArticles();
        });
});


document.getElementById("newArticle")
    .addEventListener("click", () => {

        openModal("Tạo bài viết mới", `
            <form id="articleForm">

                <label for="newTitle">Tiêu đề</label>
                <input id="newTitle" required>

                <label for="newAuthor">Tác giả</label>
                <input id="newAuthor" value="Nguyễn Lan Anh" required>

                <label for="newCategory">Danh mục</label>
                <select id="newCategory">
                    <option>Công nghệ</option>
                    <option>Du lịch</option>
                    <option>Kinh tế</option>
                    <option>Xã hội</option>
                </select>

                <label for="newPriority">Ưu tiên</label>
                <select id="newPriority">
                    <option>Thấp</option>
                    <option>Trung bình</option>
                    <option>Cao</option>
                </select>

                <label for="newContent">Nội dung</label>
                <textarea id="newContent"></textarea>

                <button class="btn-primary" type="submit">
                    Tạo bài viết
                </button>

            </form>
        `);

        document.getElementById("articleForm")
            .addEventListener("submit", event => {
                event.preventDefault();

                const title =
                    document.getElementById("newTitle").value.trim();

                const author =
                    document.getElementById("newAuthor").value.trim();

                if (!title || !author) return;

                articles.unshift({
                    id: Math.max(...articles.map(a => a.id), 0) + 1,
                    title,
                    author,
                    category: document.getElementById("newCategory").value,
                    priority: document.getElementById("newPriority").value,
                    date: new Date().toLocaleString("vi-VN"),
                    status: "Bản nháp",
                    tab: "draft"
                });

                currentTab = "draft";
                currentPage = 1;

                document.querySelectorAll(".tabs button")
                    .forEach(tab => {
                        tab.classList.toggle(
                            "active",
                            tab.dataset.tab === "draft"
                        );
                    });

                closeModal();
                renderArticles();
            });
    });


document.getElementById("advancedFilter")
    .addEventListener("click", () => {
        searchInput.focus();
    });



document.getElementById("themeBtn")
    .addEventListener("click", () => {
        document.body.classList.toggle("dark");
    });



document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();

        document.querySelectorAll(".menu a").forEach(item => {
            item.classList.remove("active");
        });

        link.classList.add("active");

        const name = link.dataset.menu;
        document.querySelector(".breadcrumb strong").textContent = name;
    });
});


renderArticles();
