"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TestApiPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://five-fav-photo-team2-be.onrender.com/api/market",
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // 필요한 경우 유지
          }
        );

        console.log("📌 API 응답:", response.data); // 콘솔 확인
        setData(response.data);
      } catch (error) {
        console.error("🚨 API 요청 실패:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>API 응답 테스트</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
