import {
  Interval,
  addDays,
  eachDayOfInterval,
  endOfDay,
  format,
  isEqual,
} from "date-fns";
import React from "react";
import { DateRange } from "react-day-picker";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Coffee } from "../coffee-data-table/columns";
import { useTheme } from "../theme-provider";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DatePickerWithRange } from "../date-picker";

interface ChartsProps {
  data: Coffee[];
}

const DEFAULT_DATE_RANGE = {
  start: endOfDay(addDays(new Date(), -7)),
  end: endOfDay(new Date()),
};

export const Charts = ({ data }: ChartsProps) => {
  const theme = useTheme();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: DEFAULT_DATE_RANGE.start,
    to: DEFAULT_DATE_RANGE.end,
  });
  const handleDateChange = (date: DateRange | undefined) => {
    setDate(date);
  };

  return (
    <div>
      <DatePickerWithRange
        date={date}
        setDate={handleDateChange}
        className="m-4"
        dataDateRange={getDataDateRangeWithStartPadding(data)}
      />
      <Card className="m-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="mx-auto text-inherit">
            Number of Shots
          </CardTitle>
        </CardHeader>
        <CardContent className="m-0 p-0">
          <ResponsiveContainer width="100%" aspect={1.77} className="pr-8 pb-2">
            <LineChart
              width={400}
              height={400}
              data={getDateNormalisedChartData(data, getInterval(date))}
            >
              <CartesianGrid strokeDasharray="4 4" />
              <XAxis
                dataKey="date"
                tickFormatter={dateFormatter}
                type="category"
              />
              <YAxis dataKey="cumulativeCount" type="number" />
              <Tooltip
                wrapperStyle={{ background: "inherit" }}
                contentStyle={{ background: "inherit" }}
                labelFormatter={dateFormatter}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke={theme.theme === "dark" ? "white" : "black"}
                name="Count"
              />
              <Line
                type="monotone"
                dataKey="cumulativeCount"
                stroke={theme.theme === "dark" ? "white" : "black"}
                name="Cumulative Count"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

const dateFormatter = (date: Date) => {
  /**
   * Given a date, formats that date into a "MM/dd" string that can be used as a label on the x-axis of a chart.
   */
  return format(date, "MM/dd");
};

const getInterval = (date: DateRange | undefined): Interval => {
  /**
   * Given a DateRange, returns an Interval that represents the same range.
   */
  if (!date) {
    return getDefaultInterval();
  }
  return {
    start: date.from || getDefaultStartDate(),
    end: date.to || getDefaultEndDate(),
  };
};

const getDefaultStartDate = (): Date => {
  /**
   * Returns the default start date for the chart.
   */
  return DEFAULT_DATE_RANGE.start;
};

const getDefaultEndDate = (): Date => {
  /**
   * Returns the default end date for the chart.
   */
  return DEFAULT_DATE_RANGE.end;
};

const getDefaultInterval = (): Interval => {
  /**
   * Returns the default interval for the chart.
   */
  return { start: getDefaultStartDate(), end: getDefaultEndDate() };
};

const getDateNormalisedChartData = (
  data: Coffee[],
  interval: Interval,
): { date: Date; count: number; cumulativeCount: number }[] => {
  /**
   * Given an array of Coffee objects and an Interval, returns an array of objects that contain the date, count, and cumulative count of shots taken on each day in the interval.
   */
  const days = eachDayOfInterval(interval);
  let cumulativeCount = 0;
  return days.map((day) => {
    const count = data.filter((d) =>
      isEqual(endOfDay(d.shotDate), endOfDay(day)),
    ).length;
    cumulativeCount += count;
    return {
      date: day,
      count: count,
      cumulativeCount: cumulativeCount,
    };
  });
};

const getDataDateRangeWithStartPadding = (
  date: Coffee[],
): { from: Date; to: Date } => {
  /**
   * Given an array of Coffee objects, returns an object that contains the earliest -1 day and latest day shot dates in the array.
   */
  const dates = date.map((d) => d.shotDate);
  return {
    from: addDays(
      dates.reduce((a, b) => (a < b ? a : b)),
      -1,
    ),
    to: dates.reduce((a, b) => (a > b ? a : b)),
  };
};
