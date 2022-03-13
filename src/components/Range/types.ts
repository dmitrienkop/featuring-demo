export type DatesFromTo = [Date | null, Date | null];
export interface RangeProps {
    label: string;
    dates: DatesFromTo;
    placeholderFrom: string;
    placeholderTo: string;
    onChange: (dates: DatesFromTo) => void;
    reservedDates: Date[];
    error?: false | string;
    disabled?: boolean;
}
