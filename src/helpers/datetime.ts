import {
    isSameMonth,
    isSameYear,
    format,
    fromUnixTime,
    sub,
    add,
    startOfMonth,
    endOfMonth,
    isAfter,
    eachDayOfInterval,
    intervalToDuration,
    isWithinInterval
} from 'date-fns';
import { RawReservedSlot } from './../services/types';
import { getTimezoneOffset } from 'date-fns-tz';
import { ru } from 'date-fns/locale';

const formatRu = (date: Date | number, fmt: string): string =>
    format(date, fmt, { locale: ru });

const getMskOffset = () => getTimezoneOffset('Europe/Moscow');

const getCurrentOffset = () => getTimezoneOffset(Intl.DateTimeFormat().resolvedOptions().timeZone);

const msToHours = (ms: number) => (ms / (1000 * 60 * 60));

export const localToMsk = (timestamp: number) => {
    const dateTime = fromUnixTime(timestamp);
    const mskOffset = msToHours(getMskOffset());
    const localOffset = msToHours(getCurrentOffset());

    return localOffset > mskOffset
        ? sub(dateTime, { hours: localOffset - mskOffset })
        : sub(dateTime, { hours: mskOffset - localOffset });
};

export const mskToLocal = (dateTime: Date) => {
    const mskOffset = msToHours(getMskOffset());
    const localOffset = msToHours(getCurrentOffset());

    return localOffset > mskOffset
        ? add(dateTime, { hours: localOffset - mskOffset })
        : add(dateTime, { hours: mskOffset - localOffset });
}

export function formatPeriod (fromTimestamp: number, toTimestamp: number): string {
    const from = localToMsk(fromTimestamp);
    const to = localToMsk(toTimestamp);
    let format = ['d', 'd MMMM'];

    if (!isSameYear(from, to)) {
        format = ['d MMMM u', 'd MMMM u'];
    }
    
    if (!isSameMonth(from, to)) {
        format = ['d MMMM', 'd MMMM'];
    }

    return `${formatRu(from, format[0])} – ${formatRu(to, format[1])}`;
}

const getNextMonth = () =>
    add(new Date(), { months: 1 });

export const getStartOfNextMonth = () =>
    startOfMonth(getNextMonth());

export const getEndOfNextMonth = () =>
    endOfMonth(getNextMonth());

export const getReservedDates = (reservedSlots: RawReservedSlot[] = []) =>
    reservedSlots
        .reduce<Date[]>((dates, { date_start, date_stop }) => ([
            ...dates,
            ...eachDayOfInterval({
                start: localToMsk(date_start),
                end: localToMsk(date_stop)
            })
        ]), []);

export const getRangeLength = (dateFrom: Date, dateTo: Date): number =>
    (intervalToDuration({
        start: dateFrom,
        end: dateTo
    }).days || 0) + 1;

export const checkRangeIncludesReservedSlots = (
    dateFrom: Date,
    dateTo: Date,
    actualReservedSlots: RawReservedSlot[]
) =>
    actualReservedSlots.some(({ date_start, date_stop }) =>
        isWithinInterval(localToMsk(date_start), {
            start: dateFrom,
            end: dateTo
        })
        || isWithinInterval(localToMsk(date_stop), {
            start: dateFrom,
            end: dateTo
        })
    );

export const isAfterBeginningOfCurrentMonth = (timestamp: number) =>
    isAfter(fromUnixTime(timestamp), startOfMonth(new Date()));

export const isNextMonthDate = (timestamp: number) =>
    isSameMonth(fromUnixTime(timestamp), add(new Date(), { months: 1 }));
