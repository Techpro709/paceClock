// Define schedules for each day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
const schedules = [
    [], // Sunday
    [ // Monday
        { name: "Period 1", startTime: "08:00" },
        { name: "Period 2", startTime: "09:30" },
        { name: "Period 3", startTime: "11:00" },
        { name: "Lunch", startTime: "12:30" },
        { name: "Period 4", startTime: "13:30" },
        { name: "Period 5", startTime: "15:00" }
    ],
    [ // Tuesday (Same as Monday)
        { name: "Period 1", startTime: "08:00" },
        { name: "Period 2", startTime: "09:30" },
        { name: "Period 3", startTime: "11:00" },
        { name: "Lunch", startTime: "12:30" },
        { name: "Period 4", startTime: "13:30" },
        { name: "Period 5", startTime: "15:00" }
    ],
    [ // Wednesday (Same as Monday)
        { name: "Period 1", startTime: "08:00" },
        { name: "Period 2", startTime: "09:30" },
        { name: "Period 3", startTime: "11:00" },
        { name: "Lunch", startTime: "12:30" },
        { name: "Period 4", startTime: "13:30" },
        { name: "Period 5", startTime: "15:00" }
    ],
    [ // Thursday (Same as Monday)
        { name: "Period 1", startTime: "08:00" },
        { name: "Period 2", startTime: "09:30" },
        { name: "Period 3", startTime: "11:00" },
        { name: "Lunch", startTime: "12:30" },
        { name: "Period 4", startTime: "13:30" },
        { name: "Period 5", startTime: "15:00" }
    ],
    [ // Friday (Same as Monday)
        { name: "Period 1", startTime: "08:00" },
        { name: "Period 2", startTime: "09:30" },
        { name: "Period 3", startTime: "11:00" },
        { name: "Lunch", startTime: "12:30" },
        { name: "Period 4", startTime: "13:30" },
        { name: "Period 5", startTime: "15:00" }
    ],
    []  // Saturday
];

function updateClock() {
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes(); // Current time in minutes

    // Check if it's a weekend (Saturday or Sunday)
    if (currentDay === 0 || currentDay === 6) {
        // Display "No school" on weekends
        document.getElementById("current-time").textContent = "It's the weekend!";
        document.getElementById("current-period").textContent = "No school today";
        document.getElementById("next-period").textContent = "";
        document.getElementById("countdown").textContent = "";
    } else {
        // Get the schedule for the current day
        const currentSchedule = schedules[currentDay];

        // Find the current period
        let currentPeriod = null;
        for (const period of currentSchedule) {
            const [hour, minute] = period.startTime.split(":");
            const periodStartTime = parseInt(hour) * 60 + parseInt(minute);

            if (currentTime >= periodStartTime) {
                currentPeriod = period;
            } else {
                break;
            }
        }

        // Calculate the time until the next period
        let nextPeriod = null;
        let timeUntilNextPeriod = 0;
        if (currentPeriod) {
            const nextPeriodIndex = currentSchedule.indexOf(currentPeriod) + 1;
            if (nextPeriodIndex < currentSchedule.length) {
                nextPeriod = currentSchedule[nextPeriodIndex];
                const [nextHour, nextMinute] = nextPeriod.startTime.split(":");
                const nextPeriodStartTime = parseInt(nextHour) * 60 + parseInt(nextMinute);
                timeUntilNextPeriod = nextPeriodStartTime - currentTime;
            }
        }

        // Update the DOM elements
        const formattedTime = currentDate.toLocaleTimeString();
        document.getElementById("current-time").textContent = `Current Time: ${formattedTime}`;
        document.getElementById("current-period").textContent = currentPeriod ? `Current Period: ${currentPeriod.name}` : "No class currently";
        document.getElementById("next-period").textContent = nextPeriod ? `Next Period: ${nextPeriod.name}` : "No upcoming class";
        document.getElementById("countdown").textContent = nextPeriod ? `Countdown: ${Math.max(0, timeUntilNextPeriod)} minutes` : "";
    }

    setTimeout(updateClock, 1000); // Update every 1 second
}

updateClock(); // Initial call to start the clock
