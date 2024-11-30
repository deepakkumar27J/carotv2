import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import isoWeek from 'dayjs/plugin/isoWeek';
import RotaLayout from '../layout';

dayjs.extend(weekday);
dayjs.extend(isoWeek);

type Rota = {
  date: string;
  onDuty: boolean;
};

const BookHolidaysPage = () => {
  const [rotaData, setRotaData] = useState<Rota[]>([]);
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [error, setError] = useState('');
  const userId = '6735739339650ea6a20f7a23'; // Replace with dynamic user ID if needed

  // Fetch rota data for the current month
  const fetchRota = async (start: string, end: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/users/rota/${userId}/${start}/${end}/`
      );
      setRotaData(response.data);
    } catch (err) {
      console.error('Error fetching rota:', err);
      setError('Failed to fetch rota data. Please try again.');
    }
  };

  // Fetch data for the current month
  useEffect(() => {
    const startOfMonth = currentMonth.startOf('month').format('YYYY-MM-DD');
    const endOfMonth = currentMonth.endOf('month').format('YYYY-MM-DD');
    fetchRota(startOfMonth, endOfMonth);
  }, [currentMonth]);

  // Toggle selected dates
  const toggleDate = (date: string) => {
    setSelectedDates((prev) =>
      prev.includes(date)
        ? prev.filter((d) => d !== date) // Deselect if already selected
        : [...prev, date] // Add to selection
    );
  };

  // Book holidays by sending a POST request
  const bookHolidays = async () => {
    try {
      await axios.post(`http://localhost:8080/api/v1/users/holidays/${userId}`, {
        dates: selectedDates,
      });
      alert('Holidays booked successfully!');
      setSelectedDates([]); // Clear selection after successful booking
    } catch (err) {
      console.error('Error booking holidays:', err);
      setError('Failed to book holidays. Please try again.');
    }
  };

  // Calendar rendering logic
  const rotaMap = rotaData.reduce((acc, rota) => {
    acc[dayjs(rota.date).format('YYYY-MM-DD')] = rota;
    return acc;
  }, {} as Record<string, Rota>);

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
          Book Holidays for {currentMonth.format('MMMM YYYY')}
        </h2>

        {/* Error Message */}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Calendar Navigation */}
        <div className="flex justify-between mb-4">
          <button
            onClick={() => setCurrentMonth(currentMonth.subtract(1, 'month'))}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Previous Month
          </button>
          <button
            onClick={() => setCurrentMonth(currentMonth.add(1, 'month'))}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Next Month
          </button>
        </div>

        {/* Calendar Grid */}
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
            const isSelected = selectedDates.includes(formattedDate);

            return (
              <div
                key={formattedDate}
                onClick={() => isOnDuty && toggleDate(formattedDate)}
                className={`p-4 border rounded cursor-pointer ${
                  isCurrentMonth ? 'bg-white' : 'bg-gray-100'
                } ${
                  isOnDuty
                    ? isSelected
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-200'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                <span className="block text-sm font-bold">
                  {day.format('D')}
                </span>
                {isOnDuty && !isSelected && (
                  <span className="text-xs text-gray-700">On Duty</span>
                )}
                {isSelected && <span className="text-xs">Selected</span>}
              </div>
            );
          })}
        </div>

        {/* Book Holidays Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={bookHolidays}
            disabled={selectedDates.length === 0}
            className="bg-green-500 text-white px-6 py-2 rounded disabled:opacity-50"
          >
            Book Holidays
          </button>
        </div>
      </div>
    </RotaLayout>
  );
};

export default BookHolidaysPage;
