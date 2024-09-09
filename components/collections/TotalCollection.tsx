// components/TotalCollections.tsx
import React, { useEffect, useState } from 'react';

const TotalCollections = () => {
  const [totalCollections, setTotalCollections] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch('/api/collections'); // ใช้ endpoint ของคุณ
        if (!response.ok) {
          throw new Error('Failed to fetch collections');
        }
        const data = await response.json();
        setTotalCollections(data.length); // นับจำนวน Collections
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred'); // จัดการข้อผิดพลาดที่ไม่คาดคิด
        }
      }
    };

    fetchCollections();
  }, []); // ทำงานเมื่อ component ถูก mount

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold">Total Collections</h3>
      <div className="text-3xl font-bold mt-2">
        {totalCollections !== null ? totalCollections : 'Loading...'}
      </div>
    </div>
  );
};

export default TotalCollections;
