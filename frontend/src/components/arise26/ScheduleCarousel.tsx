const scheduleData = [
  {
    day: "Mon",
    date: "July 27, 2026",
    title: "For The Joy",
    periods: [
      {
        label: "Evening",
        time: "6:45 pm",
        items: [
          "Arise National Updates",
          "Opening Ceremony",
          "Worship",
          "Plenary",
        ],
      },
    ],
  },
  {
    day: "Tue",
    date: "July 28, 2026",
    title: "Joy of Following Jesus",
    periods: [
      {
        label: "Morning",
        time: "9:00 am - 1:00 pm",
        items: [
          "Worship",
          "Bible Exposition",
          "Arise National Updates",
          "Plenaries",
          "Interactive Activity",
          "Panel",
        ],
      },
      {
        label: "Afternoon",
        time: "1:00 pm - 6:45 pm",
        items: [
          "Lunch Break",
          "Workshops",
          "Innovation Lab",
          "Country Gathering",
          "Dinner Break",
        ],
      },
      {
        label: "Evening",
        time: "6:45 pm",
        items: ["Arise National Updates", "Worship", "Plenaries"],
      },
    ],
  },
  {
    day: "Wed",
    date: "July 29, 2026",
    title: "Joy of Surrender, Holiness & Sacrifice",
    periods: [
      {
        label: "Morning",
        time: "9:00 am - 12:45 pm",
        items: [
          "Worship",
          "Bible Exposition",
          "Arise National Updates",
          "Plenaries",
          "Interactive Activity",
          "Panel",
        ],
      },
      {
        label: "Afternoon",
        time: "12.45 pm - 6:45 pm",
        items: ["Free Time", "Dinner Break"],
      },
      {
        label: "Evening",
        time: "6:45 pm",
        items: ["Arise National Updates", "Worship", "Plenaries"],
      },
    ],
  },
  {
    day: "Thu",
    date: "July 30, 2026",
    title: "Joy of Purposeful Perseverance",
    periods: [
      {
        label: "Morning",
        time: "9:00 am - 1:00 pm",
        items: [
          "Worship",
          "Bible Exposition",
          "Arise National Updates",
          "Plenaries",
          "Interactive Activity",
          "Panel",
        ],
      },
      {
        label: "Afternoon",
        time: "1:00 pm - 6:45 pm",
        items: [
          "Lunch Break",
          "Workshops",
          "Innovation Lab",
          "Country Gathering",
          "Dinner Break",
        ],
      },
      {
        label: "Evening",
        time: "6:45 pm",
        items: ["Arise National Updates", "Worship", "Plenaries"],
      },
    ],
  },
  {
    day: "Fri",
    date: "July 31, 2026",
    title: "Joy of Eternity",
    periods: [
      {
        label: "Morning",
        time: "9:00 am - 1:00 pm",
        items: [
          "Worship",
          "Bible Exposition",
          "Arise National Updates",
          "Plenaries",
          "Interactive Activity",
          "Panel",
        ],
      },
      {
        label: "Afternoon",
        time: "1:00 pm",
        items: ["Closing", "Commissioning"],
      },
    ],
  },
];

export default function ScheduleCarousel() {
  return (
    <section className="flex flex-col gap-y-4">
      <h3 className="text-2xl font-bold tracking-wide text-center uppercase sm:text-3xl md:text-4xl font-heading">
        Schedule
      </h3>
      <div
        className="flex overflow-x-auto gap-x-4"
        style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
      >
        {scheduleData.map(({ day, date, title, periods }) => (
          <div
            className="flex flex-col flex-none gap-y-6 p-4 w-72 from-orange-100 to-orange-50 rounded-xl sm:w-88 bg-linear-to-b"
            key={date}
          >
            <div className="flex justify-between uppercase sm:text-lg md:text-xl">
              <p className="px-2 font-bold bg-orange-300 rounded text-neutral-950">
                {day}
              </p>
              <p className="font-semibold tracking-wide">{date}</p>
            </div>
            <h4 className="min-h-14 text-h5">{title}</h4>
            <div className="space-y-4 text-center text-neutral-600">
              {periods.map(({ label, time, items }) => (
                <div key={label}>
                  <p className="text-lg font-bold tracking-wide uppercase sm:text-xl md:text-2xl">
                    {label}
                  </p>
                  <p className="mb-2 text-xs font-semibold sm:text-sm">
                    {time}
                  </p>
                  <ul className="space-y-0.5 text-neutral-500">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="text-sm font-semibold leading-snug sm:text-base"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
