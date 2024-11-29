import React, { useState, useEffect } from 'react';
import RotaLayout from '../layout';
import axios from 'axios';
import dayjs from 'dayjs'; // For date handling
import weekday from 'dayjs/plugin/weekday';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(weekday);
dayjs.extend(isoWeek);

type Rota = {
  date: string;
  onDuty: boolean;
  holiday: boolean;
};

const RotaPage = () => {
  const [rotaData, setRotaData] = useState<Rota[]>([]);
  const [currentMonth, setCurrentMonth] = useState(dayjs()); // Track the current month
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const userId = '6735739339650ea6a20f7a23'; // Replace with dynamic user ID if available
  const userStartDate = '2024-01-01'; // Replace with the user's actual start date dynamically if needed

  // Fetch rota data for the current month
  const fetchRota = async (start: string, end: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/users/rota/${userId}/${start}/${end}/`
      );
      setRotaData(response.data);
    } catch (err) {
      setError('Failed to fetch rota. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Update rota when the month changes
  useEffect(() => {
    const startOfMonth = currentMonth.startOf('month').format('DD-MM-YYYY');
    const endOfMonth = currentMonth.endOf('month').format('DD-MM-YYYY');
    fetchRota(startOfMonth, endOfMonth);
  }, [currentMonth]);

  // Handle month navigation
  const handleMonthChange = (direction: 'prev' | 'next') => {
    const newMonth =
      direction === 'prev'
        ? currentMonth.subtract(1, 'month')
        : currentMonth.add(1, 'month');

    // Prevent navigating before user's start date
    if (newMonth.isBefore(dayjs(userStartDate), 'month')) return;

    setCurrentMonth(newMonth);
  };

  // Map rota data to a dictionary for easy lookup
  const rotaMap = rotaData.reduce((acc, rota) => {
    acc[dayjs(rota.date).format('YYYY-MM-DD')] = rota;
    return acc;
  }, {} as Record<string, Rota>);

  // Generate an array of days for the current month in a calendar format
  const daysInMonth = [];
  const startOfMonth = currentMonth.startOf('month');
  const endOfMonth = currentMonth.endOf('month');
  const startOfCalendar = startOfMonth.startOf('week');
  const endOfCalendar = endOfMonth.endOf('week');

  let day = startOfCalendar;
  while (day.isBefore(endOfCalendar, 'day')) {
    daysInMonth.push(day);
    day = day.add(1, 'day');
  }

  return (
    <RotaLayout>
      <div className="p-4">
        <h2 className="text-xl font-bold text-center mb-4">
          Your Rota for {currentMonth.format('MMMM YYYY')}
        </h2>

        {/* Navigation Buttons */}
        <div className="flex justify-between mb-4">
          <button
            onClick={() => handleMonthChange('prev')}
            disabled={currentMonth.isSame(dayjs(userStartDate), 'month')}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Previous Month
          </button>
          <button
            onClick={() => handleMonthChange('next')}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Next Month
          </button>
        </div>

        {/* Loading and Error States */}
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Calendar Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-7 gap-2">
            {/* Weekday Headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayName) => (
              <div key={dayName} className="text-center font-bold">
                {dayName}
              </div>
            ))}

            {/* Calendar Days */}
            {daysInMonth.map((day) => {
              const formattedDate = day.format('YYYY-MM-DD');
              const rota = rotaMap[formattedDate] || {};
              const isCurrentMonth = day.isSame(currentMonth, 'month');
              const isOnDuty = rota.onDuty;
              const isHoliday = rota.holiday;

              return (
                <div
                  key={formattedDate}
                  className={`p-4 border rounded ${
                    isCurrentMonth ? 'bg-white' : 'bg-gray-100'
                  } ${
                    isHoliday
                      ? 'bg-red-600 text-white'
                      : isOnDuty
                      ? 'bg-green-600 text-white'
                      : 'text-gray-800'
                  }`}
                >
                  <span className="block text-sm">{day.date()}</span>
                  {isHoliday && <span className="text-xs">Holiday</span>}
                  {isOnDuty && <span className="text-xs">On Duty</span>}
                  {!isOnDuty && !isHoliday && isCurrentMonth && (
                    <span className="text-xs">Off Duty</span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </RotaLayout>
  );
};

export default RotaPage;
