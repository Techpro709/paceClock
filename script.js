function fetchSchedule() {
    return fetch('https://proton.hackclub.com/paceClock/schedule.json') // Replace with the actual URL of your JSON file
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Error fetching schedule:', error);
            return null;
        });
}

async function updateClock() {
    const currentDate = new Date();
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const d = new Date();
    let day = weekday[d.getDay()];
    const currentDay = day.toLowerCase(); // Convert current day to lowercase
    const currentTime = currentDate.getTime(); // Current time in milliseconds

    const scheduleData = await fetchSchedule();

    if (!scheduleData) {
        // Handle the case where the schedule data couldn't be fetched
        document.getElementById("current-time").textContent = "Error fetching schedule data";
        return;
    }

    const currentSchedule = scheduleData[currentDay];

    // Check if it's a weekend (Saturday or Sunday)
    if (!currentSchedule || currentSchedule.length === 0) {
        // Display "No school" on weekends
        document.getElementById("current-time").textContent = "It's the weekend!";
        document.getElementById("current-period").textContent = "No school today";
        document.getElementById("next-period").textContent = "";
        document.getElementById("countdown").textContent = "";
    } else {
        // Find the current period
        let currentPeriod = null;
        for (const period of currentSchedule) {
            const [hour, minute] = period.startTime.split(":");
            const periodStartTime = new Date();
            periodStartTime.setHours(parseInt(hour), parseInt(minute), 0);

            if (currentDate >= periodStartTime) {
                currentPeriod = period;
            } else {
                break;
            }
        }

        // Calculate the time until the next period
        let nextPeriod = null;
        let minutesLeft = 0;
        let secondsLeft = 0;
        if (currentPeriod) {
            const nextPeriodIndex = currentSchedule.indexOf(currentPeriod) + 1;
            if (nextPeriodIndex < currentSchedule.length) {
                nextPeriod = currentSchedule[nextPeriodIndex];
                const [nextHour, nextMinute] = nextPeriod.startTime.split(":");
                const nextPeriodStartTime = new Date();
                nextPeriodStartTime.setHours(parseInt(nextHour), parseInt(nextMinute), 0);
                const timeUntilNextPeriod = (nextPeriodStartTime - currentDate) / 1000; // in seconds

                minutesLeft = Math.floor(timeUntilNextPeriod / 60);
                secondsLeft = Math.floor(timeUntilNextPeriod % 60);
            }
        }

        // Update the DOM elements
        const formattedTime = currentDate.toLocaleTimeString();
        document.getElementById("current-time").textContent = `${formattedTime}`;
        document.getElementById("current-period").textContent = currentPeriod ? `Current Period: ${currentPeriod.name}` : "No class currently";
        document.getElementById("next-period").textContent = nextPeriod ? `Next Period: ${nextPeriod.name}` : "No upcoming class";
        document.getElementById("countdown").textContent = nextPeriod ? `Countdown: ${minutesLeft} minutes and ${secondsLeft} seconds` : "";
    }

    setTimeout(updateClock, 1000); // Update every 1 second
}

updateClock(); // Initial call to start the clock
