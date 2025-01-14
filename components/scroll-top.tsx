"use client";

import { useEffect } from "react";

export function ScrollToTop() {
    useEffect(() => {
        // Cuộn lên đầu khi trang tải lại
        window.scrollTo(0, 0);
    }, []); // Chạy duy nhất một lần

    return null; // Không render thêm nội dung
}
