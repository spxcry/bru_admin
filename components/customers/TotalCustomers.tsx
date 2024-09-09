import React, { useEffect, useState } from 'react';

const TotalCustomers = () => {
  const [totalCustomers, setTotalCustomers] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('/api/customers'); // ใช้ endpoint สำหรับดึงข้อมูลลูกค้า
        if (!response.ok) {
          throw new Error('Failed to fetch customers');
        }
        const data = await response.json();
        setTotalCustomers(data.length); // นับจำนวนลูกค้า
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred'); // จัดการข้อผิดพลาดที่ไม่คาดคิด
        }
      }
    };

    fetchCustomers();
  }, []); // ทำงานเมื่อ component ถูก mount

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold">Total Customers</h3>
      <div className="text-3xl font-bold mt-2">
        {totalCustomers !== null ? totalCustomers : 'Loading...'}
      </div>
    </div>
  );
};

export default TotalCustomers;
